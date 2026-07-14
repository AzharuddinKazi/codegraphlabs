'use client';

import { useEffect, useState } from 'react';

const NAV_LINKS = [
  { href: '#about', label: 'Overview' },
  { href: '#timeline', label: 'Career' },
  { href: '#portfolio', label: 'Projects' },
  { href: '#blog', label: 'Blog' },
  { href: '#contact', label: 'Contact' },
] as const;

export default function SiteHeader({ resumeUrl }: { resumeUrl?: string }) {
  const [navOpen, setNavOpen] = useState(false);
  const [activeHref, setActiveHref] = useState('#about');
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('theme');
    const dark = stored === 'dark';
    setIsDark(dark);
    document.body.classList.toggle('dark', dark);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('main section[id]'));
    if (sections.length === 0) return;

    const onScroll = () => {
      const scrollY = window.scrollY;
      for (const section of sections) {
        const el = section as HTMLElement;
        const top = el.offsetTop - 100;
        const bottom = top + el.offsetHeight;
        if (scrollY > top && scrollY <= bottom) {
          setActiveHref(`#${el.id}`);
          break;
        }
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  function toggleTheme() {
    const next = !isDark;
    setIsDark(next);
    document.body.classList.toggle('dark', next);
    localStorage.setItem('theme', next ? 'dark' : 'light');
  }

  return (
    <header className="sticky-nav">
      <div className="wrap nav-container">
        <a href="#" className="brand-logo-link" aria-label="CodeGraphLabs">
          <svg className="brand-logo-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 460 110" role="img">
            <path
              d="M55,20 L84,33 L90,63 L79,85 L27,83 L19,54 Z"
              fill="none"
              stroke="var(--brand-color-border)"
              strokeWidth="1.5"
            />
            <g stroke="var(--brand-color-text)" strokeWidth="2.5" strokeLinecap="round">
              <line x1="55" y1="55" x2="55" y2="20" />
              <line x1="55" y1="55" x2="84" y2="33" />
              <line x1="55" y1="55" x2="90" y2="63" />
              <line x1="55" y1="55" x2="79" y2="85" />
              <line x1="55" y1="55" x2="27" y2="83" />
              <line x1="55" y1="55" x2="19" y2="54" />
            </g>
            <g fill="var(--brand-color-text)">
              <circle cx="55" cy="55" r="13" />
              <circle cx="55" cy="20" r="7" />
              <circle cx="84" cy="33" r="5.5" />
              <circle cx="90" cy="63" r="5" />
              <circle cx="79" cy="85" r="7" />
              <circle cx="27" cy="83" r="10" />
              <circle cx="19" cy="54" r="5" />
            </g>
            <text x="120" y="68" fontFamily="'Source Code Pro', monospace" fontSize="42" letterSpacing="-0.5">
              <tspan fill="var(--brand-color-text)" fontWeight="600">codegraph</tspan>
              <tspan fill="var(--brand-color-primary)" fontWeight="400">labs</tspan>
            </text>
          </svg>
        </a>

        <nav>
          <ul className={`nav-links${navOpen ? ' open' : ''}`} id="nav-links">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={activeHref === link.href ? 'active' : undefined}
                  onClick={() => setNavOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li>
              <a href={resumeUrl || '#'} download onClick={() => setNavOpen(false)}>
                Résumé
              </a>
            </li>
          </ul>
        </nav>

        <div className="nav-actions">
          <button
            className="theme-toggle-btn radius-sm"
            aria-label="Toggle theme"
            onClick={toggleTheme}
          >
            <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              {isDark ? (
                <>
                  <circle cx="12" cy="12" r="4" />
                  <path d="M12 3v1M12 20v1M3 12h1M20 12h1M5.6 5.6l.7.7M17.7 17.7l.7.7M5.6 18.4l.7-.7M17.7 6.3l.7-.7" />
                </>
              ) : (
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              )}
            </svg>
          </button>
          <button
            className={`nav-toggle-btn radius-sm${navOpen ? ' open' : ''}`}
            aria-label="Toggle navigation menu"
            aria-expanded={navOpen}
            aria-controls="nav-links"
            onClick={() => setNavOpen((v) => !v)}
          >
            <svg className="icon-menu" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M3 6h18M3 12h18M3 18h18" />
            </svg>
            <svg className="icon-close" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
