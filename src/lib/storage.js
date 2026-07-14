/**
 * src/lib/storage.js
 *
 * Smart data layer with dual-mode operation:
 * - PRODUCTION (Cloudflare Pages + D1): all data fetched/stored via API routes
 * - LOCAL DEV (npm run dev): falls back to localStorage so the app works offline
 *
 * Session management always uses localStorage (browser-only).
 */

const isClient = () => typeof window !== 'undefined';

// ─── API Helper ───────────────────────────────────────────────────────────────

const ADMIN_TOKEN = 'UBOONTU-ADMIN-SECRET-KEY-2026';

function adminHeaders() {
  return { 'Content-Type': 'application/json', 'x-admin-token': ADMIN_TOKEN };
}

async function apiCall(method, path, body) {
  const opts = { method, headers: adminHeaders() };
  if (body !== undefined) opts.body = JSON.stringify(body);
  const res = await fetch(path, opts);
  const json = await res.json();
  if (!json.ok) throw new Error(json.error || 'API error');
  return json.data;
}

// ─── LocalStorage Fallback Data ───────────────────────────────────────────────
// Used when D1 API is not available (local development)

const DEFAULT_USERS = [
  { id: 'u1', name: 'Super Admin User', email: 'superadmin@uboontu.org', password: 'password123', role: 'Super Admin', profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80', bio: 'Chief administrator.', twoFactorEnabled: false, twoFactorSecret: '' },
  { id: 'u2', name: 'Admin User', email: 'admin@uboontu.org', password: 'password123', role: 'Admin', profileImage: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&q=80', bio: 'Content administrator.', twoFactorEnabled: false, twoFactorSecret: '' },
  { id: 'u3', name: 'Editor User', email: 'editor@uboontu.org', password: 'editorpassword', role: 'Editor', profileImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80', bio: 'Blog writer.', twoFactorEnabled: false, twoFactorSecret: '' },
];

const DEFAULT_BLOGS = [
  { id: 1, slug: 'transforming-urban-waste-manbhar-project', title: "Transforming Urban Waste: The Journey of Uboontu's Manbhar Project", excerpt: 'Discover how the Manbhar Project is pioneering municipal solid waste management.', content: '<p>Municipal solid waste is one of the most pressing challenges facing urban areas today...</p>', category: 'Waste Management', tags: ['Waste Management', 'Recycling', 'Composting', 'Community'], date: 'July 10, 2026', readTime: '6 min read', image: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80'], isFeatured: true, status: 'Published', publishDate: '2026-07-10T10:00:00.000Z', seoTitle: 'Transforming Urban Waste: Manbhar Project | Uboontu', seoDescription: 'Discover how the Manbhar Project is pioneering municipal solid waste management.', author: 'Super Admin User' },
  { id: 2, slug: 'understanding-3rs-reduce-reuse-recycle', title: 'Understanding the 3Rs: Reduce, Reuse, Recycle in Modern Communities', excerpt: 'A practical guide to implementing the 3R principles.', content: '<p>In a world dominated by single-use products, the concept of a circular economy is more vital than ever...</p>', category: 'Circular Economy', tags: ['3Rs', 'Recycling', 'Circular Economy'], date: 'July 02, 2026', readTime: '4 min read', image: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80'], isFeatured: false, status: 'Published', publishDate: '2026-07-02T09:00:00.000Z', seoTitle: 'Understanding the 3Rs | Uboontu', seoDescription: 'A practical guide to the 3R principles.', author: 'Editor User' },
  { id: 3, slug: 'empowering-youth-environmental-education', title: 'Empowering Youth: The Role of Environmental Education in Schools', excerpt: 'How Uboontu Foundation is setting up active eco-clubs and composting training.', content: '<p>Sustainable habits are best formed early in life...</p>', category: 'Community Development', tags: ['Education', 'Youth', 'Composting'], date: 'June 25, 2026', readTime: '5 min read', image: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80', gallery: ['https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?auto=format&fit=crop&w=800&q=80'], isFeatured: false, status: 'Published', publishDate: '2026-06-25T11:00:00.000Z', seoTitle: 'Empowering Youth | Uboontu', seoDescription: 'How Uboontu Foundation nurtures young green leaders.', author: 'Admin User' },
];

const DEFAULT_CONTACTS = [
  { id: 'c1', name: 'Rahul Sharma', email: 'rahul.sharma@example.com', phone: '+91 98765 12345', subject: 'CSR Partnership Inquiry', message: 'We are looking to partner with Uboontu Foundation.', date: '2026-07-11T10:15:30.000Z', isRead: false, replyStatus: 'Unreplied' },
  { id: 'c2', name: 'Priya Patel', email: 'priya.patel@workmail.net', phone: '+91 98234 56789', subject: 'Volunteer Application', message: 'I am interested in volunteering for composting workshops.', date: '2026-07-09T14:40:00.000Z', isRead: true, replyStatus: 'Replied' },
];

const DEFAULT_SETTINGS = { websiteName: 'Uboontu Foundation', logoUrl: '/favicon.ico', faviconUrl: '/favicon.ico', seoTitle: 'Uboontu Foundation - Segregation at Source, Recycling, Composting', seoDescription: 'Uboontu Foundation is a non-profit promoting sustainable waste management.', seoKeywords: 'waste management, recycling, composting, sustainability', ogImageUrl: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80', sitemapUrl: 'https://uboontu.org/sitemap.xml' };

const DEFAULT_MEDIA = [
  { id: 'm1', name: 'Manbhar Project Banner', url: 'https://images.unsplash.com/photo-1611284446314-60a58ac0deb9?auto=format&fit=crop&w=800&q=80', type: 'image/jpeg', size: 245000, uploadDate: '2026-07-10T10:00:00.000Z' },
  { id: 'm2', name: 'Circular Economy Icon', url: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80', type: 'image/jpeg', size: 198000, uploadDate: '2026-07-02T09:00:00.000Z' },
];

const DEFAULT_NOTIFICATIONS = [
  { id: 'n1', type: 'contact', message: 'New contact from Rahul Sharma', isRead: false, timestamp: '2026-07-11T10:15:30.000Z' },
];

const DEFAULT_LOGS = [
  { id: 'l1', user: 'Super Admin User', action: 'Login', details: 'Logged in successfully', timestamp: '2026-07-12T09:30:00.000Z' },
];

// ─── LocalStorage Init ────────────────────────────────────────────────────────

export const initDb = () => {
  if (!isClient()) return;
  if (!localStorage.getItem('uboontu_users')) localStorage.setItem('uboontu_users', JSON.stringify(DEFAULT_USERS));
  if (!localStorage.getItem('uboontu_blogs')) localStorage.setItem('uboontu_blogs', JSON.stringify(DEFAULT_BLOGS));
  if (!localStorage.getItem('uboontu_contacts')) localStorage.setItem('uboontu_contacts', JSON.stringify(DEFAULT_CONTACTS));
  if (!localStorage.getItem('uboontu_settings')) localStorage.setItem('uboontu_settings', JSON.stringify(DEFAULT_SETTINGS));
  if (!localStorage.getItem('uboontu_media')) localStorage.setItem('uboontu_media', JSON.stringify(DEFAULT_MEDIA));
  if (!localStorage.getItem('uboontu_notifications')) localStorage.setItem('uboontu_notifications', JSON.stringify(DEFAULT_NOTIFICATIONS));
  if (!localStorage.getItem('uboontu_activity_log')) localStorage.setItem('uboontu_activity_log', JSON.stringify(DEFAULT_LOGS));
};

function ls(key, fallback) {
  if (!isClient()) return fallback;
  try { return JSON.parse(localStorage.getItem(key)) || fallback; } catch { return fallback; }
}
function lsSet(key, val) { if (isClient()) localStorage.setItem(key, JSON.stringify(val)); }

// ─── Smart API / LS wrapper ────────────────────────────────────────────────────
// Tries the API route first; falls back to localStorage on failure (local dev)

// ─── BLOGS ────────────────────────────────────────────────────────────────────

export const getBlogs = async () => {
  try {
    return await apiCall('GET', '/api/blogs');
  } catch {
    initDb();
    return ls('uboontu_blogs', DEFAULT_BLOGS);
  }
};

export const addBlog = async (blog, authorName) => {
  const payload = { ...blog, author: authorName || blog.author || 'System' };
  try {
    return await apiCall('POST', '/api/blogs', payload);
  } catch {
    initDb();
    const blogs = ls('uboontu_blogs', DEFAULT_BLOGS);
    const newBlog = { ...payload, id: Date.now(), date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) };
    lsSet('uboontu_blogs', [newBlog, ...blogs]);
    return newBlog;
  }
};

export const updateBlog = async (id, updatedFields, authorName) => {
  const payload = { ...updatedFields, author: authorName || updatedFields.author || 'System' };
  try {
    return await apiCall('PUT', `/api/blogs/${id}`, payload);
  } catch {
    const blogs = ls('uboontu_blogs', DEFAULT_BLOGS);
    const idx = blogs.findIndex(b => String(b.id) === String(id));
    if (idx !== -1) { blogs[idx] = { ...blogs[idx], ...payload }; lsSet('uboontu_blogs', blogs); return blogs[idx]; }
    return null;
  }
};

export const deleteBlog = async (id) => {
  try {
    return await apiCall('DELETE', `/api/blogs/${id}`);
  } catch {
    const blogs = ls('uboontu_blogs', DEFAULT_BLOGS);
    lsSet('uboontu_blogs', blogs.filter(b => String(b.id) !== String(id)));
  }
};

// ─── CONTACTS ─────────────────────────────────────────────────────────────────

export const getContacts = async () => {
  try {
    return await apiCall('GET', '/api/contacts');
  } catch {
    initDb();
    return ls('uboontu_contacts', DEFAULT_CONTACTS);
  }
};

export const addContact = async (contact) => {
  try {
    return await apiCall('POST', '/api/contacts', contact);
  } catch {
    initDb();
    const contacts = ls('uboontu_contacts', DEFAULT_CONTACTS);
    const newContact = { ...contact, id: 'c_' + Date.now(), date: new Date().toISOString(), isRead: false, replyStatus: 'Unreplied' };
    lsSet('uboontu_contacts', [newContact, ...contacts]);
    return newContact;
  }
};

export const updateContact = async (id, updatedFields) => {
  try {
    return await apiCall('PUT', `/api/contacts/${id}`, updatedFields);
  } catch {
    const contacts = ls('uboontu_contacts', DEFAULT_CONTACTS);
    const idx = contacts.findIndex(c => String(c.id) === String(id));
    if (idx !== -1) { contacts[idx] = { ...contacts[idx], ...updatedFields }; lsSet('uboontu_contacts', contacts); return contacts[idx]; }
    return null;
  }
};

export const deleteContact = async (id) => {
  try {
    return await apiCall('DELETE', `/api/contacts/${id}`);
  } catch {
    const contacts = ls('uboontu_contacts', DEFAULT_CONTACTS);
    lsSet('uboontu_contacts', contacts.filter(c => String(c.id) !== String(id)));
  }
};

// ─── USERS ────────────────────────────────────────────────────────────────────

export const getUsers = async () => {
  try {
    return await apiCall('GET', '/api/users');
  } catch {
    initDb();
    return ls('uboontu_users', DEFAULT_USERS);
  }
};

export const addUser = async (user) => {
  try {
    return await apiCall('POST', '/api/users', user);
  } catch {
    initDb();
    const users = ls('uboontu_users', DEFAULT_USERS);
    const newUser = { ...user, id: 'u_' + Date.now(), twoFactorEnabled: false, twoFactorSecret: '' };
    lsSet('uboontu_users', [...users, newUser]);
    return newUser;
  }
};

export const updateUser = async (id, updatedFields) => {
  try {
    return await apiCall('PUT', `/api/users/${id}`, updatedFields);
  } catch {
    const users = ls('uboontu_users', DEFAULT_USERS);
    const idx = users.findIndex(u => String(u.id) === String(id));
    if (idx !== -1) {
      users[idx] = { ...users[idx], ...updatedFields };
      lsSet('uboontu_users', users);
      const session = getSession();
      if (session && String(session.id) === String(id)) saveSession(users[idx]);
      return users[idx];
    }
    return null;
  }
};

export const deleteUser = async (id) => {
  try {
    return await apiCall('DELETE', `/api/users/${id}`);
  } catch {
    const users = ls('uboontu_users', DEFAULT_USERS);
    lsSet('uboontu_users', users.filter(u => String(u.id) !== String(id)));
  }
};

// ─── SETTINGS ─────────────────────────────────────────────────────────────────

export const getSettings = async () => {
  try {
    return await apiCall('GET', '/api/settings');
  } catch {
    initDb();
    return ls('uboontu_settings', DEFAULT_SETTINGS);
  }
};

export const saveSettings = async (settings) => {
  try {
    return await apiCall('PUT', '/api/settings', settings);
  } catch {
    lsSet('uboontu_settings', settings);
  }
};

// ─── MEDIA ────────────────────────────────────────────────────────────────────

export const getMedia = async () => {
  try {
    return await apiCall('GET', '/api/media');
  } catch {
    initDb();
    return ls('uboontu_media', DEFAULT_MEDIA);
  }
};

export const addMedia = async (item) => {
  try {
    return await apiCall('POST', '/api/media', item);
  } catch {
    initDb();
    const media = ls('uboontu_media', DEFAULT_MEDIA);
    const newItem = { ...item, id: 'm_' + Date.now(), uploadDate: new Date().toISOString() };
    lsSet('uboontu_media', [newItem, ...media]);
    return newItem;
  }
};

export const deleteMedia = async (id) => {
  try {
    return await apiCall('DELETE', `/api/media?id=${id}`);
  } catch {
    const media = ls('uboontu_media', DEFAULT_MEDIA);
    lsSet('uboontu_media', media.filter(m => String(m.id) !== String(id)));
  }
};

// ─── NOTIFICATIONS ────────────────────────────────────────────────────────────

export const getNotifications = async () => {
  try {
    return await apiCall('GET', '/api/notifications');
  } catch {
    initDb();
    return ls('uboontu_notifications', DEFAULT_NOTIFICATIONS);
  }
};

export const markNotificationsAsRead = async () => {
  try {
    return await apiCall('PUT', '/api/notifications', {});
  } catch {
    const n = ls('uboontu_notifications', DEFAULT_NOTIFICATIONS);
    lsSet('uboontu_notifications', n.map(x => ({ ...x, isRead: true })));
  }
};

export const clearNotifications = async () => {
  try {
    return await apiCall('DELETE', '/api/notifications');
  } catch {
    lsSet('uboontu_notifications', []);
  }
};

// ─── ACTIVITY LOGS ────────────────────────────────────────────────────────────

export const getActivityLogs = async () => {
  try {
    return await apiCall('GET', '/api/activity-logs');
  } catch {
    initDb();
    return ls('uboontu_activity_log', DEFAULT_LOGS);
  }
};

export const addActivityLog = async (user, action, details = '') => {
  try {
    return await apiCall('POST', '/api/activity-logs', { user, action, details });
  } catch {
    if (!isClient()) return;
    const logs = ls('uboontu_activity_log', DEFAULT_LOGS);
    const newLog = { id: 'l_' + Date.now(), user, action, details, timestamp: new Date().toISOString() };
    lsSet('uboontu_activity_log', [newLog, ...logs].slice(0, 100));
    return newLog;
  }
};

// ─── SESSION (localStorage — browser only) ────────────────────────────────────

export const getSession = () => {
  if (!isClient()) return null;
  try {
    const s = localStorage.getItem('uboontu_session');
    if (!s) return null;
    const obj = JSON.parse(s);
    if (obj.expiry && Date.now() > obj.expiry) { localStorage.removeItem('uboontu_session'); return null; }
    return obj.user;
  } catch { return null; }
};

export const saveSession = (user) => {
  if (!isClient()) return;
  localStorage.setItem('uboontu_session', JSON.stringify({ user, expiry: Date.now() + 2 * 60 * 60 * 1000 }));
};

export const clearSession = () => {
  if (!isClient()) return;
  localStorage.removeItem('uboontu_session');
};

// ─── RATE LIMIT ───────────────────────────────────────────────────────────────

const actionCount = {};
export const checkRateLimit = (key, max = 10, windowMs = 60000) => {
  const now = Date.now();
  if (!actionCount[key]) actionCount[key] = [];
  actionCount[key] = actionCount[key].filter(t => now - t < windowMs);
  if (actionCount[key].length >= max) return false;
  actionCount[key].push(now);
  return true;
};

// ─── CSRF ─────────────────────────────────────────────────────────────────────

export const generateCSRFToken = () => {
  if (!isClient()) return '';
  const token = Math.random().toString(36).slice(2) + Date.now().toString(36);
  sessionStorage.setItem('uboontu_csrf_token', token);
  return token;
};

export const validateCSRFToken = (token) => {
  if (!isClient()) return false;
  return sessionStorage.getItem('uboontu_csrf_token') === token;
};
