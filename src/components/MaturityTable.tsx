export type MaturityItem = {
  label: string;
  status: 'built' | 'designed';
  statusText: string;
};

type MaturityTableProps = {
  items: MaturityItem[];
};

export default function MaturityTable({ items }: MaturityTableProps) {
  return (
    <div className="maturity-table radius-lg">
      {items.map((item, index) => {
        const isBuilt = item.status === 'built';
        const statusClass = `maturity-status ${isBuilt ? 'is-built' : 'is-designed'}`;

        return (
          <div key={index} className="maturity-row">
            <div className="maturity-label">{item.label}</div>
            <div className={statusClass}>{item.statusText}</div>
          </div>
        );
      })}
    </div>
  );
}
