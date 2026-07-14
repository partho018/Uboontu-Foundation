// src/app/api/users/route.js
// GET  /api/users  — list all users (admin protected)
// POST /api/users  — create user (admin protected)

import { getDB, ok, err, uid, parseBody, requireAuth } from '@/lib/db';
import { hashPassword } from '@/lib/crypto';

function sanitize(u) {
  const { password_hash, ...safe } = u;
  return { ...safe, profileImage: u.profile_image, twoFactorEnabled: u.two_factor_enabled === 1 };
}

export async function GET(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  try {
    const rows = await db.prepare(`SELECT * FROM users ORDER BY created_at ASC`).all();
    return ok(rows.results.map(sanitize));
  } catch (e) {
    return err(`Failed to fetch users: ${e.message}`, 500);
  }
}

export async function POST(request) {
  const authErr = requireAuth(request);
  if (authErr) return authErr;
  const db = getDB(request);
  if (!db) return err('Database not available', 503);
  const { name, email, password, role = 'Editor', profile_image = '', bio = '' } = await parseBody(request);
  if (!name || !email || !password) return err('name, email and password are required', 400);
  const id = uid('u');
  try {
    const passwordHash = await hashPassword(password);
    await db.prepare(
      `INSERT INTO users (id,name,email,password_hash,role,profile_image,bio) VALUES (?,?,?,?,?,?,?)`
    ).bind(id, name, email, passwordHash, role, profile_image, bio).run();
    await db.prepare(`INSERT INTO notifications (id,type,message) VALUES (?,?,?)`).bind(uid('n'), 'user', `New user "${name}" (${role}) added.`).run();
    await db.prepare(`INSERT INTO activity_logs (id,user_name,action,details) VALUES (?,?,?,?)`).bind(uid('l'), 'System', 'Create User', `Added user: "${name}" (${role})`).run();
    return ok({ id, name, email, role }, 201);
  } catch (e) {
    if (e.message.includes('UNIQUE')) return err('Email already exists', 409);
    return err(`Failed to create user: ${e.message}`, 500);
  }
}
