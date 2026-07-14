type Post = {
  _id: string;
  slug: { current: string };
  title: string;
  description?: string;
  readingTime?: string;
  series?: { name: string; totalParts: number };
  partNumber?: number;
};

export default function BlogSection({ posts }: { posts: Post[] }) {
  const latest = posts?.[0];

  return (
    <section id="blog" className="section wrap">
      <div className="section-head">
        <span className="kicker">Insights &amp; Writings</span>
        <h2 className="section-title">Technical documentation, case studies, and engineering briefs</h2>
        <p className="section-desc">Reflections on building analytics agents, risk architectures, and data frameworks.</p>
      </div>

      {!latest ? (
        <div
          className="radius-lg"
          style={{
            border: 'var(--brand-line-width) dashed var(--brand-color-border)',
            padding: 'var(--brand-size-xxl) var(--brand-size-xl)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--brand-color-text-secondary)', fontSize: 'var(--brand-font-size-lg)' }}>
            Posts are in preparation — create one in /studio.
          </p>
        </div>
      ) : (
        <a href={`/blog/${latest.slug.current}`} className="blog-card radius-lg reveal">
          <div className="blog-card-meta">
            {[
              latest.series && `${latest.series.name.toUpperCase()} SERIES`,
              latest.series && latest.partNumber && `POST ${latest.partNumber} OF ${latest.series.totalParts}`,
              latest.readingTime,
            ]
              .filter(Boolean)
              .join(' · ')}
          </div>
          <h3 className="blog-card-title">{latest.title}</h3>
          {latest.description && <p className="blog-card-desc">{latest.description}</p>}
        </a>
      )}
    </section>
  );
}
