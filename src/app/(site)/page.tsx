import { sanityFetch } from '@/sanity/client';
import SignatureBand from '@/components/SignatureBand';
import EmployerStrip from '@/components/EmployerStrip';
import StatsGrid from '@/components/StatsGrid';
import ExperienceTimeline from '@/components/ExperienceTimeline';
import ProjectsSection from '@/components/ProjectsSection';
import BlogSection from '@/components/BlogSection';
import TestimonialsSection from '@/components/TestimonialsSection';
import ContactSection from '@/components/ContactSection';

const HOMEPAGE_QUERY = `{
  "settings": *[_type == "siteSettings"][0]{
    heroKicker,
    heroTitle,
    heroDescription,
    heroYearsValue,
    heroYearsCaption,
    email,
    linkedinUrl,
    githubUrl,
    location,
    responseTime
  },
  "experience": *[_type == "experience"] | order(order asc, startDate desc){
    _id, org, role, location, startDate, endDate, active, summary, bullets, tags
  },
  "projects": *[_type == "project"] | order(_createdAt desc){
    _id, "slug": slug, title, status, summary, statHighlight, statCaption, repoUrl
  },
  "posts": *[_type == "post"] | order(publishedAt desc){
    _id, "slug": slug, title, description, readingTime, partNumber,
    "series": series->{name, totalParts}
  },
  "testimonials": *[_type == "testimonial"] | order(featured desc){
    _id, name, role, relationship, quote, featured
  }
}`;

type HomepageData = {
  settings: {
    heroKicker?: string;
    heroTitle?: string;
    heroDescription?: string;
    heroYearsValue?: string;
    heroYearsCaption?: string;
    email?: string;
    linkedinUrl?: string;
    githubUrl?: string;
    location?: string;
    responseTime?: string;
  } | null;
  experience: Array<{
    _id: string;
    org: string;
    role: string;
    location?: string;
    startDate: string;
    endDate?: string;
    active?: boolean;
    summary?: string;
    bullets?: string[];
    tags?: string[];
  }>;
  projects: Array<{
    _id: string;
    slug: { current: string };
    title: string;
    status?: string;
    summary?: string;
    statHighlight?: string;
    statCaption?: string;
    repoUrl?: string;
  }>;
  posts: Array<{
    _id: string;
    slug: { current: string };
    title: string;
    description?: string;
    readingTime?: string;
    partNumber?: number;
    series?: { name: string; totalParts: number };
  }>;
  testimonials: Array<{
    _id: string;
    name: string;
    role?: string;
    relationship: string;
    quote: string;
    featured?: boolean;
  }>;
};

export const revalidate = 60;

export default async function HomePage() {
  const data = (await sanityFetch<HomepageData>(HOMEPAGE_QUERY)) ?? {
    settings: null,
    experience: [],
    projects: [],
    posts: [],
    testimonials: [],
  };

  return (
    <>
      <SignatureBand
        heroKicker={data.settings?.heroKicker}
        heroTitle={data.settings?.heroTitle}
        heroDescription={data.settings?.heroDescription}
        heroYearsValue={data.settings?.heroYearsValue}
        heroYearsCaption={data.settings?.heroYearsCaption}
      />
      <EmployerStrip experience={data.experience} />
      <StatsGrid />
      <ExperienceTimeline experience={data.experience} />
      <ProjectsSection projects={data.projects} />
      <BlogSection posts={data.posts} />
      <TestimonialsSection testimonials={data.testimonials} />
      <ContactSection
        email={data.settings?.email}
        linkedinUrl={data.settings?.linkedinUrl}
        githubUrl={data.settings?.githubUrl}
        location={data.settings?.location}
        responseTime={data.settings?.responseTime}
      />
    </>
  );
}
