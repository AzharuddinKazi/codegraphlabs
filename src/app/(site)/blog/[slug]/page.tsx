import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import SeriesRoadmap, { type RoadmapEntry } from '@/components/SeriesRoadmap';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Link from 'next/link';

type PostData = {
  post: {
    _id: string;
    title: string;
    description?: string;
    publishedAt?: string;
    readingTime?: string;
    partNumber?: number;
    disclaimer?: string;
    body?: any[];
    sources?: Array<{
      label?: string;
      url?: string;
    }>;
    series?: {
      name: string;
      totalParts: number;
      roadmap?: Array<{
        partNumber: number;
        title: string;
        subtitle: string;
        status: 'done' | 'planned';
        slug?: string;
      }>;
    };
  } | null;
  settings: {
    disclaimer?: string;
  } | null;
};

const POST_QUERY = `
{
  "post": *[_type == "post" && slug.current == $slug][0]{
    _id,
    title,
    description,
    publishedAt,
    readingTime,
    partNumber,
    disclaimer,
    body,
    sources[]{
      label,
      url
    },
    series->{
      name,
      totalParts,
      roadmap[]{
        partNumber,
        title,
        subtitle,
        status,
        "slug": post->slug.current
      }
    }
  },
  "settings": *[_type == "siteSettings"][0]{
    disclaimer
  }
}`;

const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }: any) => {
      const imageUrl = urlFor(value)?.url();
      if (!imageUrl) return null;
      return (
        <figure className="article-figure">
          <img
            src={imageUrl}
            alt={value.alt || ''}
            className="radius-lg"
            loading="lazy"
          />
          {value.caption && (
            <figcaption>
              <strong>{value.caption}</strong>
            </figcaption>
          )}
        </figure>
      );
    },
  },
  block: {
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    normal: ({ children }) => <p>{children}</p>,
    code: ({ children }) => (
      <pre className="radius-lg">
        <code>{children}</code>
      </pre>
    ),
  },
  marks: {
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => {
      const href = value?.href || '';
      if (href.startsWith('#src-')) {
        return (
          <sup className="cite">
            <a href={href}>{children}</a>
          </sup>
        );
      }
      const rel = !href.startsWith('/') ? 'noreferrer noopener' : undefined;
      const target = !href.startsWith('/') ? '_blank' : undefined;
      return (
        <a href={href} rel={rel} target={target}>
          {children}
        </a>
      );
    },
  },
};

// Strips protocol and www from URL for clean display
function getDisplayUrl(urlStr: string) {
  try {
    const url = new URL(urlStr);
    return url.hostname.replace('www.', '') + url.pathname + url.search;
  } catch {
    return urlStr.replace(/^https?:\/\/(www\.)?/, '');
  }
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const data = await sanityFetch<PostData>(POST_QUERY, { slug });

  if (!data || !data.post) {
    notFound();
  }

  const { post, settings } = data;
  const disclaimerText =
    post.disclaimer ||
    settings?.disclaimer ||
    'These are my own personal views and independent research. They do not represent, and should not be attributed to, the Central Bank of the UAE or any employer.';

  const isSeries = !!post.series;
  const kickerText = isSeries
    ? `Blog · ${post.series?.name} · Post ${post.partNumber || 1} of ${post.series?.totalParts || 1}`
    : 'Blog';

  return (
    <div className="wrap">
      <div className="article-wrap">
        <div className="article-header">
          <span className="kicker">{kickerText}</span>
          <h1 className="article-title">{post.title}</h1>
          <div className="article-meta">
            <span><strong>Azharuddin Kazi</strong></span>
            <span>·</span>
            <span>{post.readingTime || '9 min read'}</span>
          </div>
          <div className="header-notes">
            {post.description && <p>{post.description}</p>}
            <p>
              <strong>Disclaimer:</strong> {disclaimerText}
            </p>
          </div>
        </div>

        <article className="section article-content">
          {post.body && <PortableText value={post.body} components={portableTextComponents} />}

          {/* Series Roadmap */}
          {isSeries && post.series?.roadmap && (
            <SeriesRoadmap
              seriesName={post.series.name}
              totalParts={post.series.totalParts}
              partNumber={post.partNumber || 1}
              roadmap={post.series.roadmap.map((r) => ({
                partNumber: r.partNumber,
                title: r.title,
                subtitle: r.subtitle,
                status: r.status,
                slug: r.slug,
              }))}
            />
          )}

          {/* Sources Block */}
          {post.sources && post.sources.length > 0 && (
            <div className="sources-block">
              <h2>Sources</h2>
              <ol className="sources-list">
                {post.sources.map((src, idx) => (
                  <li key={idx} id={`src-${idx + 1}`}>
                    <span className="src-num">[{idx + 1}]</span>
                    <span>
                      {src.label}{' '}
                      {src.url && (
                        <a href={src.url} target="_blank" rel="noopener noreferrer">
                          {getDisplayUrl(src.url)}
                        </a>
                      )}
                    </span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="article-footer-nav">
            <Link href="/#blog" className="btn btn-secondary radius-lg">
              &larr; Back to all posts
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
}
