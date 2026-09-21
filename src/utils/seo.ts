import type { AuthorConfig } from '@data/siteConfig';
import { siteConfig } from '@data/siteConfig';
import { resolveUrl } from '@utils/url';

export type SchemaOrgNode = Record<string, unknown>;

export interface CitationMetadata {
  title?: string;
  author?: string;
  publicationDate?: string;
  journalTitle?: string;
  conferenceTitle?: string;
  pdfUrl?: string;
  venue?: string;
}

export interface BreadcrumbItem {
  title: string;
  href?: string;
}

/**
 * Builds standard Person schema for the site author
 */
export function buildPersonSchema(
  siteBase: string,
  author: AuthorConfig = siteConfig.author,
  avatarUrl?: string
): SchemaOrgNode {
  const sameAsLinks: string[] = [];
  if (author.github) sameAsLinks.push(`https://github.com/${author.github}`);
  if (author.linkedin)
    sameAsLinks.push(`https://www.linkedin.com/in/${author.linkedin}`);
  if (author.orcid) sameAsLinks.push(`https://orcid.org/${author.orcid}`);
  if (author.googlescholar) {
    sameAsLinks.push(
      `https://scholar.google.com/citations?user=${author.googlescholar}`
    );
  }
  if (author.arxiv) sameAsLinks.push(`https://arxiv.org/a/${author.arxiv}`);
  if (author.dblp) sameAsLinks.push(`https://dblp.org/pid/${author.dblp}`);
  if (author.researchgate) {
    sameAsLinks.push(
      `https://www.researchgate.net/profile/${author.researchgate}`
    );
  }
  if (author.semantic) {
    sameAsLinks.push(
      `https://www.semanticscholar.org/author/${author.semantic}`
    );
  }

  const resolvedAvatar = avatarUrl
    ? avatarUrl.startsWith('http')
      ? avatarUrl
      : new URL(resolveUrl(avatarUrl), siteBase).toString()
    : undefined;

  return {
    '@type': 'Person',
    '@id': `${siteBase}#author`,
    name: author.name,
    url: siteBase,
    image: resolvedAvatar,
    jobTitle: author.employer,
    description: author.bio,
    sameAs: sameAsLinks.length > 0 ? sameAsLinks : undefined,
  };
}

/**
 * Builds WebSite schema
 */
export function buildWebSiteSchema(siteBase: string): SchemaOrgNode {
  return {
    '@type': 'WebSite',
    '@id': `${siteBase}#website`,
    name: siteConfig.title,
    url: siteBase,
    description: siteConfig.description,
    inLanguage: siteConfig.locale,
    publisher: { '@id': `${siteBase}#author` },
  };
}

/**
 * Builds ProfilePage schema for author bio / cv / homepage
 */
export function buildProfilePageSchema(
  canonicalUrl: string,
  siteBase: string,
  title: string,
  description?: string
): SchemaOrgNode {
  return {
    '@type': 'ProfilePage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: title,
    description: description || siteConfig.description,
    mainEntity: { '@id': `${siteBase}#author` },
    isPartOf: { '@id': `${siteBase}#website` },
  };
}

/**
 * Builds ScholarlyArticle schema for publications
 */
export function buildScholarlyArticleSchema(
  canonicalUrl: string,
  siteBase: string,
  citation: CitationMetadata,
  description?: string,
  imageUrl?: string
): SchemaOrgNode {
  const authorName = citation.author || siteConfig.author.name;

  return {
    '@type': 'ScholarlyArticle',
    '@id': `${canonicalUrl}#article`,
    headline: citation.title,
    name: citation.title,
    author: { '@type': 'Person', name: authorName },
    datePublished: citation.publicationDate,
    description,
    image: imageUrl,
    url: canonicalUrl,
    isPartOf:
      citation.journalTitle || citation.venue
        ? {
            '@type': 'Periodical',
            name: citation.journalTitle || citation.venue,
          }
        : undefined,
    publisher: { '@id': `${siteBase}#author` },
    mainEntityOfPage: canonicalUrl,
  };
}

/**
 * Builds Course schema for teaching items
 */
export function buildCourseSchema(
  canonicalUrl: string,
  siteBase: string,
  title: string,
  description?: string,
  provider?: string,
  term?: string
): SchemaOrgNode {
  return {
    '@type': 'Course',
    '@id': `${canonicalUrl}#course`,
    name: title,
    description: description || title,
    url: canonicalUrl,
    provider: provider
      ? { '@type': 'EducationalOrganization', name: provider }
      : { '@id': `${siteBase}#author` },
    coursePrerequisites: term ? `Term: ${term}` : undefined,
    instructor: { '@id': `${siteBase}#author` },
  };
}

/**
 * Builds EducationEvent / Event schema for talks and tutorials
 */
export function buildEventSchema(
  canonicalUrl: string,
  siteBase: string,
  title: string,
  date?: string | Date,
  location?: string,
  description?: string
): SchemaOrgNode {
  const isoDate =
    date instanceof Date
      ? date.toISOString().split('T')[0]
      : typeof date === 'string'
        ? date
        : undefined;

  return {
    '@type': 'EducationEvent',
    '@id': `${canonicalUrl}#event`,
    name: title,
    description: description || title,
    startDate: isoDate,
    url: canonicalUrl,
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    eventStatus: 'https://schema.org/EventScheduled',
    location: location ? { '@type': 'Place', name: location } : undefined,
    organizer: { '@id': `${siteBase}#author` },
  };
}

/**
 * Builds BlogPosting schema for blog posts
 */
export function buildBlogPostingSchema(
  canonicalUrl: string,
  siteBase: string,
  title: string,
  datePublished?: string | Date,
  dateModified?: string | Date,
  description?: string,
  imageUrl?: string
): SchemaOrgNode {
  const publishedIso =
    datePublished instanceof Date
      ? datePublished.toISOString()
      : typeof datePublished === 'string'
        ? datePublished
        : undefined;

  const modifiedIso =
    dateModified instanceof Date
      ? dateModified.toISOString()
      : typeof dateModified === 'string'
        ? dateModified
        : publishedIso;

  return {
    '@type': 'BlogPosting',
    '@id': `${canonicalUrl}#article`,
    headline: title,
    name: title,
    description,
    image: imageUrl,
    datePublished: publishedIso,
    dateModified: modifiedIso,
    url: canonicalUrl,
    author: { '@id': `${siteBase}#author` },
    publisher: { '@id': `${siteBase}#author` },
    mainEntityOfPage: canonicalUrl,
  };
}

/**
 * Builds CreativeWork / SoftwareSourceCode schema for portfolio items
 */
export function buildCreativeWorkSchema(
  canonicalUrl: string,
  siteBase: string,
  title: string,
  description?: string,
  date?: string | Date,
  imageUrl?: string,
  codeUrl?: string
): SchemaOrgNode {
  const isoDate =
    date instanceof Date
      ? date.toISOString().split('T')[0]
      : typeof date === 'string'
        ? date
        : undefined;

  const type = codeUrl ? 'SoftwareSourceCode' : 'CreativeWork';

  return {
    '@type': type,
    '@id': `${canonicalUrl}#work`,
    name: title,
    description,
    dateCreated: isoDate,
    image: imageUrl,
    url: canonicalUrl,
    codeRepository: codeUrl,
    creator: { '@id': `${siteBase}#author` },
  };
}

/**
 * Builds BreadcrumbList schema
 */
export function buildBreadcrumbListSchema(
  canonicalUrl: string,
  siteBase: string,
  items: BreadcrumbItem[]
): SchemaOrgNode {
  return {
    '@type': 'BreadcrumbList',
    '@id': `${canonicalUrl}#breadcrumbs`,
    itemListElement: items.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: item.title,
      item: item.href
        ? item.href.startsWith('http')
          ? item.href
          : new URL(item.href, siteBase).toString()
        : undefined,
    })),
  };
}
