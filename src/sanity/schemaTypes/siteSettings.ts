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
    defineField({ name: 'heroKicker', title: 'Hero Kicker (role title)', type: 'string' }),
    defineField({ name: 'heroTitle', title: 'Hero Title (h1)', type: 'text' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text' }),
    defineField({ name: 'heroYearsValue', title: 'Hero Stat Value (e.g. "7 Years")', type: 'string' }),
    defineField({ name: 'heroYearsCaption', title: 'Hero Stat Caption', type: 'string' }),
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
    defineField({
      name: 'aboutText',
      title: 'About Section Text',
      type: 'text',
      description: 'The about text displayed in the header/about section of the home page.',
    }),
  ],
});
