import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({ name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'role', title: 'Role / Org', type: 'string' }),
    defineField({
      name: 'relationship',
      title: 'Relationship',
      type: 'string',
      options: {
        list: [
          { title: 'Direct manager', value: 'direct-manager' },
          { title: 'Client', value: 'client' },
          { title: 'Teammate', value: 'teammate' },
          { title: 'Collaborator', value: 'collaborator' },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'quote', title: 'Quote', type: 'text', validation: (r) => r.required() }),
    defineField({
      name: 'featured',
      title: 'Featured (carries the single crimson accent)',
      type: 'boolean',
      initialValue: false,
      description: 'Only one testimonial per page should be featured, per the design system\'s one-accent rule.',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
});
