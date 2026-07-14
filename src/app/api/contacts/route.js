// src/app/api/contacts/route.js
// GET  /api/contacts  — list all submissions (admin protected)
// POST /api/contacts  — submit a new contact form (public)

import { getDB, ok, err, uid, parseBody, requireAuth } from '@/lib/db';


export async function GET(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const rows = await db.prepare(`SELECT * FROM contacts ORDER BY submitted_at DESC`).all();
    const contacts = rows.results.map(c => ({
      ...c,
      isRead: c.is_read === 1,
      replyStatus: c.reply_status,
      date: c.submitted_at,
    }));
    return ok(contacts);
  } catch (e) {
    return err(`Failed to fetch contacts: ${e.message}`, 500);
  }
}

export async function POST(request) {
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const body = await parseBody(request);
  const { name, email, phone = '', subject = '', message = '' } = body;
  if (!name || !email || !message) return err('name, email and message are required', 400);
  const id = uid('c');
  const now = new Date().toISOString();
  try {
    await db.prepare(
      `INSERT INTO contacts (id,name,email,phone,subject,message,is_read,reply_status,submitted_at) VALUES (?,?,?,?,?,?,0,'Unreplied',?)`
    ).bind(id, name, email, phone, subject, message, now).run();

    await db.prepare(`INSERT INTO notifications (id,type,message) VALUES (?,?,?)`).bind(uid('n'), 'contact', `New contact from ${name}: "${subject}"`).run();

    return ok({ id, submitted: true }, 201);
  } catch (e) {
    return err(`Failed to save contact: ${e.message}`, 500);
  }
}
