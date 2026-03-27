import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'heroName',
      title: 'Hero Name',
      type: 'string',
      initialValue: 'Karina Disondo',
    }),
    defineField({
      name: 'heroRoleEs',
      title: 'Hero Role (Spanish)',
      type: 'string',
      initialValue: 'PRODUCTORA AUDIOVISUAL',
    }),
    defineField({
      name: 'heroRoleEn',
      title: 'Hero Role (English)',
      type: 'string',
      initialValue: 'AUDIOVISUAL PRODUCER',
    }),
    defineField({
      name: 'heroTaglineEs',
      title: 'Hero Tagline (Spanish)',
      type: 'string',
      initialValue: 'Dirección · Producción · Edición · Postproducción',
    }),
    defineField({
      name: 'heroTaglineEn',
      title: 'Hero Tagline (English)',
      type: 'string',
      initialValue: 'Direction · Production · Editing · Post-production',
    }),
    defineField({
      name: 'footerQuoteEs',
      title: 'Footer Quote (Spanish)',
      type: 'text',
      initialValue:
        'Mi intención es mostrar una pincelada de proyectos en los que he dirigido, colaborado o participado con mucho amor y dedicación.',
    }),
    defineField({
      name: 'footerQuoteEn',
      title: 'Footer Quote (English)',
      type: 'text',
      initialValue:
        'My intention is to show a glimpse of projects I have directed, collaborated on, or participated in with much love and dedication.',
    }),
    defineField({
      name: 'footerQuoteTitleEs',
      title: 'Footer Quote Title (Spanish)',
      type: 'string',
      initialValue: '« Gratitud al reconocimiento »',
    }),
    defineField({
      name: 'footerQuoteTitleEn',
      title: 'Footer Quote Title (English)',
      type: 'string',
      initialValue: '« Gratitude for the recognition »',
    }),
    defineField({
      name: 'colaboremosEmail',
      title: 'Colaboremos Email',
      type: 'string',
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'platform', type: 'string', title: 'Platform' },
            { name: 'url', type: 'url', title: 'URL' },
          ],
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'heroName',
    },
  },
});
