type Project = {
  _id: string;
  slug: { current: string };
  title: string;
  status?: string;
  summary?: string;
  statHighlight?: string;
  statCaption?: string;
  repoUrl?: string;
};

const STATUS_LABEL: Record<string, string> = {
  'active-development': 'ACTIVE DEVELOPMENT',
  complete: 'COMPLETE',
  archived: 'ARCHIVED',
};

export default function ProjectsSection({ projects }: { projects: Project[] }) {
  const featured = projects?.[0];

  return (
    <section id="portfolio" className="section wrap">
      <div className="section-head">
        <span className="kicker">Projects</span>
        <h2 className="section-title">Independent builds and technical deep-dives</h2>
        <p className="section-desc">
          Work outside the day job — agentic systems, architecture experiments, and the occasional deep-dive into a
          paper worth implementing.
        </p>
      </div>

      {!featured ? (
        <div
          className="radius-lg"
          style={{
            border: 'var(--brand-line-width) dashed var(--brand-color-border)',
            padding: 'var(--brand-size-xxl) var(--brand-size-xl)',
            textAlign: 'center',
          }}
        >
          <p style={{ color: 'var(--brand-color-text-secondary)', fontSize: 'var(--brand-font-size-lg)' }}>
            Projects are in preparation — create one in /studio.
          </p>
        </div>
      ) : (
        <div className="project-showcase radius-lg reveal">
          <div className="project-info">
            <span
              style={{
                fontFamily: 'var(--code-family)',
                fontSize: 'var(--brand-font-size-sm)',
                letterSpacing: '0.06em',
                color: 'var(--brand-color-primary)',
                fontWeight: 700,
              }}
            >
              {STATUS_LABEL[featured.status || 'active-development']}
            </span>
            <h3 style={{ fontSize: 'var(--brand-font-size-heading-4)', margin: 'var(--brand-size-xs) 0 var(--brand-size-sm)' }}>
              {featured.title}
            </h3>
            {featured.summary && (
              <p style={{ color: 'var(--brand-color-text-secondary)', marginBottom: 'var(--brand-size-md)', lineHeight: 1.5 }}>
                {featured.summary}
              </p>
            )}
            <div style={{ display: 'flex', gap: 'var(--brand-size-sm)', flexWrap: 'wrap' }}>
              <a href={`/projects/${featured.slug.current}`} className="btn btn-primary radius-lg">
                Read Technical Design Handoff
              </a>
              {featured.repoUrl && (
                <a href={featured.repoUrl} target="_blank" rel="noopener" className="btn btn-secondary radius-lg">
                  View GitHub Repo
                </a>
              )}
            </div>
          </div>

          {(featured.statHighlight || featured.statCaption) && (
            <div className="project-visual-preview radius-lg">
              <div>
                {featured.statHighlight && (
                  <div style={{ fontFamily: 'var(--display-family)', fontSize: 40, fontWeight: 700, color: 'var(--brand-color-primary)', lineHeight: 1 }}>
                    {featured.statHighlight}
                  </div>
                )}
                {featured.statCaption && (
                  <div style={{ fontFamily: 'var(--code-family)', fontSize: 'var(--brand-font-size-sm)', lineHeight: 1.5, color: 'var(--brand-color-text-secondary)', marginTop: 'var(--brand-size-sm)' }}>
                    {featured.statCaption}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
