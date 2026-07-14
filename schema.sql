-- ============================================================
-- Uboontu Foundation — Cloudflare D1 Schema
-- Run: wrangler d1 execute uboontu-db --file=schema.sql
-- ============================================================



-- ─── USERS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS users (
  id             TEXT PRIMARY KEY,
  name           TEXT NOT NULL,
  email          TEXT NOT NULL UNIQUE,
  password_hash  TEXT NOT NULL,
  role           TEXT NOT NULL DEFAULT 'Editor', -- 'Super Admin' | 'Admin' | 'Editor'
  profile_image  TEXT DEFAULT '',
  bio            TEXT DEFAULT '',
  two_factor_enabled INTEGER DEFAULT 0,
  two_factor_secret  TEXT DEFAULT '',
  created_at     TEXT DEFAULT (datetime('now'))
);

-- ─── BLOGS ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS blogs (
  id             INTEGER PRIMARY KEY AUTOINCREMENT,
  slug           TEXT NOT NULL UNIQUE,
  title          TEXT NOT NULL,
  excerpt        TEXT DEFAULT '',
  content        TEXT DEFAULT '',
  category       TEXT DEFAULT 'Waste Management',
  tags           TEXT DEFAULT '',          -- comma-separated
  date_label     TEXT DEFAULT '',          -- human-readable e.g. "July 10, 2026"
  read_time      TEXT DEFAULT '5 min read',
  image          TEXT DEFAULT '',
  is_featured    INTEGER DEFAULT 0,
  status         TEXT DEFAULT 'Draft',    -- 'Draft' | 'Published' | 'Scheduled'
  publish_date   TEXT DEFAULT '',
  seo_title      TEXT DEFAULT '',
  seo_description TEXT DEFAULT '',
  author         TEXT DEFAULT 'System',
  created_at     TEXT DEFAULT (datetime('now')),
  updated_at     TEXT DEFAULT (datetime('now'))
);

-- Gallery images belong to a blog (1:N)
CREATE TABLE IF NOT EXISTS blog_gallery (
  id      INTEGER PRIMARY KEY AUTOINCREMENT,
  blog_id INTEGER NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  url     TEXT NOT NULL
);

-- ─── CONTACTS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id           TEXT PRIMARY KEY,
  name         TEXT NOT NULL,
  email        TEXT NOT NULL,
  phone        TEXT DEFAULT '',
  subject      TEXT DEFAULT '',
  message      TEXT DEFAULT '',
  is_read      INTEGER DEFAULT 0,
  reply_status TEXT DEFAULT 'Unreplied', -- 'Unreplied' | 'Replied'
  submitted_at TEXT DEFAULT (datetime('now'))
);

-- ─── SETTINGS ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS settings (
  key   TEXT PRIMARY KEY,
  value TEXT NOT NULL DEFAULT ''
);

-- ─── MEDIA ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS media (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  url         TEXT NOT NULL,
  type        TEXT DEFAULT 'image/jpeg',
  size_bytes  INTEGER DEFAULT 0,
  uploaded_at TEXT DEFAULT (datetime('now'))
);

-- ─── NOTIFICATIONS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS notifications (
  id         TEXT PRIMARY KEY,
  type       TEXT NOT NULL,             -- 'blog' | 'contact' | 'user'
  message    TEXT NOT NULL,
  is_read    INTEGER DEFAULT 0,
  created_at TEXT DEFAULT (datetime('now'))
);

-- ─── ACTIVITY LOGS ───────────────────────────────────────────
CREATE TABLE IF NOT EXISTS activity_logs (
  id         TEXT PRIMARY KEY,
  user_name  TEXT NOT NULL,
  action     TEXT NOT NULL,
  details    TEXT DEFAULT '',
  created_at TEXT DEFAULT (datetime('now'))
);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Default Users with secure PBKDF2 hashes
-- u1 (password: adminpassword)
-- u2 (password: adminpassword)
-- u3 (password: editorpassword)
INSERT OR IGNORE INTO users (id, name, email, password_hash, role, profile_image, bio)
VALUES
  ('u1', 'Super Admin User', 'superadmin@uboontu.org',
   'pbkdf2$100000$14fb22064ea31feae942bcf42a978673$7c446ca3a33150d531ef31e9a31d213e6194e2b0ea0044ebf8537e20b2d1b8db',
   'Super Admin',
   'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
   'Chief administrator of Uboontu Foundation digital platform.'),
  ('u2', 'Admin User', 'admin@uboontu.org',
   'pbkdf2$100000$14fb22064ea31feae942bcf42a978673$7c446ca3a33150d531ef31e9a31d213e6194e2b0ea0044ebf8537e20b2d1b8db',
   'Admin',
   'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80',
   'Content administrator and system manager.'),
  ('u3', 'Editor User', 'editor@uboontu.org',
   'pbkdf2$100000$9998ab68dfea68a9651522357ef50a17$49484f6b1a1ba766b615ed21c65b8ef584c43db2a9769975e60ff56e0587aeb5',
   'Editor',
   'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80',
   'Blog writer and editor.');

-- Default blogs
INSERT OR IGNORE INTO blogs (id, slug, title, excerpt, content, category, tags, date_label, read_time, image, is_featured, status, publish_date, seo_title, seo_description, author)
VALUES
(1,
 'transforming-urban-waste-manbhar-project',
 'Transforming Urban Waste: The Journey of Uboontu''s Manbhar Project',
 'Discover how the Manbhar Project is pioneering municipal solid waste management, cleaning up landfill sites, and creating clean communities through sustainable practices.',
 '<p>Municipal solid waste is one of the most pressing challenges facing urban areas today...</p>',
 'Waste Management',
 'Waste Management,Recycling,Composting,Community',
 'July 10, 2026',
 '6 min read',
 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
 1, 'Published', '2026-07-10T10:00:00.000Z',
 'Transforming Urban Waste: Manbhar Project | Uboontu',
 'Discover how the Manbhar Project is pioneering municipal solid waste management.',
 'Super Admin User'),
(2,
 'understanding-3rs-reduce-reuse-recycle',
 'Understanding the 3Rs: Reduce, Reuse, Recycle in Modern Communities',
 'A practical guide to implementing the 3R principles in daily households to reduce municipal load and support circular economy practices.',
 '<p>In a world dominated by single-use products, the concept of a circular economy is more vital than ever...</p>',
 'Circular Economy',
 '3Rs,Recycling,Circular Economy,Sustainability',
 'July 02, 2026',
 '4 min read',
 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
 0, 'Published', '2026-07-02T09:00:00.000Z',
 'Understanding the 3Rs: Reduce, Reuse, Recycle | Uboontu',
 'A practical guide to implementing the 3R principles.',
 'Editor User'),
(3,
 'empowering-youth-environmental-education',
 'Empowering Youth: The Role of Environmental Education in Schools',
 'How Uboontu Foundation is setting up active eco-clubs, school awareness campaigns, and composting training.',
 '<p>Sustainable habits are best formed early in life...</p>',
 'Community Development',
 'Education,Youth,Composting,Eco-clubs',
 'June 25, 2026',
 '5 min read',
 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
 0, 'Published', '2026-06-25T11:00:00.000Z',
 'Empowering Youth: Environmental Education in Schools | Uboontu',
 'How Uboontu Foundation is nurturing young green leaders.',
 'Admin User');

-- Gallery seed
INSERT OR IGNORE INTO blog_gallery (blog_id, url) VALUES
(1, 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80'),
(1, 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'),
(1, 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=800&q=80'),
(2, 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'),
(3, 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80');

-- Default contacts
INSERT OR IGNORE INTO contacts (id, name, email, phone, subject, message, is_read, reply_status, submitted_at)
VALUES
('c1', 'Rahul Sharma', 'rahul.sharma@example.com', '+91 98765 12345',
 'CSR Partnership Inquiry',
 'We are looking to partner with Uboontu Foundation for our upcoming CSR campaign focused on waste segregation in Gurgaon.',
 0, 'Unreplied', '2026-07-11T10:15:30.000Z'),
('c2', 'Priya Patel', 'priya.patel@workmail.net', '+91 98234 56789',
 'Volunteer Application',
 'I am a university student interested in volunteering for the composting workshops in Delhi.',
 1, 'Replied', '2026-07-09T14:40:00.000Z'),
('c3', 'John Doe', 'john.doe@gmail.com', '+1 555 890 2341',
 'General Question',
 'Hello, is there a sitemap or report available for the Manbhar Project?',
 1, 'Unreplied', '2026-07-05T08:22:11.000Z');

-- Default settings
INSERT OR IGNORE INTO settings (key, value) VALUES
('websiteName', 'Uboontu Foundation'),
('logoUrl', '/favicon.ico'),
('faviconUrl', '/favicon.ico'),
('seoTitle', 'Uboontu Foundation - Segregation at Source, Recycling, Composting'),
('seoDescription', 'Uboontu Foundation is a non-profit organization promoting sustainable waste management, composting, and circular economy in communities and schools.'),
('seoKeywords', 'waste management, recycling, composting, sustainability, CSR, circular economy, environmental education'),
('ogImageUrl', 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80'),
('robotsTxt', 'User-agent: *
Allow: /
Sitemap: https://uboontu.org/sitemap.xml'),
('sitemapUrl', 'https://uboontu.org/sitemap.xml');

-- Default media
INSERT OR IGNORE INTO media (id, name, url, type, size_bytes, uploaded_at) VALUES
('m1', 'Manbhar Project Banner',
 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80',
 'image/jpeg', 245000, '2026-07-10T10:00:00.000Z'),
('m2', 'Circular Economy Icon',
 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80',
 'image/jpeg', 198000, '2026-07-02T09:00:00.000Z'),
('m3', 'School Eco Club Training',
 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80',
 'image/jpeg', 312000, '2026-06-25T11:00:00.000Z');

-- Default notifications
INSERT OR IGNORE INTO notifications (id, type, message, is_read, created_at) VALUES
('n1', 'contact', 'New contact submission from Rahul Sharma: "CSR Partnership Inquiry"', 0, '2026-07-11T10:15:30.000Z'),
('n2', 'blog',    'Blog post "Transforming Urban Waste" published successfully.', 1, '2026-07-10T10:00:00.000Z'),
('n3', 'user',    'New user Editor User registered.', 1, '2026-07-01T15:30:00.000Z');

-- Default activity logs
INSERT OR IGNORE INTO activity_logs (id, user_name, action, details, created_at) VALUES
('l1', 'Super Admin User', 'Login',        'Logged in successfully from IP 192.168.1.10',         '2026-07-12T09:30:00.000Z'),
('l2', 'Admin User',       'Publish Blog', 'Published blog post: "Transforming Urban Waste"',     '2026-07-10T10:00:00.000Z');
