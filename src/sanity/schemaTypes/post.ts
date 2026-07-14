import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'description', title: 'Description (SEO + card)', type: 'text' }),
    defineField({ name: 'publishedAt', title: 'Published At', type: 'datetime' }),
    defineField({ name: 'readingTime', title: 'Reading Time (e.g. "9 min read")', type: 'string' }),
    defineField({
      name: 'series',
      title: 'Series',
      type: 'reference',
      to: [{ type: 'series' }],
      description: 'Optional — only set for posts that are part of a series.',
    }),
    defineField({
      name: 'partNumber',
      title: 'Part Number In Series',
      type: 'number',
      hidden: ({ document }) => !document?.series,
    }),
    defineField({
      name: 'disclaimer',
      title: 'Override Disclaimer',
      type: 'text',
      description: 'Leave empty to use the site-wide disclaimer from Site Settings.',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
    defineField({
      name: 'sources',
      title: 'Sources',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'label', title: 'Label', type: 'string' }),
            defineField({ name: 'url', title: 'URL', type: 'url' }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt' },
  },
});
