/**
 * src/lib/crypto.js
 * Cryptographic helper module compatible with Node.js and Next.js Edge runtime (Cloudflare Workers).
 * Uses standard Web Crypto API (crypto.subtle) without native Node dependencies.
 */

// Handle Node.js polyfill if globalThis.crypto is undefined (older Node versions)
const cryptoObj = typeof globalThis !== 'undefined' && globalThis.crypto 
  ? globalThis.crypto 
  : require('crypto').webcrypto;

/**
 * Hash a password using PBKDF2 with SHA-256 (standard secure cryptographic hash).
 *
 * @param {string} password
 * @returns {Promise<string>} Format: pbkdf2$iterations$saltHex$hashHex
 */
export async function hashPassword(password) {
  if (!password) throw new Error('Password is required for hashing');
  
  const salt = cryptoObj.getRandomValues(new Uint8Array(16));
  const saltHex = Array.from(salt).map(b => b.toString(16).padStart(2, '0')).join('');
  
  const encoder = new TextEncoder();
  const passwordBuffer = encoder.encode(password);
  
  const keyMaterial = await cryptoObj.subtle.importKey(
    'raw',
    passwordBuffer,
    { name: 'PBKDF2' },
    false,
    ['deriveBits']
  );
  
  const derivedBits = await cryptoObj.subtle.deriveBits(
    {
      name: 'PBKDF2',
      salt: salt,
      iterations: 100000,
      hash: 'SHA-256'
    },
    keyMaterial,
    256 // derived key size in bits (32 bytes)
  );
  
  const hashHex = Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
  return `pbkdf2$100000$${saltHex}$${hashHex}`;
}

/**
 * Verify a password against a stored PBKDF2 hash.
 *
 * @param {string} password
 * @param {string} storedHash
 * @returns {Promise<boolean>}
 */
export async function verifyPassword(password, storedHash) {
  if (!password || !storedHash) return false;
  
  // Format check
  if (!storedHash.startsWith('pbkdf2$')) {
    return false;
  }
  
  const parts = storedHash.split('$');
  if (parts.length !== 4) return false;
  
  const iterations = parseInt(parts[1], 10);
  const saltHex = parts[2];
  const hashHex = parts[3];
  
  try {
    const salt = new Uint8Array(saltHex.match(/.{1,2}/g).map(byte => parseInt(byte, 16)));
    
    const encoder = new TextEncoder();
    const passwordBuffer = encoder.encode(password);
    
    const keyMaterial = await cryptoObj.subtle.importKey(
      'raw',
      passwordBuffer,
      { name: 'PBKDF2' },
      false,
      ['deriveBits']
    );
    
    const derivedBits = await cryptoObj.subtle.deriveBits(
      {
        name: 'PBKDF2',
        salt: salt,
        iterations: iterations,
        hash: 'SHA-256'
      },
      keyMaterial,
      256
    );
    
    const checkHex = Array.from(new Uint8Array(derivedBits)).map(b => b.toString(16).padStart(2, '0')).join('');
    return checkHex === hashHex;
  } catch (err) {
    console.error('Password verification error:', err);
    return false;
  }
}
