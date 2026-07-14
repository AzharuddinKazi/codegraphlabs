import Link from 'next/link';

export type RoadmapEntry = {
  partNumber: number;
  title: string;
  subtitle: string;
  status: 'done' | 'planned';
  slug?: string;
};

type SeriesRoadmapProps = {
  seriesName: string;
  totalParts: number;
  partNumber: number;
  roadmap: RoadmapEntry[];
};

export default function SeriesRoadmap({
  seriesName,
  totalParts,
  partNumber: currentPart,
  roadmap,
}: SeriesRoadmapProps) {
  // Sort descending by partNumber
  const sortedRoadmap = [...roadmap].sort((a, b) => b.partNumber - a.partNumber);

  return (
    <div className="roadmap-block">
      <h2>The Series</h2>
      <p className="roadmap-lead">
        {totalParts} posts, each building on the last — here's where this one sits.
      </p>

      <div className="roadmap-stack">
        {sortedRoadmap.map((entry, index) => {
          const isCurrent = entry.partNumber === currentPart;
          const isDone = entry.status === 'done';
          const boxClass = `roadmap-box ${isDone ? 'is-done' : 'is-planned'}`;

          const BoxContent = (
            <>
              <div>
                <div className="roadmap-box-title">
                  {entry.partNumber} &middot; {entry.title}
                </div>
                <div className="roadmap-box-subtitle">{entry.subtitle}</div>
              </div>
              <span className="roadmap-box-status">
                {entry.status === 'done' ? 'Done' : 'Planned'}
              </span>
            </>
          );

          return (
            <div key={entry.partNumber}>
              {/* If it's the current part, render the progress bar above it */}
              {isCurrent && (
                <div className="roadmap-progress">
                  <span>You are here — {currentPart} of {totalParts} complete</span>
                </div>
              )}

              {/* Render either a link or a static div */}
              {entry.slug && !isCurrent ? (
                <Link href={`/blog/${entry.slug}`} className={boxClass} style={{ display: 'flex', textDecoration: 'none' }}>
                  {BoxContent}
                </Link>
              ) : (
                <div className={boxClass}>
                  {BoxContent}
                </div>
              )}

              {/* Render connector if there is a next part below it in the stack */}
              {index < sortedRoadmap.length - 1 && (
                <div className="roadmap-connector">
                  {entry.partNumber} &uarr; builds on {sortedRoadmap[index + 1].partNumber}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
