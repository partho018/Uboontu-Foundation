// src/app/api/init-db/route.js
// One-time database seeder. Hit GET /api/init-db?secret=UBOONTU-ADMIN-SECRET-KEY-2026
// to seed all default data into D1.

import { getDB, ok, err } from '@/lib/db';
import { hashPassword } from '@/lib/crypto';


const DEFAULT_BLOGS = [
  {
    id: 1,
    slug: 'transforming-urban-waste-manbhar-project',
    title: "Transforming Urban Waste: The Journey of Uboontu's Manbhar Project",
    excerpt: 'Discover how the Manbhar Project is pioneering municipal solid waste management.',
    content: '<p>Municipal solid waste is one of the most pressing challenges facing urban areas today. Rapid population growth combined with changing consumer habits has led to an exponential rise in waste volumes. At Uboontu Foundation, we believe that the solution does not lie in building larger landfills, but in reducing the waste that reaches them. This philosophy is the foundation of the <strong>Manbhar Project</strong>.</p><h2>The Core Challenge of Municipal Waste</h2><p>Most city waste ends up mixed in large landfills, causing serious problems like toxic liquids leaking into soil and methane gas emissions. When wet organic waste and dry recyclables are thrown in the same bin, they contaminate each other. This makes recycling almost impossible and poses severe health risks to sanitation workers.</p><blockquote>"Sustainability begins at home. Segregating waste is not just an ecological task—it is a fundamental civic duty for all."</blockquote><h2>Uboontu\'s Decentralized Intervention</h2><p>The Manbhar Project tackles this issue by setting up decentralized waste management centers. Instead of transporting tons of waste across the city, we process it near the source.</p><h2>Empowering Green Warriors</h2><p>At the heart of the Manbhar Project are the waste collectors and workers. Uboontu Foundation provides formal training, safety equipment, regular health check-ups, and stable incomes, transforming informal labor into skilled recycling technicians.</p>',
    category: 'Waste Management',
    tags: 'Waste Management,Recycling,Composting,Community',
    date_label: 'July 10, 2026',
    read_time: '6 min read',
    image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
    is_featured: 1,
    status: 'Published',
    publish_date: '2026-07-10T10:00:00.000Z',
    seo_title: 'Transforming Urban Waste: Manbhar Project | Uboontu',
    seo_description: 'Discover how the Manbhar Project is pioneering municipal solid waste management.',
    author: 'Super Admin User',
    gallery: [
      'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80',
    ],
  },
  {
    id: 2,
    slug: 'understanding-3rs-reduce-reuse-recycle',
    title: 'Understanding the 3Rs: Reduce, Reuse, Recycle in Modern Communities',
    excerpt: 'A practical guide to implementing the 3R principles in daily households.',
    content: '<p>In a world dominated by single-use products, the concept of a circular economy is more vital than ever. The three Rs—Reduce, Reuse, and Recycle—offer a simple yet powerful blueprint for individuals to live more sustainably.</p><h2>Reduce: The First Line of Defense</h2><p>Reducing waste means consuming mindfully. Every item we buy has an environmental footprint from manufacturing and shipping.</p><blockquote>"The most sustainable product is the one that was never manufactured."</blockquote><h2>Reuse: Creative Alternatives</h2><p>Reusing items keeps them in the economic cycle longer and prevents them from becoming trash.</p><h2>Recycle: Getting it Right</h2><p>Recycling is the final step, but it must be done correctly. Ensuring that plastics and cans are washed and dried before disposal is key.</p>',
    category: 'Circular Economy',
    tags: '3Rs,Recycling,Circular Economy,Sustainability',
    date_label: 'July 02, 2026',
    read_time: '4 min read',
    image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
    is_featured: 0,
    status: 'Published',
    publish_date: '2026-07-02T09:00:00.000Z',
    seo_title: 'Understanding the 3Rs: Reduce, Reuse, Recycle | Uboontu',
    seo_description: 'A practical guide to implementing the 3R principles.',
    author: 'Editor User',
    gallery: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'],
  },
  {
    id: 3,
    slug: 'empowering-youth-environmental-education',
    title: 'Empowering Youth: The Role of Environmental Education in Schools',
    excerpt: 'How Uboontu Foundation is setting up active eco-clubs and composting training.',
    content: '<p>Sustainable habits are best formed early in life. By bringing environmental education directly to classrooms, Uboontu Foundation is preparing the next generation.</p><h2>Integrating Sustainability in Classrooms</h2><p>Uboontu supports interactive learning with workshops on biodiversity, global warming, and waste sorting.</p><blockquote>"Children are not just passive learners; they are the most effective advocates for a sustainable future."</blockquote><h2>Composting and Gardening on Campus</h2><p>Students collect food scraps to manage their own composting systems, watching organic waste transform into healthy soil.</p><h2>Setting Up School Eco-Clubs</h2><p>We help schools build student-led Eco-Clubs that organize cleanup drives and zero-waste campaigns.</p>',
    category: 'Community Development',
    tags: 'Education,Youth,Composting,Eco-clubs',
    date_label: 'June 25, 2026',
    read_time: '5 min read',
    image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
    is_featured: 0,
    status: 'Published',
    publish_date: '2026-06-25T11:00:00.000Z',
    seo_title: 'Empowering Youth: Environmental Education in Schools | Uboontu',
    seo_description: 'How Uboontu Foundation is nurturing young green leaders.',
    author: 'Admin User',
    gallery: ['https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80'],
  },
];

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get('secret');
  if (secret !== (process.env.ADMIN_SECRET || 'UBOONTU-ADMIN-SECRET-KEY-2026')) {
    return err('Forbidden', 403);
  }

  const db = getDB(request);
  if (!db) return err('Database not available', 503);

  const results = [];

  try {
    // Seed users
    const superAdminHash = await hashPassword('adminpassword');
    const adminHash = await hashPassword('adminpassword');
    const editorHash = await hashPassword('editorpassword');
    
    await db.prepare(`INSERT OR IGNORE INTO users (id,name,email,password_hash,role,profile_image,bio) VALUES (?,?,?,?,?,?,?)`).bind('u1','Super Admin User','superadmin@uboontu.org',superAdminHash,'Super Admin','https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80','Chief administrator of Uboontu Foundation.').run();
    await db.prepare(`INSERT OR IGNORE INTO users (id,name,email,password_hash,role,profile_image,bio) VALUES (?,?,?,?,?,?,?)`).bind('u2','Admin User','admin@uboontu.org',adminHash,'Admin','https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80','Content administrator.').run();
    await db.prepare(`INSERT OR IGNORE INTO users (id,name,email,password_hash,role,profile_image,bio) VALUES (?,?,?,?,?,?,?)`).bind('u3','Editor User','editor@uboontu.org',editorHash,'Editor','https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80','Blog writer and editor.').run();
    results.push('users seeded');

    // Seed blogs
    for (const b of DEFAULT_BLOGS) {
      await db.prepare(`INSERT OR IGNORE INTO blogs (id,slug,title,excerpt,content,category,tags,date_label,read_time,image,is_featured,status,publish_date,seo_title,seo_description,author) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`).bind(b.id,b.slug,b.title,b.excerpt,b.content,b.category,b.tags,b.date_label,b.read_time,b.image,b.is_featured,b.status,b.publish_date,b.seo_title,b.seo_description,b.author).run();
      for (const url of b.gallery) {
        await db.prepare(`INSERT OR IGNORE INTO blog_gallery (blog_id,url) VALUES (?,?)`).bind(b.id, url).run();
      }
    }
    results.push('blogs seeded');

    // Seed contacts
    const contacts = [
      ['c1','Rahul Sharma','rahul.sharma@example.com','+91 98765 12345','CSR Partnership Inquiry','We are looking to partner with Uboontu Foundation for our upcoming CSR campaign.',0,'Unreplied','2026-07-11T10:15:30.000Z'],
      ['c2','Priya Patel','priya.patel@workmail.net','+91 98234 56789','Volunteer Application','I am a university student interested in volunteering for the composting workshops.',1,'Replied','2026-07-09T14:40:00.000Z'],
      ['c3','John Doe','john.doe@gmail.com','+1 555 890 2341','General Question','Hello, is there a sitemap or report available for the Manbhar Project?',1,'Unreplied','2026-07-05T08:22:11.000Z'],
    ];
    for (const c of contacts) {
      await db.prepare(`INSERT OR IGNORE INTO contacts (id,name,email,phone,subject,message,is_read,reply_status,submitted_at) VALUES (?,?,?,?,?,?,?,?,?)`).bind(...c).run();
    }
    results.push('contacts seeded');

    // Seed settings
    const settings = [
      ['websiteName','Uboontu Foundation'],
      ['seoTitle','Uboontu Foundation - Segregation at Source, Recycling, Composting'],
      ['seoDescription','Uboontu Foundation is a non-profit organization promoting sustainable waste management.'],
      ['seoKeywords','waste management, recycling, composting, sustainability, CSR'],
      ['ogImageUrl','https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80'],
      ['logoUrl','/favicon.ico'],
      ['faviconUrl','/favicon.ico'],
      ['sitemapUrl','https://uboontu.org/sitemap.xml'],
    ];
    for (const [k, v] of settings) {
      await db.prepare(`INSERT OR IGNORE INTO settings (key,value) VALUES (?,?)`).bind(k, v).run();
    }
    results.push('settings seeded');

    // Seed media
    const media = [
      ['m1','Manbhar Project Banner','https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80','image/jpeg',245000,'2026-07-10T10:00:00.000Z'],
      ['m2','Circular Economy Icon','https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80','image/jpeg',198000,'2026-07-02T09:00:00.000Z'],
      ['m3','School Eco Club Training','https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80','image/jpeg',312000,'2026-06-25T11:00:00.000Z'],
    ];
    for (const m of media) {
      await db.prepare(`INSERT OR IGNORE INTO media (id,name,url,type,size_bytes,uploaded_at) VALUES (?,?,?,?,?,?)`).bind(...m).run();
    }
    results.push('media seeded');

    // Seed notifications
    await db.prepare(`INSERT OR IGNORE INTO notifications (id,type,message,is_read,created_at) VALUES (?,?,?,?,?)`).bind('n1','contact','New contact submission from Rahul Sharma: "CSR Partnership Inquiry"',0,'2026-07-11T10:15:30.000Z').run();
    await db.prepare(`INSERT OR IGNORE INTO notifications (id,type,message,is_read,created_at) VALUES (?,?,?,?,?)`).bind('n2','blog','Blog post "Transforming Urban Waste" published successfully.',1,'2026-07-10T10:00:00.000Z').run();
    results.push('notifications seeded');

    // Seed activity logs
    await db.prepare(`INSERT OR IGNORE INTO activity_logs (id,user_name,action,details,created_at) VALUES (?,?,?,?,?)`).bind('l1','Super Admin User','Login','Logged in successfully from IP 192.168.1.10','2026-07-12T09:30:00.000Z').run();
    await db.prepare(`INSERT OR IGNORE INTO activity_logs (id,user_name,action,details,created_at) VALUES (?,?,?,?,?)`).bind('l2','Admin User','Publish Blog','Published blog post: "Transforming Urban Waste"','2026-07-10T10:00:00.000Z').run();
    results.push('activity_logs seeded');

    return ok({ message: 'Database seeded successfully', results });
  } catch (e) {
    return err(`Seed failed: ${e.message}`, 500);
  }
}
