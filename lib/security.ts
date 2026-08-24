// In-memory rate limiter for API routes
const rateLimits = new Map<string, { count: number; windowStart: number }>();

export function rateLimiter(identifier: string, endpoint: string, limit: number, windowMs: number): boolean {
  const key = `${identifier}:${endpoint}`;
  const now = Date.now();
  const record = rateLimits.get(key);

  if (!record) {
    rateLimits.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (now - record.windowStart > windowMs) {
    rateLimits.set(key, { count: 1, windowStart: now });
    return true;
  }

  if (record.count >= limit) {
    return false;
  }

  record.count += 1;
  return true;
}

// CSRF token generation and validation
export function generateCsrfToken(): string {
  return Array.from(crypto.getRandomValues(new Uint8Array(32)))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}

export function validateCsrfToken(token: string, stored: string): boolean {
  if (!token || !stored) return false;
  return token === stored;
}

// Input sanitizer: strips HTML tags, trims whitespace
export function sanitize(input: string): string {
  if (!input) return '';
  return input.replace(/<\/?[^>]+(>|$)/g, "").trim();
}

// Validate file upload: type and size checks
export function validateFileUpload(file: File, allowedTypes: string[], maxSizeMB: number): { valid: boolean; error?: string } {
  if (!allowedTypes.includes(file.type)) {
    return { valid: false, error: `File type ${file.type} is not allowed.` };
  }
  
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return { valid: false, error: `File size exceeds the limit of ${maxSizeMB} MB.` };
  }
  
  return { valid: true };
}
