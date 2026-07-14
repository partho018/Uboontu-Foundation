// src/app/api/media/route.js
// GET    /api/media  — list all media (admin)
// POST   /api/media  — add media item (admin)
// DELETE /api/media?id=xxx — delete media item (admin)

import { getDB, ok, err, uid, parseBody, requireAuth } from '@/lib/db';


export async function GET(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const rows = await db.prepare(`SELECT * FROM media ORDER BY uploaded_at DESC`).all();
    return ok(rows.results.map(m => ({ ...m, uploadDate: m.uploaded_at, size: m.size_bytes })));
  } catch (e) {
    return err(`Failed to fetch media: ${e.message}`, 500);
  }
}

export async function POST(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const { name, url, type = 'image/jpeg', size_bytes = 0 } = await parseBody(request);
  if (!name || !url) return err('name and url are required', 400);
  const id = uid('m');
  const now = new Date().toISOString();
  try {
    await db.prepare(`INSERT INTO media (id,name,url,type,size_bytes,uploaded_at) VALUES (?,?,?,?,?,?)`).bind(id, name, url, type, size_bytes, now).run();
    return ok({ id, name, url, uploadDate: now }, 201);
  } catch (e) {
    return err(`Failed to add media: ${e.message}`, 500);
  }
}

export async function DELETE(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  if (!id) return err('id is required', 400);
  try {
    await db.prepare(`DELETE FROM media WHERE id = ?`).bind(id).run();
    return ok({ deleted: true });
  } catch (e) {
    return err(`Failed to delete media: ${e.message}`, 500);
  }
}
