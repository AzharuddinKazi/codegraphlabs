import { sanityFetch } from '@/sanity/client';
import SiteHeader from '@/components/SiteHeader';
import SiteFooter from '@/components/SiteFooter';
import ScrollReveal from '@/components/ScrollReveal';

type SiteSettings = {
  personName?: string;
  disclaimer?: string;
  resumeUrl?: string;
};

const SITE_SETTINGS_QUERY = `*[_type == "siteSettings"][0]{
  personName,
  disclaimer,
  resumeUrl
}`;

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const settings = await sanityFetch<SiteSettings>(SITE_SETTINGS_QUERY);

  return (
    <>
      <SiteHeader resumeUrl={settings?.resumeUrl} />
      <main>{children}</main>
      <SiteFooter personName={settings?.personName} disclaimer={settings?.disclaimer} />
      <ScrollReveal />
    </>
  );
}
