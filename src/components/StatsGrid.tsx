export default function StatsGrid() {
  return (
    <section id="track-record" className="section wrap">
      <div className="section-head">
        <span className="kicker">By the Numbers</span>
        <h2 className="section-title">A track record grounded in production systems</h2>
        <p className="section-desc">
          Seven years translating statistical rigor into deployed decision support, across regulatory, corporate,
          and digital domains.
        </p>
      </div>
      <div className="stats-grid">
        <div className="stat-card radius-lg reveal">
          <div className="stat-num">7 Years</div>
          <div className="stat-label">Data Science Career</div>
          <div className="stat-desc">
            Providing predictive models, forecasts, and AI strategies for government, corporate, and digital
            entities.
          </div>
        </div>
        <div className="stat-card radius-lg reveal">
          <div className="stat-num">B.E.</div>
          <div className="stat-label">Computer Engineering</div>
          <div className="stat-desc">
            Mumbai University, India — plus a postgraduate certificate in Big Data Analytics &amp; Optimization from
            the International School of Engineering.
          </div>
        </div>
        <div className="stat-card radius-lg reveal">
          <div className="stat-num" style={{ color: 'var(--brand-color-primary)' }}>
            ML, DS &amp; Gen AI
          </div>
          <div className="stat-label">Core Specialization</div>
          <div className="stat-desc">Engineering statistical algorithms, forecasting systems, and LLM-based agentic workflows.</div>
        </div>
      </div>
    </section>
  );
}
