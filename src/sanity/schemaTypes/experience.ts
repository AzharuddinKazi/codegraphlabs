import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({ name: 'org', title: 'Organization', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'startDate', title: 'Start Date', type: 'date', validation: (r) => r.required() }),
    defineField({
      name: 'endDate',
      title: 'End Date',
      type: 'date',
      description: 'Leave empty if this is the current role.',
    }),
    defineField({
      name: 'active',
      title: 'Current Role',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'One-line intro before the bullet list.',
    }),
    defineField({
      name: 'bullets',
      title: 'Highlights',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'order',
      title: 'Sort Order',
      type: 'number',
      description: 'Lower numbers appear first (most recent = 0).',
    }),
  ],
  orderings: [
    {
      title: 'Sort Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
  preview: {
    select: { title: 'role', subtitle: 'org' },
  },
});
