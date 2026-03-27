export const allProjectsQuery = `*[_type == "project"] | order(order asc) {
  title,
  "slug": slug.current,
  titleEn,
  description,
  descriptionEn,
  order,
  "thumbnailUrl": thumbnail.asset->url,
  media[] {
    title,
    url,
    type
  }
}`;

function getYouTubeThumbnail(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]{11})/);
  return match ? `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg` : null;
}

export function getThumbnailUrl(project: { thumbnailUrl?: string; media?: Array<{ url: string; type: string }> }): string {
  if (project.thumbnailUrl) return project.thumbnailUrl;
  const firstMedia = project.media?.[0];
  if (firstMedia?.type === 'youtube') {
    return getYouTubeThumbnail(firstMedia.url) || '';
  }
  return '';
}

export const siteSettingsQuery = `*[_type == "siteSettings"][0] {
  heroName,
  heroRoleEs,
  heroRoleEn,
  heroTaglineEs,
  heroTaglineEn,
  footerQuoteTitleEs,
  footerQuoteTitleEn,
  footerQuoteEs,
  footerQuoteEn,
  colaboremosEmail,
  socialLinks[] {
    platform,
    url
  }
}`;
