type SiteFooterProps = {
  personName?: string;
  disclaimer?: string;
};

export default function SiteFooter({ personName, disclaimer }: SiteFooterProps) {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="wrap footer-container">
        <div>
          &copy; {year} {personName || 'Azharuddin Kazi'}. All rights reserved. Deployed using the CodeGraphLabs
          Brand Specification.
        </div>
        <div style={{ display: 'flex', gap: 'var(--brand-size-lg)' }}>
          <a href="#about">Overview</a>
          <a href="#timeline">Timeline</a>
          <a href="#portfolio">Projects</a>
          <a href="#blog">Blog</a>
        </div>
      </div>
      {disclaimer && (
        <div
          className="wrap"
          style={{
            marginTop: 'var(--brand-size-sm)',
            fontSize: 'var(--brand-font-size-sm)',
            color: 'var(--brand-color-text-tertiary)',
          }}
        >
          {disclaimer}
        </div>
      )}
    </footer>
  );
}
