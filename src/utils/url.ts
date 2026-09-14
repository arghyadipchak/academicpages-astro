/**
 * URL and path resolution utilities for Astro base path support
 */

/**
 * Resolves an internal path or URL with the configured Astro base path
 * - External URLs (http://, https://, //) are returned unchanged
 * - Non-HTTP schemes (mailto:, tel:) and anchor links (#) are returned unchanged
 * - Relative and root-relative paths are prefixed with the base path
 * - Idempotent: calling resolveUrl on an already resolved path will not duplicate the base
 */
export function resolveUrl(path?: string): string {
  if (!path) return '';

  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('mailto:') ||
    path.startsWith('tel:') ||
    path.startsWith('#') ||
    path.startsWith('//')
  ) {
    return path;
  }

  const rawBase = import.meta.env.BASE_URL ?? '/';
  const baseUrl = rawBase.replace(/\/+$/, '');
  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (
    baseUrl &&
    (cleanPath === baseUrl || cleanPath.startsWith(`${baseUrl}/`))
  ) {
    return cleanPath;
  }

  const result = `${baseUrl}${cleanPath}`;
  return result || '/';
}

/**
 * Resolves a social or academic platform handle/ID or URL
 * - If already an HTTP/HTTPS URL, returns as-is
 * - If handle or username, prefixes with platform baseUrl and optional prefix
 * - Strips leading '@' if present
 */
export function resolveExternalUrl(
  val: string | undefined,
  baseUrl: string,
  prefix = ''
): string {
  if (!val) return '';
  if (val.startsWith('http://') || val.startsWith('https://')) return val;
  return `${baseUrl}${prefix}${val.replace(/^@/, '')}`;
}
