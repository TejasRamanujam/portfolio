import { useEffect } from 'react';
import { CONTACT, EDUCATION, EXPERIENCE, PROJECTS_FEATURED, PROJECTS_MORE, SKILLS } from './data.js';

const projectCtas = {
  'working-drawing': 'Explore this station',
  connection: 'Start talking',
  neuron: 'Search the archive',
  neurosurge: 'Open the atlas',
  scribbly: 'Draw together',
};

const specimenMeta = {
  'working-drawing': ['flow field', 'signal / 00'],
  connection: ['voice trace', 'signal / 01'],
  neuron: ['taxonomy', 'signal / 02'],
  neurosurge: ['knowledge atlas', 'signal / 03'],
  scribbly: ['shared stroke', 'signal / 04'],
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function Crosshair({ className = '' }) {
  return <span className={`crosshair ${className}`} aria-hidden="true"><i /><i /></span>;
}

function Instrument({ name }) {
  if (name === 'connection') {
    return (
      <svg className="instrument instrument--connection" viewBox="0 0 720 520" role="img" aria-label="An oscilloscope voice trace responding across a measurement grid">
        <defs><pattern id="voice-grid" width="36" height="36" patternUnits="userSpaceOnUse"><path d="M36 0H0V36" /></pattern></defs>
        <rect className="instrument-paper" x="56" y="58" width="608" height="404" rx="2" />
        <rect className="grid" x="88" y="94" width="544" height="292" fill="url(#voice-grid)" />
        <path className="trace trace--ghost" d="M90 250 C130 250 140 185 176 250 S226 328 260 250 S305 122 342 250 S395 352 428 250 S480 170 516 250 S570 298 632 250" />
        <path className="trace" pathLength="1" d="M90 250 C130 250 140 185 176 250 S226 328 260 250 S305 122 342 250 S395 352 428 250 S480 170 516 250 S570 298 632 250" />
        <circle className="signal-dot" cx="342" cy="250" r="15" />
        <path className="measure" d="M88 413H288M432 413h200" />
        <text x="88" y="438">VOICE / LISTENING</text><text x="535" y="438">01.42 SEC</text>
      </svg>
    );
  }

  if (name === 'neuron') {
    return (
      <svg className="instrument instrument--neuron" viewBox="0 0 720 520" role="img" aria-label="A punched archive card with a rotating taxonomy star">
        <rect className="index-shadow" x="112" y="70" width="500" height="360" />
        <path className="index-card" d="M90 48H630V444H90Z" />
        {[132, 202, 272, 342, 412, 482, 552].map((x) => <circle className="index-hole" key={x} cx={x} cy="64" r="11" />)}
        <path className="rule" d="M132 143H590M132 190H590M132 237H590M132 284H590M132 331H590" />
        <g className="taxonomy-star">
          <path d="M510 142l13 31 33-10-18 29 28 18-34 4 2 34-24-24-24 24 2-34-34-4 28-18-18-29 33 10z" />
          <circle cx="510" cy="197" r="18" />
        </g>
        <text x="132" y="125">FIELD CATALOGUE / 24 BUILDS</text>
        <text x="132" y="379">QUERY — FILTER — ADAPT</text>
        <path className="route" pathLength="1" d="M152 404C250 356 329 438 448 382S568 405 594 360" />
      </svg>
    );
  }

  if (name === 'neurosurge') {
    const nodes = [[150,340],[212,210],[290,286],[353,142],[410,250],[500,184],[560,322],[620,234],[360,380]];
    return (
      <svg className="instrument instrument--neurosurge" viewBox="0 0 720 520" role="img" aria-label="A topographic knowledge atlas connected by a living graph">
        <path className="topo topo--one" d="M58 288C107 176 189 106 300 102c140-5 160 73 264 80 60 4 92-21 116-50" />
        <path className="topo topo--two" d="M48 336c64-122 152-174 253-166 109 8 145 78 245 69 56-5 91-35 136-74" />
        <path className="topo topo--three" d="M62 395c111-102 205-133 305-99 111 38 159 82 300-26" />
        <g className="graph-lines"><path d="M150 340L212 210 290 286 353 142 410 250 500 184 620 234 560 322 410 250 360 380 290 286 150 340M353 142L500 184M212 210L353 142M360 380L560 322" /></g>
        {nodes.map(([x,y], i) => <g className={`node node--${i}`} key={`${x}-${y}`}><circle cx={x} cy={y} r={i === 4 ? 15 : 8} /><circle className="node-ring" cx={x} cy={y} r={i === 4 ? 29 : 17} /></g>)}
        <text x="66" y="70">TERRA COGNITA / ACTIVE MAP</text><text x="565" y="470">09 LINKS</text>
      </svg>
    );
  }

  if (name === 'scribbly') {
    return (
      <svg className="instrument instrument--scribbly" viewBox="0 0 720 520" role="img" aria-label="Two live cursors sharing one permanent gestural stroke">
        <path className="paper-edge" d="M70 75H650V440H70Z" />
        <path className="scribble scribble--shadow" d="M117 330C169 112 254 400 319 222S443 119 464 286s109 126 151-70" />
        <path className="scribble" pathLength="1" d="M117 330C169 112 254 400 319 222S443 119 464 286s109 126 151-70" />
        <path className="cursor cursor--one" d="M244 159l8 31 10-11 10 20 9-5-10-20 15-1z" />
        <path className="cursor cursor--two" d="M520 333l8 31 10-11 10 20 9-5-10-20 15-1z" />
        <text x="78" y="61">THE PROOF ROOM / 2 PRESENT</text><text x="490" y="465">STROKE 0048</text>
        <circle className="registration" cx="617" cy="110" r="30" /><path className="registration-mark" d="M617 68v84M575 110h84" />
      </svg>
    );
  }

  return (
    <svg className="instrument instrument--flow" viewBox="0 0 720 520" role="img" aria-label="Five colored flow lines converging through one living software field">
      {Array.from({ length: 13 }, (_, i) => (
        <path key={i} className={`flow-line flow-line--${i % 5}`} style={{ '--delay': `${i * -0.18}s` }} pathLength="1" d={`M28 ${82 + i * 27} C172 ${22 + i * 12}, 212 ${470 - i * 21}, 374 ${258 + (i - 6) * 8} S574 ${88 + i * 22}, 698 ${142 + i * 13}`} />
      ))}
      <circle className="flow-orbit" cx="374" cy="258" r="78" /><circle className="signal-dot" cx="374" cy="258" r="16" />
      <path className="crop" d="M35 34h58M35 34v58M685 486h-58M685 486v-58" />
      <text x="38" y="474">FIELD STATION / FIVE SYSTEMS</text>
    </svg>
  );
}

function SignalThread() {
  return (
    <svg className="signal-thread" viewBox="0 0 1440 4200" preserveAspectRatio="none" aria-hidden="true">
      <path className="signal-thread__ghost" d="M10 30C420 120 250 470 720 555s490 420 185 610-650 230-310 470 710 255 410 590-770 190-500 510 625 185 410 540-615 235-250 540 485 425 760 365" />
      <path className="signal-thread__live" pathLength="1" d="M10 30C420 120 250 470 720 555s490 420 185 610-650 230-310 470 710 255 410 590-770 190-500 510 625 185 410 540-615 235-250 540 485 425 760 365" />
    </svg>
  );
}

function ProjectSpecimen({ project, index }) {
  const [motif, signal] = specimenMeta[project.name];

  const trackPointer = (event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--mx', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--my', `${event.clientY - rect.top}px`);
  };

  return (
    <article className={`specimen specimen--${project.name}`} id={`specimen-${index}`}>
      <div className="specimen-copy">
        <p className="specimen-kicker"><span>{String(index + 1).padStart(2, '0')}</span>{project.type}<i>live</i></p>
        <p className="specimen-name">{project.label}</p>
        <h3>{project.headline}</h3>
        <p className="specimen-description">{project.desc}</p>
        <ul className="specimen-tags" aria-label={`${project.label} technologies`}>
          {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <div className="specimen-actions">
          <a className="button" href={project.href} target="_blank" rel="noreferrer">{projectCtas[project.name]} <Arrow /></a>
          <a className="text-link" href={project.source} target="_blank" rel="noreferrer">inspect source <Arrow /></a>
        </div>
      </div>
      <div className="specimen-visual" onPointerMove={trackPointer}>
        <div className="visual-meta"><span>{motif}</span><span>{signal}</span></div>
        <Instrument name={project.name} />
        <Crosshair className="crosshair--card" />
      </div>
    </article>
  );
}

export default function App() {
  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      document.documentElement.style.setProperty('--scroll', max > 0 ? window.scrollY / max : 0);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Tejas Ramanujam, back to top"><span>TR</span> / FIELD STATION</a>
        <nav aria-label="Primary navigation"><a href="#work">systems</a><a href="#experience">practice</a><a href="#contact">contact</a></nav>
        <a className="status" href={`mailto:${CONTACT.email}`}><i /> available to build</a>
      </header>

      <aside className="progress-rail" aria-hidden="true"><span>00</span><i><b /></i><span>05</span></aside>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img className="hero-plate" src="/images/living-systems-hero.webp" alt="An editorial field station of waveforms, archive cards, knowledge maps, shared strokes, and flow lines connected by black thread" width="1672" height="941" fetchpriority="high" />
          <div className="hero-copy">
            <p className="eyebrow">Software engineering / AI / full stack</p>
            <h1 id="hero-title">I build software <em>with a pulse.</em></h1>
            <p className="hero-intro">I’m Tejas Ramanujam. I turn ambitious technical systems into clear, tactile products—built across the stack and made for real people to use.</p>
            <div className="hero-actions"><a className="button" href="#work">Enter the field station <span aria-hidden="true">↓</span></a><a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">résumé <Arrow /></a></div>
          </div>
          <div className="hero-readout" aria-hidden="true"><span>05 systems online</span><span>32.9857° N / 96.7501° W</span><span>signal stable</span></div>
          <Crosshair className="crosshair--hero" />
        </section>

        <section className="manifesto" aria-labelledby="manifesto-title">
          <p className="section-label">Field note / 00</p>
          <div className="manifesto-grid">
            <h2 id="manifesto-title">Complex underneath.<br /><em>Clear in the hand.</em></h2>
            <div className="manifesto-copy"><p>I like software that reveals how it thinks: a voice trace you can see, an archive you can search, a graph you can travel, a canvas that remembers.</p><p>That means working end to end—models, APIs, interfaces, infrastructure—and treating reliability and feeling as parts of the same system.</p></div>
          </div>
          <dl className="readouts"><div><dt>05</dt><dd>live systems</dd></div><div><dt>600+</dt><dd>devices automated</dd></div><div><dt>{EDUCATION.gpa}</dt><dd>UT Dallas GPA</dd></div><div><dt>’27</dt><dd>B.S. software engineering</dd></div></dl>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <SignalThread />
          <div className="work-intro"><p className="section-label">Specimen index / 01—05</p><h2 id="work-title">Five living <em>systems.</em></h2><p>Each project carries a different instrument language. Together they form one connected practice: listen, catalogue, map, draw, iterate.</p></div>
          <div className="specimens">{PROJECTS_FEATURED.map((project, index) => <ProjectSpecimen project={project} index={index} key={project.name} />)}</div>
          <a className="catalogue" href={CONTACT.demos} target="_blank" rel="noreferrer"><span><small>All instruments / live</small>Enter the complete demo catalogue</span><strong>talk · search · navigate · draw</strong><Arrow /></a>
        </section>

        <section className="experience" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading"><p className="section-label">Operational record / 06</p><h2 id="experience-title">Where the work met <em>the world.</em></h2><p>Production constraints, waiting users, measurable outcomes—the useful kind of pressure.</p><a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">full résumé <Arrow /></a></div>
          <div className="experience-list">{EXPERIENCE.map((item, index) => <article key={item.company}><span className="experience-number">0{index + 1}</span><div><p className="experience-date">{item.period} / {item.location}</p><h3>{item.role}</h3><p className="experience-company">{item.company}</p><p className="experience-result">{item.bullets[0]}</p></div></article>)}</div>
        </section>

        <section className="toolkit" aria-labelledby="toolkit-title">
          <div className="toolkit-heading"><p className="section-label">Instrument cabinet / 07</p><h2 id="toolkit-title">Tools arranged by <em>what they make possible.</em></h2></div>
          <div className="tool-groups">{SKILLS.map((group, index) => <article key={group.label} className="tool-group"><span>0{index + 1}</span><h3>{group.label}</h3><ul>{group.items.map((item) => <li key={item.name}>{item.name}</li>)}</ul></article>)}</div>
        </section>

        <section className="archive" aria-labelledby="archive-title">
          <div className="archive-heading"><p className="section-label">Peripheral signals / 08</p><h2 id="archive-title">The field extends <em>past five.</em></h2></div>
          <ol>{PROJECTS_MORE.map((project, index) => <li key={project.name}><a href={project.href} target="_blank" rel="noreferrer"><span>{String(index + 6).padStart(2, '0')}</span><strong>{project.label}</strong><small>{project.tech}</small><Arrow /></a></li>)}</ol>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <div className="contact-orbit" aria-hidden="true"><i /><i /><i /></div><p className="section-label">Open channel / 09</p><h2 id="contact-title">Bring me a system worth making <em>alive.</em></h2><p>I’m interested in ambitious product work where strong engineering and a distinct point of view both matter.</p><a className="contact-email" href={`mailto:${CONTACT.email}`}>{CONTACT.email} <Arrow /></a><div className="contact-links"><a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a><a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a><a href={CONTACT.demos} target="_blank" rel="noreferrer">Live demos <Arrow /></a><a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a></div>
        </section>
      </main>

      <footer><span>© 2026 Tejas Ramanujam</span><span>field station online / signal stable</span></footer>
    </>
  );
}
