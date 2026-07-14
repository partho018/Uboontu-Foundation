// src/app/api/blogs/[id]/route.js
import { getDB, ok, err, uid, parseBody, requireAuth } from '@/lib/db';

export const dynamic = 'force-dynamic';


async function getBlogWithGallery(db, idOrSlug) {
  const isNum = /^\d+$/.test(String(idOrSlug));
  const blog = isNum
    ? await db.prepare(`SELECT * FROM blogs WHERE id = ? LIMIT 1`).bind(Number(idOrSlug)).first()
    : await db.prepare(`SELECT * FROM blogs WHERE slug = ? LIMIT 1`).bind(idOrSlug).first();
  if (!blog) return null;
  const galleryRows = await db.prepare(`SELECT url FROM blog_gallery WHERE blog_id = ?`).bind(blog.id).all();
  return {
    ...blog,
    tags: blog.tags ? blog.tags.split(',').map(t => t.trim()) : [],
    gallery: galleryRows.results.map(r => r.url),
    isFeatured: blog.is_featured === 1,
    readTime: blog.read_time,
    publishDate: blog.publish_date,
    seoTitle: blog.seo_title,
    seoDescription: blog.seo_description,
    date: blog.date_label,
  };
}

export async function GET(request, { params }) {
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const blog = await getBlogWithGallery(db, params.id);
    if (!blog) return err('Blog not found', 404);
    return ok(blog);
  } catch (e) {
    return err(`Failed to fetch blog: ${e.message}`, 500);
  }
}

export async function PUT(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const body = await parseBody(request);
  try {
    const existing = await db.prepare(`SELECT id, title FROM blogs WHERE id = ? LIMIT 1`).bind(Number(params.id)).first();
    if (!existing) return err('Blog not found', 404);
    const { slug, title, excerpt, content, category, tags, image, is_featured, status, publish_date, seo_title, seo_description, author, gallery } = body;
    const dateLabel = publish_date ? new Date(publish_date).toLocaleDateString('en-US', { month:'long', day:'numeric', year:'numeric' }) : undefined;
    const fields = [], values = [];
    const simple = { slug, title, excerpt, content, category, image, status, publish_date, seo_title, seo_description, author };
    for (const [k, v] of Object.entries(simple)) { if (v !== undefined) { fields.push(`${k} = ?`); values.push(v); } }
    if (tags !== undefined) { fields.push('tags = ?'); values.push(Array.isArray(tags) ? tags.join(',') : tags); }
    if (is_featured !== undefined) { fields.push('is_featured = ?'); values.push(is_featured ? 1 : 0); }
    if (dateLabel) { fields.push('date_label = ?'); values.push(dateLabel); }
    fields.push('updated_at = ?'); values.push(new Date().toISOString());
    values.push(Number(params.id));
    await db.prepare(`UPDATE blogs SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
    if (Array.isArray(gallery)) {
      await db.prepare(`DELETE FROM blog_gallery WHERE blog_id = ?`).bind(Number(params.id)).run();
      for (const url of gallery) {
        await db.prepare(`INSERT INTO blog_gallery (blog_id, url) VALUES (?, ?)`).bind(Number(params.id), url).run();
      }
    }
    await db.prepare(`INSERT INTO activity_logs (id,user_name,action,details) VALUES (?,?,?,?)`).bind(uid('l'), author||'System', 'Edit Blog', `Updated: "${existing.title}"`).run();
    return ok({ id: Number(params.id) });
  } catch (e) {
    return err(`Failed to update blog: ${e.message}`, 500);
  }
}

export async function DELETE(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const existing = await db.prepare(`SELECT id, title, author FROM blogs WHERE id = ? LIMIT 1`).bind(Number(params.id)).first();
    if (!existing) return err('Blog not found', 404);
    await db.prepare(`DELETE FROM blogs WHERE id = ?`).bind(Number(params.id)).run();
    await db.prepare(`INSERT INTO activity_logs (id,user_name,action,details) VALUES (?,?,?,?)`).bind(uid('l'), existing.author||'System', 'Delete Blog', `Deleted: "${existing.title}"`).run();
    return ok({ deleted: true });
  } catch (e) {
    return err(`Failed to delete blog: ${e.message}`, 500);
  }
}
