// src/app/api/activity-logs/route.js
// GET  /api/activity-logs  — list logs (admin)
// POST /api/activity-logs  — add a log entry (admin)

import { getDB, ok, err, uid, parseBody, requireAuth } from '@/lib/db';


export async function GET(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const rows = await db.prepare(`SELECT * FROM activity_logs ORDER BY created_at DESC LIMIT 100`).all();
    return ok(rows.results.map(l => ({ ...l, user: l.user_name, timestamp: l.created_at })));
  } catch (e) {
    return err(`Failed to fetch logs: ${e.message}`, 500);
  }
}

export async function POST(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const { user, action, details = '' } = await parseBody(request);
  if (!user || !action) return err('user and action are required', 400);
  const id = uid('l');
  try {
    await db.prepare(`INSERT INTO activity_logs (id,user_name,action,details) VALUES (?,?,?,?)`).bind(id, user, action, details).run();
    return ok({ id }, 201);
  } catch (e) {
    return err(`Failed to add log: ${e.message}`, 500);
  }
}
