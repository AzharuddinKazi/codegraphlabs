import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'project',
  title: 'Project',
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
    defineField({
      name: 'type',
      title: 'Type',
      type: 'string',
      options: {
        list: [
          { title: 'Personal build', value: 'personal-build' },
          { title: 'Client engagement', value: 'client-engagement' },
          { title: 'Employer work', value: 'employer-work' },
        ],
      },
      initialValue: 'personal-build',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          { title: 'Active development', value: 'active-development' },
          { title: 'Complete', value: 'complete' },
          { title: 'Archived', value: 'archived' },
        ],
      },
      initialValue: 'active-development',
    }),
    defineField({ name: 'summary', title: 'Summary', type: 'text' }),
    defineField({ name: 'statHighlight', title: 'Stat Highlight (e.g. "+32pp")', type: 'string' }),
    defineField({ name: 'statCaption', title: 'Stat Caption', type: 'text' }),
    defineField({ name: 'repoUrl', title: 'Repository URL', type: 'url' }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image', options: { hotspot: true } },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'status' },
  },
});
