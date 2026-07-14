/**
 * src/lib/db.js
 * Cloudflare D1 database client helper for Next.js API routes.
 *
 * How D1 binding works:
 * - On Cloudflare Pages (production): use @cloudflare/next-on-pages getRequestContext()
 * - Local dev (npm run dev): DB binding is unavailable → routes return 503 gracefully
 */

class CloudflareD1HTTPStatement {
  constructor(client, sql, params = []) {
    this.client = client;
    this.sql = sql;
    this.params = params;
  }

  bind(...params) {
    return new CloudflareD1HTTPStatement(this.client, this.sql, params);
  }

  async executeQuery() {
    const url = `https://api.cloudflare.com/client/v4/accounts/${this.client.accountId}/d1/database/${this.client.databaseId}/query`;
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.client.apiToken}`,
      },
      body: JSON.stringify({
        sql: this.sql,
        params: this.params,
      }),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      const errMsg = errBody.errors?.[0]?.message || `HTTP ${res.status}: ${res.statusText}`;
      throw new Error(`D1 API error: ${errMsg}`);
    }

    const data = await res.json();
    if (!data.success) {
      const errMsg = data.errors?.[0]?.message || 'Unknown API error';
      throw new Error(`D1 API error: ${errMsg}`);
    }

    return data.result?.[0] || { results: [], success: false, meta: {} };
  }

  async all() {
    const resultObj = await this.executeQuery();
    return {
      results: resultObj.results || [],
      success: resultObj.success,
      meta: resultObj.meta || {},
    };
  }

  async first(colName) {
    const resultObj = await this.executeQuery();
    const rows = resultObj.results || [];
    if (rows.length === 0) return null;
    const firstRow = rows[0];
    if (colName !== undefined) {
      return firstRow[colName];
    }
    return firstRow;
  }

  async run() {
    const resultObj = await this.executeQuery();
    return {
      success: resultObj.success,
      meta: resultObj.meta || {},
    };
  }
}

class CloudflareD1HTTPClient {
  constructor(accountId, databaseId, apiToken) {
    this.accountId = accountId;
    this.databaseId = databaseId;
    this.apiToken = apiToken;
  }

  prepare(sql) {
    return new CloudflareD1HTTPStatement(this, sql);
  }
}

/**
 * Get the D1 database instance from the Cloudflare request context or HTTP REST API fallback.
 *
 * @param {Request} [request] - optional, kept for API compatibility
 * @returns {any}
 */
export function getDB(request) {
  try {
    // Cloudflare Pages / @cloudflare/next-on-pages binding resolved dynamically
    // to bypass webpack compile-time resolution warnings during local builds
    const moduleName = '@cloudflare/next-on-pages';
    const nextOnPages = typeof __non_webpack_require__ === 'function'
      ? __non_webpack_require__(moduleName)
      : require(moduleName);
    const getRequestContext = nextOnPages.getRequestContext;
    const ctx = getRequestContext();
    if (ctx && ctx.env && ctx.env.DB) return ctx.env.DB;
  } catch {
    // Not in Cloudflare environment — local dev
  }

  // Fallback: wrangler pages dev injects via globalThis
  if (typeof globalThis !== 'undefined' && globalThis.DB) return globalThis.DB;

  // Fallback: Cloudflare D1 HTTP REST API for Vercel / local dev
  const cfAccountId = process.env.CLOUDFLARE_ACCOUNT_ID;
  const cfDatabaseId = process.env.CLOUDFLARE_D1_DATABASE_ID;
  const cfApiToken = process.env.CLOUDFLARE_API_TOKEN;

  if (cfAccountId && cfDatabaseId && cfApiToken) {
    return new CloudflareD1HTTPClient(cfAccountId, cfDatabaseId, cfApiToken);
  }

  return null; // Local npm run dev — no D1 available
}

/**
 * Standard JSON success response
 */
export function ok(data, status = 200) {
  return Response.json({ ok: true, data }, { status });
}

/**
 * Standard JSON error response
 */
export function err(message, status = 400) {
  return Response.json({ ok: false, error: message }, { status });
}

/**
 * Generate a unique ID with a given prefix
 */
export function uid(prefix = 'id') {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

/**
 * Parse JSON body safely
 */
export async function parseBody(request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

/**
 * Simple auth guard — checks X-Admin-Token header.
 * Returns an error Response if auth fails, or null if auth passes.
 */
export function requireAuth(request) {
  const token = request.headers.get('x-admin-token');
  const secret = process.env.ADMIN_SECRET || 'UBOONTU-ADMIN-SECRET-KEY-2026';
  if (!token || token !== secret) {
    return err('Unauthorized', 401);
  }
  return null;
}
