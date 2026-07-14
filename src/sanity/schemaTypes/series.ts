import { defineField, defineType } from 'sanity';

/**
 * A separate document (not embedded in each post) so all posts in the
 * same series share one roadmap instead of duplicating it seven times.
 */
export default defineType({
  name: 'series',
  title: 'Series',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'totalParts', title: 'Total Parts', type: 'number', validation: (r) => r.required() }),
    defineField({
      name: 'roadmap',
      title: 'Roadmap Entries',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'partNumber', title: 'Part Number', type: 'number' }),
            defineField({ name: 'title', title: 'Title', type: 'string' }),
            defineField({ name: 'subtitle', title: 'Subtitle', type: 'string' }),
            defineField({
              name: 'status',
              title: 'Status',
              type: 'string',
              options: { list: ['done', 'planned'] },
            }),
            defineField({
              name: 'post',
              title: 'Linked Post',
              type: 'reference',
              to: [{ type: 'post' }],
              description: 'Optional — links this roadmap entry to its published post.',
            }),
          ],
        },
      ],
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});
