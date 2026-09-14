import { siteConfig } from '../data/siteConfig';

/**
 * Formats a date into a localized date string using siteConfig.locale
 */
export function formatDate(
  date: Date | string | number | undefined,
  options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }
): string | undefined {
  if (!date) return undefined;
  return new Date(date).toLocaleDateString(siteConfig.locale, options);
}

/**
 * Formats a date into a localized 4-digit year string using siteConfig.locale
 */
export function formatYear(
  date: Date | string | number | undefined
): string | undefined {
  if (!date) return undefined;
  return new Date(date).toLocaleDateString(siteConfig.locale, {
    year: 'numeric',
  });
}
