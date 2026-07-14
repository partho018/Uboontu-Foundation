// src/app/api/settings/route.js
// GET /api/settings  — get all settings as key-value object (admin protected)
// PUT /api/settings  — update settings (admin protected)

import { getDB, ok, err, parseBody, requireAuth } from '@/lib/db';


export async function GET(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const rows = await db.prepare(`SELECT key, value FROM settings`).all();
    const settings = {};
    for (const r of rows.results) settings[r.key] = r.value;
    return ok(settings);
  } catch (e) {
    return err(`Failed to fetch settings: ${e.message}`, 500);
  }
}

export async function PUT(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const body = await parseBody(request);
  try {
    for (const [key, value] of Object.entries(body)) {
      await db.prepare(`INSERT INTO settings (key,value) VALUES (?,?) ON CONFLICT(key) DO UPDATE SET value = excluded.value`).bind(key, String(value)).run();
    }
    return ok({ saved: true });
  } catch (e) {
    return err(`Failed to save settings: ${e.message}`, 500);
  }
}
