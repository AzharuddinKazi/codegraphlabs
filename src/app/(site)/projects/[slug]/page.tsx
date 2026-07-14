import { notFound } from 'next/navigation';
import { sanityFetch } from '@/sanity/client';
import { urlFor } from '@/sanity/image';
import { PortableText, type PortableTextComponents } from '@portabletext/react';
import Link from 'next/link';
import DsStarSvg from '@/components/DsStarSvg';
import MaturityTable, { type MaturityItem } from '@/components/MaturityTable';
import AdrList, { type AdrItem } from '@/components/AdrList';

type ProjectData = {
  _id: string;
  title: string;
  type?: string;
  status?: string;
  summary?: string;
  statHighlight?: string;
  statCaption?: string;
  repoUrl?: string;
  body?: any[];
};

const PROJECT_QUERY = `
*[_type == "project" && slug.current == $slug][0]{
  _id,
  title,
  type,
  status,
  summary,
  statHighlight,
  statCaption,
  repoUrl,
  body
}`;

const typeLabels: Record<string, string> = {
  'personal-build': 'Personal Build',
  'client-engagement': 'Client Engagement',
  'employer-work': 'Employer Work',
};

const statusLabels: Record<string, string> = {
  'active-development': 'Active Development',
  'complete': 'Complete',
  'archived': 'Archived',
};

// Custom components list for Agent-DASC case study
const agentDascMaturityItems1: MaturityItem[] = [
  { label: "8-agent LangGraph state machine (Analyzer → Planner → Coder → Executor → Debugger → Router → Verifier → Finalizer), with real conditional routing and a debug-retry loop", status: 'built', statusText: 'BUILT + TESTED' },
  { label: "Docker sandbox execution — isolated container, no network, memory-capped, non-root", status: 'built', statusText: 'BUILT + TESTED' },
  { label: "Test suite covering graph construction, planner logic, and end-to-end runs", status: 'built', statusText: 'BUILT + TESTED' },
  { label: "Report-generation mode (sub-question decomposition + synthesis for open-ended research questions)", status: 'designed', statusText: 'DESIGNED, NOT BUILT' },
  { label: "Auth, RBAC, PII masking, tamper-evident audit log", status: 'designed', statusText: 'DESIGNED, NOT BUILT' },
  { label: "Frontend application", status: 'designed', statusText: 'DESIGNED, NOT BUILT' },
];

const agentDascMaturityItems2: MaturityItem[] = [
  { label: "Discovery — 1-pager, DS-STAR paper analysis, requirements", status: 'built', statusText: 'COMPLETE' },
  { label: "PRD / functional spec", status: 'designed', statusText: 'DRAFT — 2 open questions' },
  { label: "UX design spec — full mockup set", status: 'built', statusText: 'COMPLETE' },
  { label: "Technical design doc", status: 'designed', statusText: 'DRAFT — 2 sections in review' },
  { label: "Security & privacy review, test strategy, work breakdown, launch plan", status: 'designed', statusText: 'NOT STARTED' },
];

const agentDascAdrs: AdrItem[] = [
  {
    q: "Q: One Docker container per task, or a fresh one per round?",
    a: "One persistent container per task, reused across rounds via docker exec. A fresh container per round means paying a multi-second cold start up to 20+ times per query. This is only safe because the Coder is required to emit a complete, self-contained script every round — so there's no cross-round state to leak.",
  },
  {
    q: "Q: Sequential or parallel sub-questions?",
    a: "Sequential by default, parallel behind a config flag — a deliberate departure from what the paper assumes, driven by shared, constrained GPU capacity in an on-premise/air-gapped deployment with multiple concurrent analysts. The paper doesn't have to think about this; a real enterprise deployment does.",
  },
  {
    q: "Q: How to handle a script that prints 50,000 rows to stdout?",
    a: "A hard 10KB stdout cap, with larger outputs redirected to file storage instead. This is framed as both a context-window control and a data-loss-prevention control — it also prevents a script from exfiltrating bulk data via print flooding, which matters in a regulated, air-gapped setting.",
  },
  {
    q: "Q: Round budget — the paper defaults to 20. Why does this default to 5–6?",
    a: "Faster analyst feedback. The paper's own data shows hard tasks average 5.6 rounds — so roughly half of hard queries would need an extension under a low default. The tradeoff is handled explicitly: a 40-round hard cap plus an \"Extend and continue\" affordance in the UI, rather than silently forcing every query through 20 rounds regardless of difficulty.",
  },
];

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  
  const project = await sanityFetch<ProjectData>(PROJECT_QUERY, { slug });

  if (!project) {
    notFound();
  }

  const isAgentDasc = slug === 'agent-dasc-lifecycle';

  const metaItems = isAgentDasc
    ? [
        { label: 'ARCHITECTURE', value: 'Google DS-STAR Paper' },
        { label: 'FOCUS', value: 'Planning & Verification' },
        { label: 'STATUS', value: 'Core Pipeline: Built & Tested' },
        { label: 'OUTCOME', value: 'Autonomous Analysis', highlight: true },
      ]
    : [
        { label: 'TYPE', value: typeLabels[project.type || ''] || project.type || 'Personal Build' },
        { label: 'STATUS', value: statusLabels[project.status || ''] || project.status || 'Active' },
        { label: 'REPOSITORY', value: project.repoUrl ? 'GitHub' : 'N/A' },
        {
          label: 'HIGHLIGHT',
          value: project.statHighlight || 'In Progress',
          highlight: !!project.statHighlight,
        },
      ];

  const portableTextComponents: PortableTextComponents = {
    types: {
      image: ({ value }: any) => {
        const imageUrl = urlFor(value)?.url();
        if (!imageUrl) return null;
        return (
          <figure className="cs-figure">
            <img src={imageUrl} alt={value.alt || ''} className="radius-lg" loading="lazy" />
            {value.caption && <figcaption>{value.caption}</figcaption>}
          </figure>
        );
      },
      dsStarSvg: () => <DsStarSvg />,
      maturityTable1: () => <MaturityTable items={agentDascMaturityItems1} />,
      maturityTable2: () => <MaturityTable items={agentDascMaturityItems2} />,
      adrList: () => <AdrList items={agentDascAdrs} />,
      statHighlight: () => (
        <div className="stat-highlight">
          <div className="stat-num-lg">{project.statHighlight || '+32pp'}</div>
          <div className="stat-cap">{project.statCaption || ''}</div>
        </div>
      ),
    },
    block: {
      h3: ({ children }) => <h3>{children}</h3>,
      normal: ({ children }) => <p>{children}</p>,
      code: ({ children }) => (
        <pre className="radius-lg">
          <code>{children}</code>
        </pre>
      ),
    },
    marks: {
      code: ({ children }) => <code>{children}</code>,
      link: ({ children, value }) => {
        const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
        const target = !value.href.startsWith('/') ? '_blank' : undefined;
        return (
          <a href={value.href} rel={rel} target={target}>
            {children}
          </a>
        );
      },
    },
  };

  // Helper to inject custom components dynamically for the Agent-DASC project
  const getProcessedBody = () => {
    if (!project.body) return [];
    if (!isAgentDasc) return project.body;

    const newBlocks = [...project.body];
    const getBlockText = (b: any) =>
      b.children?.map((c: any) => c.text).join('') || '';

    // 1. Insert StatHighlight & DsStarSvg before Heading 2 ("2. What's Actually Built...")
    const h2Index = newBlocks.findIndex(
      (b) => b.style === 'h3' && getBlockText(b).includes("What's Actually Built vs. Designed")
    );
    if (h2Index !== -1) {
      newBlocks.splice(
        h2Index,
        0,
        { _type: 'statHighlight', _key: 'dasc-stat-highlight' },
        { _type: 'dsStarSvg', _key: 'dasc-svg' }
      );
    }

    // 2. Insert MaturityTable1 between Paragraph 1 and Paragraph 2 of Section 2
    // Search again since we modified indices
    const h2IndexUpdated = newBlocks.findIndex(
      (b) => b.style === 'h3' && getBlockText(b).includes("What's Actually Built vs. Designed")
    );
    if (h2IndexUpdated !== -1) {
      // Find the first paragraph index after Heading 2
      let p1Index = -1;
      for (let i = h2IndexUpdated + 1; i < newBlocks.length; i++) {
        if (newBlocks[i]._type === 'block' && newBlocks[i].style === 'normal') {
          p1Index = i;
          break;
        }
      }
      if (p1Index !== -1) {
        newBlocks.splice(p1Index + 1, 0, {
          _type: 'maturityTable1',
          _key: 'dasc-maturity-1',
        });
      }
    }

    // 3. Insert AdrList after the paragraph under Heading 4 ("4. Architecture Decisions")
    const h4Index = newBlocks.findIndex(
      (b) => b.style === 'h3' && getBlockText(b).includes('Architecture Decisions')
    );
    if (h4Index !== -1) {
      let pAfterH4Index = -1;
      for (let i = h4Index + 1; i < newBlocks.length; i++) {
        if (newBlocks[i]._type === 'block' && newBlocks[i].style === 'normal') {
          pAfterH4Index = i;
          break;
        }
      }
      if (pAfterH4Index !== -1) {
        newBlocks.splice(pAfterH4Index + 1, 0, {
          _type: 'adrList',
          _key: 'dasc-adrs',
        });
      }
    }

    // 4. Append MaturityTable2 at the end
    newBlocks.push({ _type: 'maturityTable2', _key: 'dasc-maturity-2' });

    return newBlocks;
  };

  const processedBody = getProcessedBody();

  return (
    <div className="wrap">
      {/* Hero Block */}
      <div className="cs-header">
        <span className="kicker">
          Case Study &middot; {typeLabels[project.type || ''] || 'Project'}
        </span>
        <h1 className="cs-title">{project.title}</h1>

        <div className="cs-meta-grid">
          {metaItems.map((item, index) => (
            <div key={index} className="cs-meta-item">
              <div className="cs-meta-label">{item.label}</div>
              <div
                className="cs-meta-val"
                style={item.highlight ? { color: 'var(--brand-color-primary)' } : undefined}
              >
                {item.value}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Grid Layout (Content + Sidebar) */}
      <div className="section cs-grid">
        <article className="cs-content">
          {isAgentDasc && (
            <p style={{ fontSize: 'var(--brand-font-size-sm)', color: 'var(--brand-color-text-tertiary)', fontStyle: 'italic' }}>
              A self-directed architecture &amp; product-design exercise — designed against a realistic, hypothetical financial-crime supervision scenario, not an actual client engagement.
            </p>
          )}

          {processedBody && processedBody.length > 0 ? (
            <PortableText value={processedBody} components={portableTextComponents} />
          ) : (
            <p>{project.summary}</p>
          )}
        </article>

        {project.repoUrl && (
          <aside className="cs-sidebar">
            <div className="side-card radius-lg">
              <div className="side-card-accent">
                <h4 style={{ fontSize: 'var(--brand-font-size)', fontWeight: 700 }}>GITHUB REPOSITORY</h4>
                <p style={{ fontSize: 'var(--brand-font-size-sm)', color: 'var(--brand-color-text-secondary)', marginTop: '4px' }}>
                  {isAgentDasc
                    ? 'Access code, design templates, and DS-STAR documentation on GitHub.'
                    : 'Access code and documentation for this project on GitHub.'}
                </p>
              </div>
              <hr style={{ border: 'none', borderTop: 'var(--brand-line-width) solid var(--brand-color-border-secondary)' }} />
              <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary radius-lg" style={{ width: '100%', display: 'flex', textDecoration: 'none' }}>
                View GitHub Repository
              </a>
            </div>
          </aside>
        )}
      </div>

      <div style={{ marginTop: '40px', marginBottom: '40px' }}>
        <Link href="/#portfolio" className="btn btn-secondary radius-lg">
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}
