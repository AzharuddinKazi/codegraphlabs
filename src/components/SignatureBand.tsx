type SignatureBandProps = {
  heroKicker?: string;
  heroTitle?: string;
  heroDescription?: string;
  heroYearsValue?: string;
  heroYearsCaption?: string;
};

const FALLBACK = {
  heroKicker: 'Specialist Data Scientist',
  heroTitle: 'Engineering decision support frameworks for complex regulatory data.',
  heroDescription:
    'Seasoned Data Science Professional with 7 years of experience in delivering analytical solutions and decision support across diverse business sectors.',
  heroYearsValue: '7 Years',
  heroYearsCaption: 'Machine learning, forecasting, and AI systems across regulatory, corporate, and digital sectors',
};

export default function SignatureBand(props: SignatureBandProps) {
  const v = { ...FALLBACK, ...Object.fromEntries(Object.entries(props).filter(([, val]) => val)) };

  return (
    <section id="about" className="section wrap" style={{ borderBottom: 'none', paddingBottom: 0 }}>
      <div className="signature-band radius-lg">
        <svg className="band-graph" viewBox="0 0 1120 600" preserveAspectRatio="xMidYMid slice" role="img" aria-label="Node-graph signature visual">
          <defs>
            <pattern id="band-dot-grid" width="44" height="44" patternUnits="userSpaceOnUse">
              <circle cx="1" cy="1" r="1" fill="var(--band-line)" opacity="0.5" />
            </pattern>
          </defs>
          <rect width="1120" height="600" fill="url(#band-dot-grid)" />

          <g stroke="var(--band-line)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7">
            <line x1="680" y1="200" x2="900" y2="270" />
            <line x1="470" y1="120" x2="760" y2="430" />
            <line x1="820" y1="140" x2="1030" y2="380" />
          </g>

          <g stroke="var(--band-node)" strokeWidth="2.2" strokeLinecap="round" opacity="0.85">
            <line x1="680" y1="200" x2="470" y2="120" />
            <line x1="470" y1="120" x2="900" y2="270" />
            <line x1="900" y1="270" x2="760" y2="430" />
            <line x1="760" y1="430" x2="680" y2="200" />

            <line x1="470" y1="120" x2="370" y2="60" />
            <line x1="470" y1="120" x2="620" y2="70" />
            <line x1="470" y1="120" x2="580" y2="200" />

            <line x1="900" y1="270" x2="1000" y2="180" />
            <line x1="900" y1="270" x2="1030" y2="380" />
            <line x1="900" y1="270" x2="820" y2="140" />

            <line x1="760" y1="430" x2="860" y2="510" />
            <line x1="680" y1="200" x2="770" y2="130" />
          </g>

          <g fill="var(--band-node)" opacity="0.95">
            <circle cx="680" cy="200" r="15" />
            <circle cx="470" cy="120" r="13" />
            <circle cx="900" cy="270" r="18" />
            <circle cx="760" cy="430" r="10" />

            <circle cx="370" cy="60" r="5" />
            <circle cx="620" cy="70" r="6" />
            <circle cx="580" cy="200" r="5" />

            <circle cx="1000" cy="180" r="6" />
            <circle cx="1030" cy="380" r="7" />
            <circle cx="820" cy="140" r="5" />

            <circle cx="860" cy="510" r="6" />
            <circle cx="770" cy="130" r="5" />
          </g>
        </svg>
        <div className="band-scrim" />

        <div className="band-content">
          <div className="band-kicker">
            <span className="rule" />
            <span>{v.heroKicker}</span>
          </div>
          <h1>{v.heroTitle}</h1>
          <p className="hero-description">{v.heroDescription}</p>
          <div className="band-actions">
            <a href="#portfolio" className="btn-primary-badge">
              <span className="label">Explore Projects</span>
              <span className="badge">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 17 17 7M7 7h10v10" />
                </svg>
              </span>
            </a>
            <a href="#timeline" className="btn-secondary-outline">
              View Professional Career
            </a>
          </div>
          <div className="band-proof">
            <div className="num">{v.heroYearsValue}</div>
            <div className="cap">{v.heroYearsCaption}</div>
          </div>
        </div>
      </div>
    </section>
  );
}
