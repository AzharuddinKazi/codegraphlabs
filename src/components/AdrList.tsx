export type AdrItem = {
  q: string;
  a: string;
};

type AdrListProps = {
  items: AdrItem[];
};

export default function AdrList({ items }: AdrListProps) {
  return (
    <div className="cs-content" style={{ gap: 'var(--brand-size-lg)' }}>
      {items.map((item, index) => (
        <div key={index} className="adr-item">
          <div className="adr-q">{item.q}</div>
          <div className="adr-a">{item.a}</div>
        </div>
      ))}
    </div>
  );
}
