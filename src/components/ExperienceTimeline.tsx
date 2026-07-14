type Experience = {
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
};

function formatDate(iso?: string) {
  if (!iso) return 'PRESENT';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }).toUpperCase();
}

export default function ExperienceTimeline({ experience }: { experience: Experience[] }) {
  return (
    <section id="timeline" className="section wrap">
      <div className="section-head">
        <span className="kicker">Experience</span>
        <h2 className="section-title">A career built on enterprise data architecture</h2>
        <p className="section-desc">Delivering advanced machine learning, forecasting, and AI systems.</p>
      </div>

      <div className="timeline">
        {experience.map((item) => (
          <div className={`timeline-item reveal${item.active ? ' active' : ''}`} key={item._id}>
            <div className="timeline-marker" />
            <div className="timeline-date">
              {formatDate(item.startDate)} — {item.active ? 'PRESENT' : formatDate(item.endDate)}
            </div>
            <h3 className="timeline-title">{item.role}</h3>
            <div className="timeline-org">
              {item.org}
              {item.location ? ` | ${item.location}` : ''}
            </div>
            {item.summary && <p className="timeline-content">{item.summary}</p>}
            {item.bullets && item.bullets.length > 0 && (
              <ul className="timeline-bullets">
                {item.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            {item.tags && item.tags.length > 0 && (
              <div className="timeline-tags">
                {item.tags.map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
