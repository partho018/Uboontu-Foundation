// src/app/api/blogs/route.js
// GET /api/blogs           — list all blogs (with gallery)
// POST /api/blogs          — create a new blog (admin protected)

import { getDB, ok, err, uid, parseBody, requireAuth } from '@/lib/db';

export const dynamic = 'force-dynamic';


/** Attach gallery URLs to blog rows */
async function attachGallery(db, blogs) {
  if (!blogs.length) return blogs;
  const ids = blogs.map(b => b.id);
  const placeholders = ids.map(() => '?').join(',');
  const galleryRows = await db.prepare(
    `SELECT blog_id, url FROM blog_gallery WHERE blog_id IN (${placeholders})`
  ).bind(...ids).all();

  const galleryMap = {};
  for (const row of galleryRows.results) {
    if (!galleryMap[row.blog_id]) galleryMap[row.blog_id] = [];
    galleryMap[row.blog_id].push(row.url);
  }

  return blogs.map(b => ({
    ...b,
    tags: b.tags ? b.tags.split(',').map(t => t.trim()) : [],
    gallery: galleryMap[b.id] || [],
    isFeatured: b.is_featured === 1,
    readTime: b.read_time,
    publishDate: b.publish_date,
    seoTitle: b.seo_title,
    seoDescription: b.seo_description,
    date: b.date_label,
  }));
}

export async function GET(request) {
  const db = getDB(request);
  if (!db) return err('Database not available', 503);

  const { searchParams } = new URL(request.url);
  const status = searchParams.get('status'); // optional filter: Published | Draft | Scheduled

  try {
    let query = `SELECT * FROM blogs ORDER BY created_at DESC`;
    const rows = status
      ? await db.prepare(`SELECT * FROM blogs WHERE status = ? ORDER BY created_at DESC`).bind(status).all()
      : await db.prepare(query).all();

    const blogs = await attachGallery(db, rows.results);
    return ok(blogs);
  } catch (e) {
    return err(`Failed to fetch blogs: ${e.message}`, 500);
  }
}

export async function POST(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;

  const db = getDB(request);
  if (!db) return err('Database not available', 503);

  const body = await parseBody(request);
  const {
    slug, title, excerpt = '', content = '', category = 'Waste Management',
    tags = '', image = '', is_featured = 0, status = 'Draft',
    publish_date = '', seo_title = '', seo_description = '', author = 'System',
    gallery = [],
  } = body;

  if (!slug || !title) return err('slug and title are required', 400);

  const dateLabel = publish_date
    ? new Date(publish_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
    : new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });

  try {
    const result = await db.prepare(
      `INSERT INTO blogs (slug,title,excerpt,content,category,tags,date_label,image,is_featured,status,publish_date,seo_title,seo_description,author)
       VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?)`
    ).bind(slug, title, excerpt, content, category,
      Array.isArray(tags) ? tags.join(',') : tags,
      dateLabel, image, is_featured ? 1 : 0, status, publish_date, seo_title, seo_description, author
    ).run();

    const newId = result.meta.last_row_id;

    // Insert gallery
    for (const url of gallery) {
      await db.prepare(`INSERT INTO blog_gallery (blog_id, url) VALUES (?, ?)`).bind(newId, url).run();
    }

    // Log activity
    await db.prepare(
      `INSERT INTO activity_logs (id,user_name,action,details) VALUES (?,?,?,?)`
    ).bind(uid('l'), author, 'Create Blog', `Created blog post: "${title}"`).run();

    // Add notification
    await db.prepare(
      `INSERT INTO notifications (id,type,message) VALUES (?,?,?)`
    ).bind(uid('n'), 'blog', `Blog "${title}" created.`).run();

    return ok({ id: newId, slug, title }, 201);
  } catch (e) {
    return err(`Failed to create blog: ${e.message}`, 500);
  }
}
