import { defineField, defineType } from 'sanity';

/**
 * Singleton. The single source of truth for identity/voice — the fix for
 * "I" vs "we" and contact info being hardcoded in a dozen places across
 * static HTML files.
 */
export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'siteName', title: 'Site Name', type: 'string' }),
    defineField({ name: 'personName', title: 'Person Name', type: 'string' }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({
      name: 'voicePronoun',
      title: 'Voice Pronoun',
      type: 'string',
      options: { list: ['I', 'we'] },
      initialValue: 'I',
      description: 'Drives first-person copy across the site.',
    }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text' }),
    defineField({ name: 'email', title: 'Email', type: 'string' }),
    defineField({ name: 'linkedinUrl', title: 'LinkedIn URL', type: 'url' }),
    defineField({ name: 'githubUrl', title: 'GitHub URL', type: 'url' }),
    defineField({ name: 'location', title: 'Location', type: 'string' }),
    defineField({ name: 'responseTime', title: 'Response Time Note', type: 'string' }),
    defineField({
      name: 'disclaimer',
      title: 'Views-are-my-own Disclaimer',
      type: 'text',
      description: 'Rendered in the footer of every page and at the top of blog posts.',
    }),
    defineField({ name: 'resumeUrl', title: 'Résumé File URL', type: 'url' }),
  ],
});
