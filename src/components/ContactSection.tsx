import React, { useState } from 'react';
import { motion } from 'framer-motion';

type ContactSectionProps = {
  email: string;
  linkedinUrl: string;
  githubUrl: string;
  location: string;
  responseTime: string;
  formEndpoint: string;
};

export default function ContactSection(props: ContactSectionProps) {
  const [status, setStatus] = useState<{ text: string; color: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    setSubmitting(true);
    setStatus({ text: 'Sending…', color: 'var(--brand-color-text-secondary)' });

    try {
      const response = await fetch(props.formEndpoint, {
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
          text: `Something went wrong. Please email ${props.email} directly.`,
          color: 'var(--brand-color-error)',
        });
      }
    } catch {
      setStatus({
        text: `Network error — please email ${props.email} directly.`,
        color: 'var(--brand-color-error)',
      });
    } finally {
      setSubmitting(false);
    }
  }

  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.15,
        ease: 'easeOut',
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="contact" className="section wrap" style={{ borderBottom: 'none' }}>
      <div className="section-head">
        <span className="kicker">Get in Touch</span>
        <h2 className="section-title">Let&apos;s connect</h2>
        <p className="section-desc">Have a question or want to get in touch? Send a message below.</p>
      </div>

      <motion.div 
        className="contact-layout"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <motion.div className="contact-info" variants={itemVariants}>
          <div className="contact-method">
            <div className="contact-method-title">ONLINE PRESENCE</div>
            <div className="contact-method-value">
              <a href={`mailto:${props.email}`}>{props.email}</a>
              <br />
              <a href={props.linkedinUrl} target="_blank" rel="noopener noreferrer">
                {props.linkedinUrl.replace('https://', '')}
              </a>
              <br />
              <a href={props.githubUrl} target="_blank" rel="noopener noreferrer">
                {props.githubUrl.replace('https://', '')}
              </a>
            </div>
          </div>
          <div className="contact-method">
            <div className="contact-method-title">LOCATION</div>
            <div className="contact-method-value">{props.location}</div>
          </div>
          <div className="contact-method">
            <div className="contact-method-title">RESPONSE TIME</div>
            <div className="contact-method-value">{props.responseTime}</div>
          </div>
        </motion.div>

        <motion.form className="contact-form" onSubmit={handleSubmit} variants={itemVariants}>
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
        </motion.form>
      </motion.div>
    </section>
  );
}
