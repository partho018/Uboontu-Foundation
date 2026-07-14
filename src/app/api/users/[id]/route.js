// src/app/api/users/[id]/route.js
// GET    /api/users/[id] — get user
// PUT    /api/users/[id] — update user
// DELETE /api/users/[id] — delete user

import { getDB, ok, err, parseBody, requireAuth } from '@/lib/db';
import { hashPassword } from '@/lib/crypto';

export async function GET(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const u = await db.prepare(`SELECT id,name,email,role,profile_image,bio,two_factor_enabled,created_at FROM users WHERE id = ? LIMIT 1`).bind(params.id).first();
    if (!u) return err('User not found', 404);
    return ok({ ...u, profileImage: u.profile_image, twoFactorEnabled: u.two_factor_enabled === 1 });
  } catch (e) {
    return err(`Failed to fetch user: ${e.message}`, 500);
  }
}

export async function PUT(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const body = await parseBody(request);
  try {
    const fields = [], values = [];
    const allowed = ['name','email','role','profile_image','bio','two_factor_enabled','two_factor_secret'];
    for (const k of allowed) {
      if (body[k] !== undefined) {
        fields.push(`${k} = ?`);
        values.push(k === 'two_factor_enabled' ? (body[k] ? 1 : 0) : body[k]);
      }
    }
    if (body.password) {
      const passwordHash = await hashPassword(body.password);
      fields.push('password_hash = ?');
      values.push(passwordHash);
    }
    if (!fields.length) return err('Nothing to update', 400);
    values.push(params.id);
    await db.prepare(`UPDATE users SET ${fields.join(', ')} WHERE id = ?`).bind(...values).run();
    return ok({ updated: true });
  } catch (e) {
    return err(`Failed to update user: ${e.message}`, 500);
  }
}

export async function DELETE(request, { params }) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    await db.prepare(`DELETE FROM users WHERE id = ?`).bind(params.id).run();
    return ok({ deleted: true });
  } catch (e) {
    return err(`Failed to delete user: ${e.message}`, 500);
  }
}
