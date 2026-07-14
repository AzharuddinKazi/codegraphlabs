'use client';

import { useState } from 'react';

type ContactSectionProps = {
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  location?: string;
  responseTime?: string;
  formEndpoint?: string;
};

export default function ContactSection(props: ContactSectionProps) {
  // Sanity returns null (not undefined) for schema fields left unset, and
  // destructured default params don't apply to null -- only undefined --
  // so the fallbacks below have to be explicit, not default parameters.
  const email = props.email ?? 'azharuddin.raz.kazi@gmail.com';
  const linkedinUrl = props.linkedinUrl ?? 'https://linkedin.com/in/azhar-kazi';
  const githubUrl = props.githubUrl ?? 'https://github.com/AzharuddinKazi';
  const location = props.location ?? 'Based in Dubai/Abu Dhabi, UAE (GST).';
  const responseTime = props.responseTime ?? 'Inquiries are typically answered within 2 business days.';
  const formEndpoint = props.formEndpoint ?? 'https://formspree.io/f/YOUR_FORM_ID';
  const [status, setStatus] = useState<{ text: string; color: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setStatus({ text: 'Sending…', color: 'var(--brand-color-text-secondary)' });

    try {
      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setStatus({
          text: "Thanks — your message has been sent. I'll respond within 2 business days.",
          color: 'var(--brand-color-primary)',
        });
        form.reset();
      } else {
        setStatus({
          text: `Something went wrong. Please email ${email} directly.`,
          color: 'var(--brand-color-error)',
        });
      }
    } catch {
      setStatus({
        text: `Network error — please email ${email} directly.`,
        color: 'var(--brand-color-error)',
      });
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="section wrap" style={{ borderBottom: 'none' }}>
      <div className="section-head">
        <span className="kicker">Get in Touch</span>
        <h2 className="section-title">Let&apos;s connect</h2>
        <p className="section-desc">Have a question or want to get in touch? Send a message below.</p>
      </div>

      <div className="contact-layout reveal">
        <div className="contact-info">
          <div className="contact-method">
            <div className="contact-method-title">ONLINE PRESENCE</div>
            <div className="contact-method-value">
              <a href={`mailto:${email}`}>{email}</a>
              <br />
              <a href={linkedinUrl}>{linkedinUrl.replace('https://', '')}</a>
              <br />
              <a href={githubUrl}>{githubUrl.replace('https://', '')}</a>
            </div>
          </div>
          <div className="contact-method">
            <div className="contact-method-title">LOCATION</div>
            <div className="contact-method-value">{location}</div>
          </div>
          <div className="contact-method">
            <div className="contact-method-title">RESPONSE TIME</div>
            <div className="contact-method-value">{responseTime}</div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label className="form-label" htmlFor="contact-name">
                Full Name
              </label>
              <input type="text" id="contact-name" name="name" className="form-input" placeholder="e.g. Jane Doe" required />
            </div>
            <div className="form-group">
              <label className="form-label" htmlFor="contact-email">
                Email Address
              </label>
              <input type="email" id="contact-email" name="email" className="form-input" placeholder="e.g. jane@example.com" required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="contact-message">
              Message
            </label>
            <textarea id="contact-message" name="message" className="form-textarea" placeholder="What would you like to discuss?" required />
          </div>

          <input type="text" name="_gotcha" style={{ display: 'none' }} tabIndex={-1} autoComplete="off" />

          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--brand-size)' }}>
            <button
              type="submit"
              className="btn btn-primary radius-lg"
              style={{ padding: '0 var(--brand-size-xl)', height: 42 }}
              disabled={submitting}
            >
              Send Message
            </button>
            {status && (
              <span role="status" style={{ fontSize: 'var(--brand-font-size-sm)', color: status.color }}>
                {status.text}
              </span>
            )}
          </div>
        </form>
      </div>
    </section>
  );
}
