/**
 * URL and path resolution utilities for Astro base path support
 */

const RAW_BASE = import.meta.env.BASE_URL ?? '/';
const BASE_PATH = RAW_BASE.replace(/\/+$/, '');

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
  )
    return path;

  const cleanPath = path.startsWith('/') ? path : `/${path}`;

  if (
    BASE_PATH &&
    (cleanPath === BASE_PATH || cleanPath.startsWith(`${BASE_PATH}/`))
  )
    return cleanPath;

  const result = `${BASE_PATH}${cleanPath}`;

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

/**
 * Resolves root-relative src and href attributes in HTML strings with the configured Astro base path
 */
export function resolveHtmlUrls(html?: string): string {
  if (!html || !BASE_PATH) return html ?? '';

  return html.replace(
    /\b(src|href)=(['"])(\/[^'"]*)\2/gi,
    (_match, attr, quote, path) => {
      const resolved = resolveUrl(path);

      return `${attr}=${quote}${resolved}${quote}`;
    }
  );
}

/**
 * Generates a clean URL-friendly slug from text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/&/g, '-and-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}

/**
 * Extracts the filename slug without extension
 */
export function getFileSlug(id: string): string {
  return id.replace(/\.md$/, '');
}

/**
 * Resolves the canonical internal URL for a blog post
 */
export function getPostUrl(post: {
  id: string;
  data: { permalink?: string };
}): string {
  if (post.data.permalink) return resolveUrl(post.data.permalink);

  return resolveUrl(`/posts/${getFileSlug(post.id)}/`);
}

/**
 * Resolves the canonical internal URL for a publication
 */
export function getPublicationUrl(pub: {
  id: string;
  data: { permalink?: string };
}): string {
  if (pub.data.permalink) return resolveUrl(pub.data.permalink);

  return resolveUrl(`/publications/${getFileSlug(pub.id)}/`);
}

/**
 * Resolves the canonical internal URL for a talk
 */
export function getTalkUrl(talk: {
  id: string;
  data: { permalink?: string };
}): string {
  if (talk.data.permalink) return resolveUrl(talk.data.permalink);

  return resolveUrl(`/talks/${getFileSlug(talk.id)}/`);
}

/**
 * Resolves the canonical internal URL for a teaching entry
 */
export function getTeachingUrl(item: {
  id: string;
  data: { permalink?: string };
}): string {
  if (item.data.permalink) return resolveUrl(item.data.permalink);

  return resolveUrl(`/teaching/${getFileSlug(item.id)}/`);
}

/**
 * Resolves the canonical internal URL for a portfolio item
 */
export function getPortfolioUrl(item: {
  id: string;
  data: { permalink?: string };
}): string {
  if (item.data.permalink) return resolveUrl(item.data.permalink);

  return resolveUrl(`/portfolio/${getFileSlug(item.id)}/`);
}

/**
 * Generates a CSS view-transition-name for title morphing from an internal URL
 */
export function getTitleTransitionName(url?: string): string | undefined {
  if (
    !url ||
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('//')
  )
    return undefined;

  const clean = url.replace(/[^a-zA-Z0-9_-]/g, '-').replace(/^-+|-+$/g, '');

  return clean ? `title-${clean}` : undefined;
}
