import { defineCollection, z } from 'astro:content';

const settings = defineCollection({
  type: 'data',
  schema: z.object({
    siteMode: z.enum(['personal', 'agency']),
    logoText: z.string().optional(),
    email: z.string(),
    linkedinUrl: z.string(),
    githubUrl: z.string(),
    location: z.string(),
    responseTime: z.string(),
    disclaimer: z.string(),
    formEndpoint: z.string(),
    personal: z.object({
      heroKicker: z.string(),
      heroTitle: z.string(),
      heroDescription: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      secondaryCtaLabel: z.string(),
      secondaryCtaHref: z.string(),
    }),
    agency: z.object({
      heroKicker: z.string(),
      heroTitle: z.string(),
      heroDescription: z.string(),
      ctaLabel: z.string(),
      ctaHref: z.string(),
      secondaryCtaLabel: z.string(),
      secondaryCtaHref: z.string(),
      bookingUrl: z.string().url().optional(),
    }),
  }),
});

const experience = defineCollection({
  type: 'data',
  schema: z.object({
    title: z.string(),
    company: z.string(),
    location: z.string(),
    startDate: z.string(),
    endDate: z.string(),
    current: z.boolean().optional(),
    description: z.string(),
    bullets: z.array(z.string()),
    tags: z.array(z.string()),
    order: z.number(),
  }),
});

const testimonials = defineCollection({
  type: 'data',
  schema: z.object({
    name: z.string(),
    role: z.string(),
    relationship: z.string(),
    quote: z.string(),
    featured: z.boolean().optional(),
    order: z.number(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.string(),
    type: z.enum(['personal-build', 'client-engagement', 'employer-work']),
    statHighlight: z.string().optional(),
    statCaption: z.string().optional(),
    repoUrl: z.string().url().optional(),
    liveUrl: z.string().url().optional(),
    branch: z.string().optional(),
    architecture: z.string().optional(),
    focus: z.string().optional(),
    outcome: z.string().optional(),
    order: z.number(),
  }),
});

const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    publishedAt: z.string(),
    readingTime: z.string(),
    series: z.string().optional(),
    part: z.number().optional(),
    totalParts: z.number().optional(),
    description: z.string(),
    sources: z.array(
      z.object({
        name: z.string(),
        url: z.string(),
      })
    ).optional(),
  }),
});

export const collections = {
  settings,
  experience,
  testimonials,
  projects,
  blog,
};
