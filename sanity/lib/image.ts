import imageUrlBuilder from '@sanity/image-url';

export const builder = imageUrlBuilder({
  projectId: import.meta.env.SANITY_PROJECT_ID || 'placeholder',
  dataset: import.meta.env.SANITY_DATASET || 'production',
});

export function urlFor(source: any) {
  return builder.image(source);
}
