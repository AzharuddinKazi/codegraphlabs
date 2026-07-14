type Experience = { org: string };

export default function EmployerStrip({ experience }: { experience: Experience[] }) {
  if (!experience || experience.length === 0) return null;

  // De-dupe in case of multiple roles at the same org.
  const orgs = Array.from(new Set(experience.map((e) => e.org)));

  return (
    <div className="employer-strip wrap">
      <div className="employer-strip-label">Experience across</div>
      <div className="employer-row">
        {orgs.map((org) => (
          <span className="employer-name" key={org}>
            {org}
          </span>
        ))}
      </div>
    </div>
  );
}
