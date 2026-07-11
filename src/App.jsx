import { useEffect, useRef, useState } from 'react';
import { CONTACT, EDUCATION, EXPERIENCE, PROJECTS_FEATURED, PROJECTS_MORE, SKILLS } from './data.js';
import { createPlotter } from './plotter.js';

const prefersReduced = () =>
  typeof matchMedia !== 'undefined' && matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------------------------------------------------------- clock */

function Clock() {
  const [now, setNow] = useState('--:--:--');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Chicago',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span className="clock mono" aria-label={`Local time in Richardson, Texas: ${now}`}>
      RICHARDSON, TX&nbsp;&nbsp;{now} CT
    </span>
  );
}

/* ------------------------------------------------------- kinetic title */

function KineticLine({ text }) {
  return (
    <span className="k-line" aria-hidden="true">
      {text.split('').map((ch, i) => (
        <span className="k-ch" key={i}>
          {ch}
        </span>
      ))}
    </span>
  );
}

function useKineticTitle(heroRef, enabled) {
  useEffect(() => {
    if (!enabled) return;
    const hero = heroRef.current;
    if (!hero) return;
    const chars = Array.from(hero.querySelectorAll('.k-ch'));
    if (!chars.length) return;

    const state = chars.map(() => ({ w: 72, g: 640 }));
    let px = -9999;
    let raf = 0;
    let active = false;
    let visible = true;

    const onMove = (e) => {
      px = e.clientX;
      active = true;
    };

    const loop = () => {
      if (visible) {
        for (let i = 0; i < chars.length; i++) {
          const r = chars[i].getBoundingClientRect();
          const cx = r.left + r.width / 2;
          const d = Math.abs(px - cx);
          const f = active ? Math.max(0, 1 - d / 260) : 0;
          const s = state[i];
          s.w += (72 + f * 53 - s.w) * 0.14;
          s.g += (640 + f * 230 - s.g) * 0.14;
          chars[i].style.fontVariationSettings = `'wdth' ${s.w.toFixed(1)}, 'wght' ${s.g.toFixed(0)}`;
        }
      }
      raf = requestAnimationFrame(loop);
    };

    const io = new IntersectionObserver(([en]) => {
      visible = en.isIntersecting;
    });
    io.observe(hero);
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener('pointermove', onMove);
    };
  }, [enabled, heroRef]);
}

/* ---------------------------------------------------------- crosshair */

function Crosshair({ enabled }) {
  const hRef = useRef(null);
  const vRef = useRef(null);
  const tagRef = useRef(null);
  useEffect(() => {
    if (!enabled) return;
    let tx = -100;
    let ty = -100;
    let x = -100;
    let y = -100;
    let seen = false;
    let raf = 0;
    const onMove = (e) => {
      tx = e.clientX;
      ty = e.clientY;
      seen = true;
    };
    const loop = () => {
      x += (tx - x) * 0.22;
      y += (ty - y) * 0.22;
      if (seen && hRef.current) {
        hRef.current.style.transform = `translateY(${y}px)`;
        vRef.current.style.transform = `translateX(${x}px)`;
        tagRef.current.style.transform = `translate(${x + 14}px, ${y + 14}px)`;
        tagRef.current.textContent = `X ${String(Math.round(x)).padStart(4, '0')} · Y ${String(
          Math.round(y),
        ).padStart(4, '0')}`;
        hRef.current.parentElement.style.opacity = '1';
      }
      raf = requestAnimationFrame(loop);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onMove);
    };
  }, [enabled]);
  if (!enabled) return null;
  return (
    <div className="xhair" aria-hidden="true">
      <div className="xhair-h" ref={hRef} />
      <div className="xhair-v" ref={vRef} />
      <div className="xhair-tag mono" ref={tagRef} />
    </div>
  );
}

/* ------------------------------------------------------------ sections */

function SectionHead({ no, title, note }) {
  return (
    <header className="sec-head" data-reveal>
      <span className="sec-no mono">§ {no}</span>
      <h2 className="sec-title">{title}</h2>
      <span className="sec-note mono">{note}</span>
    </header>
  );
}

function WorkRow({ p, i, onInk, ghost }) {
  return (
    <li className={`work-row${ghost ? ' ghosted' : ''}`} data-reveal style={{ '--i': i }}>
      <a
        className="work-link"
        href={p.href}
        target="_blank"
        rel="noreferrer"
        onPointerEnter={(e) => onInk(e.clientX, e.clientY)}
      >
        <div className="work-top">
          <span className="work-idx mono">{String(i + 1).padStart(2, '0')}</span>
          <h3 className="work-name">{p.label}</h3>
          <span className="work-type mono">{p.type}</span>
          <span className="work-period mono">{p.period}</span>
          <span className="work-arrow" aria-hidden="true">
            →
          </span>
        </div>
        <div className="work-detail">
          <div className="work-detail-inner">
            <p className="work-desc">{p.desc}</p>
            <p className="work-highlight mono">◆ {p.highlight}</p>
            <ul className="tags mono">
              {p.tech.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>
      </a>
    </li>
  );
}

const norm = (v) => String(v).trim().toLowerCase();
/* An item is "attached" to a skill when it appears in that skill's
   curated refs (same href for builds; company prefix for roles). */
const refHits = (item, sk) =>
  sk.refs.some((r) => {
    if (r.href && item.href) return r.href === item.href;
    if (!r.href && item.company) return norm(r.label).startsWith(norm(item.company.split(' ')[0]));
    return false;
  });
export function matchesSkills(item, selSkills) {
  if (!selSkills.length) return true;
  return selSkills.every((sk) => refHits(item, sk));
}

/* Skills as an interactive parts list: multi-select parts to FILTER the
   whole sheet (experience + work + archive dim to ghosts), legend plots
   the selected parts' builds. */
function SkillsBoard({ active, onToggle, onClear }) {
  const selected = SKILLS.flatMap((g) => g.items).filter((it) => active.includes(it.name));
  return (
    <div className="skills-board">
      <div className="bom">
        <p className="bom-filter mono" aria-live="polite">
          {active.length ? (
            <>
              FILTERING SHEET BY {active.length} PART{active.length > 1 ? 'S' : ''} (AND){' '}
              <button type="button" className="bom-clear mono" onClick={onClear}>
                × CLEAR
              </button>
            </>
          ) : (
            'SELECT PARTS TO FILTER THE WHOLE SHEET — EXPERIENCE, WORK & ARCHIVE.'
          )}
        </p>
        {SKILLS.map((g, i) => (
          <div className="bom-row" key={g.label} data-reveal style={{ '--i': i }}>
            <span className="bom-label mono">{g.label.toUpperCase()}</span>
            <div className="bom-chips" role="group" aria-label={`${g.label} skills`}>
              {g.items.map((it) => (
                <button
                  key={it.name}
                  type="button"
                  className="chip mono"
                  aria-pressed={active.includes(it.name)}
                  onClick={() => onToggle(it.name)}
                >
                  {it.name}
                </button>
              ))}
            </div>
            <span className="bom-qty mono">×{g.items.length}</span>
          </div>
        ))}
      </div>
      <aside className="legend" aria-live="polite">
        <p className="legend-head mono">LEGEND</p>
        {selected.length ? (
          selected.map((sel) => (
            <div key={sel.name} className="legend-block">
              <p className="legend-skill">{sel.name}</p>
              {sel.refs.length ? (
                <ul className="legend-refs">
                  {sel.refs.map((r) => (
                    <li key={r.label} className="mono">
                      {r.href ? (
                        <a href={r.href} target="_blank" rel="noreferrer">{r.label} ↗</a>
                      ) : (
                        <span>{r.label}</span>
                      )}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mono legend-empty">NO INDEXED BUILDS ON THIS SHEET.</p>
              )}
            </div>
          ))
        ) : (
          <p className="mono legend-empty">CLICK PARTS TO PLOT THEIR BUILDS.</p>
        )}
      </aside>
    </div>
  );
}

/* ----------------------------------------------------------------- app */

export default function App() {
  const reduced = useRef(prefersReduced()).current;
  const [activeSkills, setActiveSkills] = useState([]);
  const selSkills = SKILLS.flatMap((g) => g.items).filter((it) => activeSkills.includes(it.name));
  const toggleSkill = (n) =>
    setActiveSkills((prev) => (prev.includes(n) ? prev.filter((x) => x !== n) : [...prev, n]));
  const fine = useRef(
    typeof matchMedia !== 'undefined' && matchMedia('(pointer: fine)').matches,
  ).current;

  const canvasRef = useRef(null);
  const plotterRef = useRef(null);
  const heroRef = useRef(null);

  useKineticTitle(heroRef, !reduced && fine);

  // Plotter background
  useEffect(() => {
    const plotter = createPlotter(canvasRef.current, { reducedMotion: reduced });
    plotterRef.current = plotter;
    return () => plotter.destroy();
  }, [reduced]);

  // Scroll reveals
  useEffect(() => {
    const els = Array.from(document.querySelectorAll('[data-reveal]'));
    if (reduced || !('IntersectionObserver' in window)) {
      els.forEach((el) => el.classList.add('in'));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in');
            io.unobserve(en.target);
          }
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [reduced]);

  // Easter egg: G toggles the drafting grid
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.key.toLowerCase() === 'g' &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.altKey &&
        !/^(input|textarea|button|a)$/i.test(e.target.tagName)
      ) {
        document.body.classList.toggle('show-grid');
      }
    };
    window.addEventListener('keydown', onKey);
    // eslint-disable-next-line no-console
    console.log('%cSHEET 01 — press G to toggle the drafting grid.', 'font-family:monospace');
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const ink = (x, y) => plotterRef.current && plotterRef.current.burst(x, y);

  return (
    <>
      <a className="skip mono" href="#main">
        Skip to content
      </a>
      <canvas ref={canvasRef} className="plotter" aria-hidden="true" />
      <div className="grid-overlay" aria-hidden="true" />
      <Crosshair enabled={fine && !reduced} />

      <header className="topbar">
        <span className="mark mono">
          T·RAMANUJAM<span className="mark-ext"> — SHEET 01</span>
        </span>
        <nav className="topnav mono" aria-label="Sections">
          <a href="#experience">EXPERIENCE</a>
          <a href="#work">WORK</a>
          <a href="#skills">SKILLS</a>
          <a href="#contact">CONTACT</a>
        </nav>
        <Clock />
      </header>

      <main id="main">
        {/* ---------------------------------------------------- hero */}
        <section className="hero" ref={heroRef} aria-label="Introduction">
          <p className="kicker mono" data-reveal>
            FIG. 01 — PORTFOLIO OF WORK · SOFTWARE ENGINEER
          </p>
          <h1 className="hero-title" data-reveal style={{ '--i': 1 }}>
            <span className="visually-hidden">Tejas Ramanujam</span>
            <KineticLine text="TEJAS" />
            <KineticLine text="RAMANUJAM" />
          </h1>
          <div className="dim-line" data-reveal style={{ '--i': 2 }} aria-hidden="true">
            <span className="dim-tick" />
            <span className="dim-label mono">DRAWN 2026 · SCALE 1:1</span>
            <span className="dim-tick" />
          </div>
          <div className="hero-grid" data-reveal style={{ '--i': 3 }}>
            <p className="lede">
              I build <em>AI systems</em>, full-stack products, and open-source tools — LLM
              pipelines, FastAPI backends, React frontends.
            </p>
            <dl className="meta mono">
              <div>
                <dt>EDUCATION</dt>
                <dd>B.S. SOFTWARE ENGINEERING — UT DALLAS &rsquo;27</dd>
              </div>
              <div>
                <dt>MINOR</dt>
                <dd>{EDUCATION.minor.toUpperCase()}</dd>
              </div>
              <div>
                <dt>GPA</dt>
                <dd>{EDUCATION.gpa} / 4.00</dd>
              </div>
              <div>
                <dt>COURSEWORK</dt>
                <dd>{EDUCATION.coursework.join(' · ').toUpperCase()}</dd>
              </div>
              <div>
                <dt>BASED IN</dt>
                <dd>RICHARDSON, TEXAS</dd>
              </div>
            </dl>
          </div>
          <div className="hero-cta" data-reveal style={{ '--i': 4 }}>
            <a className="btn mono" href={CONTACT.github} target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
            <a className="btn mono" href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN ↗
            </a>
            <a className="btn btn-solid mono" href={`mailto:${CONTACT.email}`}>
              EMAIL ME
            </a>
          </div>
        </section>

        {/* -------------------------------------------------- ticker */}
        <div className="ticker" aria-hidden="true">
          <div className="ticker-track mono">
            {[0, 1].map((k) => (
              <span key={k}>
                AI SYSTEMS — FULL-STACK PRODUCTS — OPEN-SOURCE TOOLS — LLM PIPELINES — FASTAPI
                BACKENDS — REACT FRONTENDS — MULTI-AGENT ORCHESTRATION —&nbsp;
              </span>
            ))}
          </div>
        </div>

        {/* ---------------------------------------------- experience */}
        <section id="experience" className="section" aria-label="Experience">
          <SectionHead no="02" title="EXPERIENCE" note="2021 — PRESENT" />
          <div className="xps">
            {EXPERIENCE.map((x, i) => (
              <article className={`xp${matchesSkills(x, selSkills) ? '' : ' ghosted'}`} key={x.company} data-reveal style={{ '--i': i }}>
                <h3 className="xp-role">
                  {x.role} <span className="xp-co">— {x.company}</span>
                </h3>
                <div className="xp-when mono">
                  {x.period.toUpperCase()} · {x.location.toUpperCase()}
                </div>
                <ul className="xp-bullets">
                  {x.bullets.map((b) => (
                    <li key={b}>{b}</li>
                  ))}
                </ul>
                <ul className="tags mono">
                  {x.tags.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* ---------------------------------------------------- work */}
        <section id="work" className="section" aria-label="Selected work">
          <SectionHead
            no="03"
            title="SELECTED WORK"
            note={`${PROJECTS_FEATURED.length} LIVE BUILDS`}
          />
          <ol className="works">
            {PROJECTS_FEATURED.map((p, i) => (
              <WorkRow key={p.name} p={p} i={i} onInk={ink} ghost={!matchesSkills(p, selSkills)} />
            ))}
          </ol>
        </section>

        {/* --------------------------------- sheet 02 cross-reference */}
        <section className="section sheetref-wrap" aria-label="Live demos catalogue">
          <a
            className="sheetref"
            href="https://tejas-live-demos.vercel.app"
            target="_blank"
            rel="noreferrer"
            data-reveal
          >
            <div className="sheetref-body">
              <p className="mono sheetref-note">SEE DETAIL → SHEET 02 · INDEX OF LIVE SOFTWARE</p>
              <p className="sheetref-title">
                Five <em>living</em> machines
              </p>
              <p className="sheetref-sub">
                Every build above, running right now in one catalogue — draw on it, search it,
                talk to it.
              </p>
              <span className="mono sheetref-cta">OPEN THE CATALOGUE ↗</span>
            </div>
            <svg
              className="sheetref-fig"
              viewBox="0 0 180 130"
              aria-hidden="true"
              focusable="false"
            >
              <rect x="6" y="6" width="168" height="118" fill="none" stroke="currentColor" strokeWidth="1.4" />
              <rect x="14" y="14" width="152" height="102" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3 3" />
              {[0, 1, 2, 3, 4].map((i) => (
                <g key={i}>
                  <rect
                    x={26 + i * 26}
                    y={38 - (i % 2) * 10}
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.1"
                    className="sheetref-plate"
                    style={{ animationDelay: `${i * 0.35}s` }}
                  />
                  <line
                    x1={36 + i * 26}
                    y1={58 - (i % 2) * 10 + 1}
                    x2={36 + i * 26}
                    y2="92"
                    stroke="currentColor"
                    strokeWidth="0.6"
                    strokeDasharray="2 3"
                  />
                  <text x={32 + i * 26} y="104" className="sheetref-no">
                    0{i + 1}
                  </text>
                </g>
              ))}
            </svg>
          </a>
        </section>

        {/* -------------------------------------------------- skills */}
        <section id="skills" className="section" aria-label="Skills">
          <SectionHead no="04" title="SKILLS / PARTS LIST" note="BILL OF MATERIALS" />
          <SkillsBoard active={activeSkills} onToggle={toggleSkill} onClear={() => setActiveSkills([])} />
        </section>

        {/* ------------------------------------------------- archive */}
        <section className="section" aria-label="Project archive">
          <SectionHead
            no="05"
            title="ARCHIVE"
            note={`INDEX 06 — ${5 + PROJECTS_MORE.length}`}
          />
          <ul className="arch">
            {PROJECTS_MORE.map((p, i) => (
              <li key={p.name} className={matchesSkills(p, selSkills) ? undefined : 'ghosted'} data-reveal style={{ '--i': i % 4 }}>
                <a className="arch-link" href={p.href} target="_blank" rel="noreferrer">
                  <span className="arch-idx mono">{String(i + 6).padStart(2, '0')}</span>
                  <span className="arch-name">{p.label}</span>
                  <span className="arch-tech mono">{p.tech}</span>
                  <span className="arch-arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </section>

        {/* ------------------------------------------------- contact */}
        <section id="contact" className="section contact" aria-label="Contact">
          <SectionHead no="06" title="GET IN TOUCH" note="NO FORM. JUST MAIL." />
          <a className="mail" href={`mailto:${CONTACT.email}`} data-reveal>
            {CONTACT.email}
          </a>
          <div className="contact-links mono" data-reveal style={{ '--i': 1 }}>
            <a href={`tel:+1${CONTACT.phone.replace(/-/g, '')}`}>{CONTACT.phone}</a>
            <a href={CONTACT.github} target="_blank" rel="noreferrer">
              GITHUB ↗
            </a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">
              LINKEDIN ↗
            </a>
            <a href={CONTACT.demos}>ALL DEMOS ↗</a>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p className="mono">
          © 2026 TEJAS RAMANUJAM — SET IN ARCHIVO &amp; FRAGMENT MONO. BACKGROUND PLOTTED LIVE BY A
          FLOW-FIELD PEN. BUILT WITH REACT + VITE.
        </p>
        <p className="mono footer-hint">PRESS “G” TO TOGGLE THE DRAFTING GRID.</p>
      </footer>
    </>
  );
}
