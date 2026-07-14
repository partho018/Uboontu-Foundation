// src/app/api/contacts/[id]/route.js
// GET    /api/contacts/[id] — view a contact (admin)
// PUT    /api/contacts/[id] — update read/reply status (admin)
// DELETE /api/contacts/[id] — delete a contact (admin)

import { getDB, ok, err, uid, parseBody, requireAuth } from '@/lib/db';


export async function GET(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const c = await db.prepare(`SELECT * FROM contacts WHERE id = ? LIMIT 1`).bind(params.id).first();
    if (!c) return err('Contact not found', 404);
    // Mark as read
    await db.prepare(`UPDATE contacts SET is_read = 1 WHERE id = ?`).bind(params.id).run();
    return ok({ ...c, isRead: true, replyStatus: c.reply_status, date: c.submitted_at });
  } catch (e) {
    return err(`Failed to fetch contact: ${e.message}`, 500);
  }
}

export async function PUT(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const { is_read, reply_status } = await parseBody(request);
  try {
    const fields = [], values = [];
    if (is_read !== undefined) { fields.push('is_read = ?'); values.push(is_read ? 1 : 0); }
    if (reply_status !== undefined) { fields.push('reply_status = ?'); values.push(reply_status); }
    if (!fields.length) return err('Nothing to update', 400);
    values.push(params.id);
    await db.prepare(`UPDATE contacts SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
    return ok({ updated: true });
  } catch (e) {
    return err(`Failed to update contact: ${e.message}`, 500);
  }
}

export async function DELETE(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    await db.prepare(`DELETE FROM contacts WHERE id = ?`).bind(params.id).run();
    return ok({ deleted: true });
  } catch (e) {
    return err(`Failed to delete contact: ${e.message}`, 500);
  }
}
