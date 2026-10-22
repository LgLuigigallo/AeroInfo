/**
 * Security utilities: HTML escaping, PostgREST parameter sanitization, and email validation.
 */

/**
 * Escapes characters with special meaning in HTML to prevent XSS / HTML Injection.
 */
export function escapeHtml(str: string): string {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

/**
 * Sanitizes input before being passed into PostgREST filter expressions (.or, .ilike).
 * Removes control characters like commas, parentheses, quotes, and semicolons that can alter PostgREST AST.
 */
export function sanitizePostgrestParam(input: string): string {
  if (!input) return '';
  // Truncate to reasonable max length (100 chars)
  const trimmed = input.slice(0, 100);
  // Remove PostgREST filter delimiters: commas, parentheses, double quotes, single quotes, backslashes
  return trimmed.replace(/[(),;'"\\]/g, ' ').replace(/\s+/g, ' ').trim();
}

/**
 * Validates email format according to RFC 5322 standard.
 */
export function isValidEmail(email: string): boolean {
  if (!email || typeof email !== 'string') return false;
  const trimmed = email.trim();
  if (trimmed.length > 254 || trimmed.length < 5) return false;
  // Standard RFC 5322 regex pattern
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
  return emailRegex.test(trimmed);
}
