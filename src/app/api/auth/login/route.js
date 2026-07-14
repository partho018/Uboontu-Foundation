// src/app/api/auth/login/route.js
// POST /api/auth/login — validates credentials against D1 users table using secure PBKDF2 hash verification

import { getDB, ok, err, parseBody } from '@/lib/db';
import { verifyPassword } from '@/lib/crypto';

export async function POST(request) {
  const { email, password } = await parseBody(request);

  if (!email || !password) {
    return err('Email and password are required', 400);
  }

  const db = getDB(request);
  if (!db) return err('Database not available', 503);

  try {
    const user = await db.prepare(
      `SELECT id, name, email, role, profile_image, bio, two_factor_enabled, two_factor_secret, password_hash
       FROM users WHERE email = ? LIMIT 1`
    ).bind(email.toLowerCase().trim()).first();

    if (!user) {
      return err('Invalid email or password', 401);
    }

    const isValid = await verifyPassword(password, user.password_hash);
    if (!isValid) {
      return err('Invalid email or password', 401);
    }

    // Return user without password
    return ok({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      profileImage: user.profile_image,
      bio: user.bio,
      twoFactorEnabled: user.two_factor_enabled === 1,
      twoFactorSecret: user.two_factor_secret || '',
    });
  } catch (e) {
    return err(`Login failed: ${e.message}`, 500);
  }
}

