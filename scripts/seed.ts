import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const envPath = resolve(import.meta.dirname, '../.env.local');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx);
  const value = trimmed.slice(eqIdx + 1);
  process.env[key] = value;
}

import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

const projects = [
  {
    _type: 'project',
    title: 'Mujeres Fuertes',
    slug: { _type: 'slug', current: 'mujeres-fuertes' },
    titleEn: 'Strong Women',
    description: 'Dirección y Co-producción del documental. Material educativo sobre la prevención de violencia para inspirar a vivir en libertad.',
    descriptionEn: 'Direction and co-production of the documentary. Educational material on violence prevention to inspire living in freedom.',
    order: 1,
    media: [
      { _type: 'mediaItem', title: 'Teaser', url: 'https://www.youtube.com/watch?v=S7LNQHob1AY', type: 'youtube' },
      { _type: 'mediaItem', title: 'Documental', url: 'https://www.youtube.com/watch?v=S7LNQHob1AY', type: 'youtube' },
    ],
  },
  {
    _type: 'project',
    title: 'Recuperación Histórica CCT',
    slug: { _type: 'slug', current: 'recuperacion-historica-cct' },
    titleEn: 'Historical Recovery CCT',
    description: 'Recuperación histórica del Centro de Capacitación para Trabajadoras. Entrevistas a tres generaciones de mujeres.',
    descriptionEn: 'Historical recovery of the Worker Women\'s Training Center. Interviews with three generations of women.',
    order: 2,
    media: [
      { _type: 'mediaItem', title: 'Ana Báez', url: 'https://www.youtube.com/watch?v=6FjA_as6UXU', type: 'youtube' },
      { _type: 'mediaItem', title: 'Vivienne Solís', url: 'https://www.youtube.com/watch?v=3797QaUp3vU', type: 'youtube' },
      { _type: 'mediaItem', title: 'Katiana', url: 'https://www.youtube.com/watch?v=HyN3LsIS4Tk', type: 'youtube' },
      { _type: 'mediaItem', title: 'Katiana Reel', url: 'https://www.instagram.com/reel/DHBo510vS8y/', type: 'instagram' },
    ],
  },
  {
    _type: 'project',
    title: 'Mujer Salvaje',
    slug: { _type: 'slug', current: 'mujer-salvaje' },
    titleEn: 'Wild Woman',
    description: 'Exploración visual de la mujer y su conexión con la naturaleza salvaje. Tráiler del proyecto audiovisual.',
    descriptionEn: 'Visual exploration of woman and her connection to wild nature. Trailer of the audiovisual project.',
    order: 3,
    media: [
      { _type: 'mediaItem', title: 'Tráiler', url: 'https://drive.google.com/file/d/1ZfDQrP0cDI3bJjveYfg6Val3QhMfJbE4/preview', type: 'drive' },
      { _type: 'mediaItem', title: 'Reel', url: 'https://www.instagram.com/reel/DF0aNbLReEi/', type: 'instagram' },
    ],
  },
  {
    _type: 'project',
    title: 'Producers Trust',
    slug: { _type: 'slug', current: 'producers-trust' },
    titleEn: 'Producers Trust',
    description: 'Producción audiovisual para Producers Trust y sus marcas asociadas: Quinoa, StoryBird y Alaffia.',
    descriptionEn: 'Audiovisual production for Producers Trust and associated brands: Quinoa, StoryBird, and Alaffia.',
    order: 4,
    media: [
      { _type: 'mediaItem', title: 'Quinoa', url: 'https://www.youtube.com/watch?v=uaI_5sYb754', type: 'youtube' },
      { _type: 'mediaItem', title: 'StoryBird', url: 'https://www.youtube.com/watch?v=pXpoXD8k1F0', type: 'youtube' },
      { _type: 'mediaItem', title: 'Alaffia', url: 'https://www.youtube.com/watch?v=03jLgAV0FlI', type: 'youtube' },
      { _type: 'mediaItem', title: 'Instagram', url: 'https://www.instagram.com/producersmarket/', type: 'instagram' },
    ],
  },
  {
    _type: 'project',
    title: 'Regenerative Homestead',
    slug: { _type: 'slug', current: 'regenerative-homestead' },
    titleEn: 'Regenerative Homestead',
    description: 'Documental sobre prácticas regenerativas y vida sostenible en un hogar autosuficiente.',
    descriptionEn: 'Documentary about regenerative practices and sustainable living in a self-sufficient homestead.',
    order: 5,
    media: [
      { _type: 'mediaItem', title: 'Documental', url: 'https://www.youtube.com/watch?v=OwBdLVUE9Jw', type: 'youtube' },
    ],
  },
  {
    _type: 'project',
    title: 'ESD Professionals',
    slug: { _type: 'slug', current: 'esd-professionals' },
    titleEn: 'ESD Professionals',
    description: 'Contenido audiovisual profesional para ESD. Producción corporativa de alto nivel.',
    descriptionEn: 'Professional audiovisual content for ESD. High-end corporate production.',
    order: 6,
    media: [
      { _type: 'mediaItem', title: 'Video', url: 'https://drive.google.com/file/d/1c7O1Vxg8Cjc7NoKbyznwow-vk8fjfI4G/preview', type: 'drive' },
    ],
  },
  {
    _type: 'project',
    title: 'Curso Mujeres Fuertes',
    slug: { _type: 'slug', current: 'curso-mujeres-fuertes' },
    titleEn: 'Strong Women Course',
    description: 'Curso online de empoderamiento para mujeres. Producción de material audiovisual educativo.',
    descriptionEn: 'Online empowerment course for women. Production of educational audiovisual material.',
    order: 7,
    media: [
      { _type: 'mediaItem', title: 'Curso Online', url: 'https://hotmart.com/es/marketplace/productos/mujeresfuertes/M53477666S', type: 'external' },
    ],
  },
  {
    _type: 'project',
    title: 'Freelance Reels',
    slug: { _type: 'slug', current: 'freelance-reels' },
    titleEn: 'Freelance Reels',
    description: 'Reels y contenido corto para diversos clientes: Janzu, Hilando Fino y Coral Sintético.',
    descriptionEn: 'Reels and short-form content for various clients: Janzu, Hilando Fino, and Coral Sintético.',
    order: 8,
    media: [
      { _type: 'mediaItem', title: 'Janzu', url: 'https://www.instagram.com/reel/C6M3CqXxSET/', type: 'instagram' },
      { _type: 'mediaItem', title: 'Hilando Fino', url: 'https://www.instagram.com/reel/CtH17SPLkLO/', type: 'instagram' },
      { _type: 'mediaItem', title: 'Coral Sintético', url: 'https://www.instagram.com/reel/CNQPb8CBBjQ/', type: 'instagram' },
    ],
  },
];

const siteSettings = {
  _type: 'siteSettings',
  heroName: 'Karina Disondo',
  heroRoleEs: 'PRODUCTORA AUDIOVISUAL',
  heroRoleEn: 'AUDIOVISUAL PRODUCER',
  heroTaglineEs: 'Dirección · Producción · Edición · Postproducción',
  heroTaglineEn: 'Direction · Production · Editing · Post-production',
  footerQuoteTitleEs: '« Gratitud al reconocimiento »',
  footerQuoteTitleEn: '« Gratitude for the recognition »',
  footerQuoteEs: 'Mi intención es mostrar una pincelada de proyectos en los que he dirigido, colaborado o participado con mucho amor y dedicación.',
  footerQuoteEn: 'My intention is to show a glimpse of projects I have directed, collaborated on, or participated in with much love and dedication.',
};

async function seed() {
  console.log('Seeding Sanity CMS...\n');

  const transaction = client.transaction();

  for (const project of projects) {
    transaction.create(project);
    console.log(`  + ${project.title}`);
  }

  transaction.create(siteSettings);
  console.log(`  + Site Settings`);

  try {
    await transaction.commit();
    console.log('\nDone! All data seeded successfully.');
  } catch (err) {
    console.error('\nSeed failed:', err);
    process.exit(1);
  }
}

seed();
