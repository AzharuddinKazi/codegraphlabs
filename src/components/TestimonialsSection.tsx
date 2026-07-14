type Testimonial = {
  _id: string;
  name: string;
  role?: string;
  relationship: string;
  quote: string;
  featured?: boolean;
};

const RELATIONSHIP_LABEL: Record<string, string> = {
  'direct-manager': 'Direct manager',
  client: 'Client',
  teammate: 'Teammate',
  collaborator: 'Collaborator',
};

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="section wrap">
      <div className="section-head">
        <span className="kicker">Recommendations</span>
        <h2 className="section-title">What colleagues have said</h2>
        <p className="section-desc">A few words from managers, clients, and teammates across my career.</p>
      </div>

      <div className="testimonial-grid">
        {testimonials.map((t) => (
          <div className={`testimonial-card radius-lg${t.featured ? ' featured' : ''}`} key={t._id}>
            <div className="testimonial-mark">&ldquo;</div>
            <p className="testimonial-quote">{t.quote}</p>
            <div className="testimonial-attribution">
              <div className="testimonial-name">{t.name}</div>
              {t.role && <div className="testimonial-role">{t.role}</div>}
              <span className="testimonial-relation">&mdash; {RELATIONSHIP_LABEL[t.relationship] || t.relationship}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
