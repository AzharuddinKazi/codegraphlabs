import { sanityFetch } from '@/sanity/client';
import { isSanityConfigured } from '@/sanity/env';

type SiteSettings = {
  siteName?: string;
  personName?: string;
  tagline?: string;
};

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  siteName,
  personName,
  tagline
}`;

export const revalidate = 60;

export default async function HomePage() {
  const settings = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);

  return (
    <main style={{ padding: '64px 24px', maxWidth: 720, margin: '0 auto' }}>
      <p style={{ fontFamily: 'var(--code-family)', fontSize: 13, color: 'var(--brand-color-text-tertiary)' }}>
        SANITY + NEXT.JS SKELETON — homepage sections are not ported yet
      </p>
      <h1 style={{ fontFamily: 'var(--display-family)', marginTop: 12 }}>
        {settings?.personName ?? 'Azharuddin Kazi'}
      </h1>
      <p style={{ marginTop: 8, color: 'var(--brand-color-text-secondary)' }}>
        {!isSanityConfigured
          ? 'Sanity environment variables are not set — see SETUP.md.'
          : (settings?.tagline ??
            'No siteSettings document found yet — create one in /studio to see it render here.')}
      </p>
    </main>
  );
}
