// src/app/api/notifications/route.js
// GET    /api/notifications          — list notifications (admin)
// PUT    /api/notifications?action=read — mark all as read
// DELETE /api/notifications          — clear all

import { getDB, ok, err, requireAuth } from '@/lib/db';


export async function GET(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const rows = await db.prepare(`SELECT * FROM notifications ORDER BY created_at DESC LIMIT 50`).all();
    return ok(rows.results.map(n => ({ ...n, isRead: n.is_read === 1, timestamp: n.created_at })));
  } catch (e) {
    return err(`Failed to fetch notifications: ${e.message}`, 500);
  }
}

export async function PUT(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    await db.prepare(`UPDATE notifications SET is_read = 1`).run();
    return ok({ markedRead: true });
  } catch (e) {
    return err(`Failed to update notifications: ${e.message}`, 500);
  }
}

export async function DELETE(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    await db.prepare(`DELETE FROM notifications`).run();
    return ok({ cleared: true });
  } catch (e) {
    return err(`Failed to clear notifications: ${e.message}`, 500);
  }
}
