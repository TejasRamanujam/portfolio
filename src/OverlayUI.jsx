import { useEffect, useMemo, useRef, useState } from 'react';
import { CASE_STUDIES } from './caseStudies.js';

const focusable = (root) =>
  Array.from(root?.querySelectorAll('a[href], button:not([disabled]), input') || []);

function useDialog(open, rootRef, onClose) {
  const closeRef = useRef(onClose);
  closeRef.current = onClose;
  useEffect(() => {
    if (!open) return undefined;
    const previous = document.activeElement;
    const root = rootRef.current;
    focusable(root)[0]?.focus();
    const onKey = (event) => {
      if (event.key === 'Escape') closeRef.current();
      if (event.key !== 'Tab') return;
      const items = focusable(root);
      if (!items.length) return;
      const first = items[0];
      const last = items.at(-1);
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.body.classList.add('dialog-open');
    document.addEventListener('keydown', onKey);
    return () => {
      document.body.classList.remove('dialog-open');
      document.removeEventListener('keydown', onKey);
      previous?.focus();
    };
  }, [open, rootRef]);
}

function Architecture({ nodes }) {
  const width = 680;
  const nodeWidth = 130;
  const gap = nodes.length > 1 ? (width - nodeWidth * nodes.length) / (nodes.length - 1) : 0;
  return (
    <svg className="architecture" viewBox="0 0 720 150" role="img" aria-label={`${nodes.join(' to ')} architecture`}>
      <defs>
        <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto">
          <path d="M0 0 L8 4 L0 8" fill="none" stroke="currentColor" />
        </marker>
      </defs>
      {nodes.map((node, index) => {
        const x = 20 + index * (nodeWidth + gap);
        return (
          <g key={node}>
            {index < nodes.length - 1 && (
              <line x1={x + nodeWidth} y1="75" x2={x + nodeWidth + gap - 8} y2="75" stroke="currentColor" markerEnd="url(#arrow)" />
            )}
            <rect x={x} y="43" width={nodeWidth} height="64" fill="var(--paper)" stroke="currentColor" strokeWidth="1.5" />
            <text x={x + nodeWidth / 2} y="72" textAnchor="middle">
              {node.split(' ').map((word, wordIndex) => (
                <tspan key={word} x={x + nodeWidth / 2} dy={wordIndex ? 14 : 0}>{word}</tspan>
              ))}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

export function CaseStudySheet({ slug, onClose }) {
  const ref = useRef(null);
  const study = CASE_STUDIES[slug];
  useDialog(Boolean(study), ref, onClose);
  if (!study) return null;
  return (
    <div className="sheet-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <article className="detail-sheet" ref={ref} role="dialog" aria-modal="true" aria-labelledby="sheet-title">
        <header className="detail-head">
          <p className="mono">SHEET {study.sheet} — CASE STUDY</p>
          <button type="button" className="sheet-close mono" onClick={onClose}>← CLOSE / ESC</button>
        </header>
        <div className="detail-titleblock">
          <p className="mono">PROJECT DETAIL · REV. 2026</p>
          <h2 id="sheet-title">{study.title}</h2>
        </div>
        <section className="detail-block">
          <p className="detail-label mono">01 / PROBLEM</p>
          <p className="detail-problem">{study.problem}</p>
        </section>
        <section className="detail-block">
          <p className="detail-label mono">02 / ARCHITECTURE</p>
          <Architecture nodes={study.architecture} />
        </section>
        <section className="detail-grid">
          <div className="detail-block">
            <p className="detail-label mono">03 / DECISIONS + TRADEOFFS</p>
            <ol className="decision-list">
              {study.decisions.map((decision, index) => <li key={decision}><span className="mono">{String(index + 1).padStart(2, '0')}</span>{decision}</li>)}
            </ol>
          </div>
          <aside className="detail-block detail-stack">
            <p className="detail-label mono">04 / STACK</p>
            <ul className="tags mono">{study.stack.map((item) => <li key={item}>{item}</li>)}</ul>
            <div className="detail-actions mono">
              <a href={study.live} target="_blank" rel="noreferrer">LIVE DEMO ↗</a>
              <a href={study.repo} target="_blank" rel="noreferrer">SOURCE ↗</a>
            </div>
          </aside>
        </section>
      </article>
    </div>
  );
}

export function CommandPalette({ open, entries, onClose }) {
  const ref = useRef(null);
  const inputRef = useRef(null);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const matches = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return needle ? entries.filter((entry) => entry.label.toLowerCase().includes(needle)) : entries;
  }, [entries, query]);
  useDialog(open, ref, onClose);
  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);
  useEffect(() => setActive((value) => Math.min(value, Math.max(0, matches.length - 1))), [matches.length]);
  if (!open) return null;
  const execute = (entry) => {
    if (!entry) return;
    onClose();
    entry.action();
  };
  return (
    <div className="palette-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="palette" ref={ref} role="dialog" aria-modal="true" aria-labelledby="palette-title">
        <div className="palette-head">
          <h2 id="palette-title">THE INDEX</h2>
          <span className="mono">CTRL / ⌘ + K · ESC</span>
        </div>
        <input
          ref={inputRef}
          className="palette-input mono"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === 'ArrowDown' && matches.length) { event.preventDefault(); setActive((value) => (value + 1) % matches.length); }
            if (event.key === 'ArrowUp' && matches.length) { event.preventDefault(); setActive((value) => (value - 1 + matches.length) % matches.length); }
            if (event.key === 'Enter') { event.preventDefault(); execute(matches[active]); }
          }}
          placeholder="TYPE A SHEET, BUILD, OR ACTION…"
          aria-label="Search the index"
        />
        <ul className="palette-results" role="listbox">
          {matches.map((entry, index) => (
            <li key={entry.label}>
              <button type="button" className={index === active ? 'active' : ''} onMouseEnter={() => setActive(index)} onClick={() => execute(entry)}>
                <span className="mono">{entry.kind}</span>{entry.label}<span aria-hidden="true">→</span>
              </button>
            </li>
          ))}
          {!matches.length && <li className="palette-empty mono">NO INDEX ENTRY FOUND.</li>}
        </ul>
      </section>
    </div>
  );
}

export function ScrollRail({ sections }) {
  const [current, setCurrent] = useState(sections[0].id);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setCurrent(visible.target.id);
    }, { rootMargin: '-25% 0px -60%', threshold: [0, 0.2, 0.6] });
    sections.forEach(({ id }) => { const node = document.getElementById(id); if (node) observer.observe(node); });
    return () => observer.disconnect();
  }, [sections]);
  return (
    <nav className="scroll-rail mono" aria-label="Sheet zones">
      {sections.map(({ id, no }) => <a key={id} href={`#${id}`} aria-current={current === id ? 'location' : undefined}><span>§</span>{no}</a>)}
    </nav>
  );
}

export function CopyEmail({ email, className, children, ...props }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try { await navigator.clipboard.writeText(email); } catch { window.location.href = `mailto:${email}`; return; }
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1400);
  };
  return <button type="button" className={`${className}${copied ? ' copied' : ''}`} onClick={copy} {...props}>{children}<span className="copy-stamp mono" aria-live="polite">{copied ? 'COPIED ✓' : ''}</span></button>;
}
