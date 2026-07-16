import { CONTACT, EDUCATION, EXPERIENCE, PROJECTS_FEATURED, PROJECTS_MORE, SKILLS } from './data.js';

const projectCtas = {
  'working-drawing': 'Visit the portfolio',
  connection: 'Start talking',
  neuron: 'Search the archive',
  neurosurge: 'Open the atlas',
  scribbly: 'Draw together',
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectArtwork({ name, label }) {
  return (
    <figure className={`machine-art machine-art--${name}`} aria-label={`${label} visual`}>
      {name === 'working-drawing' && (
        <svg viewBox="0 0 620 440" role="img">
          <path className="art-line art-line--soft" d="M-20 345C112 84 220 478 358 174S548 82 678 276" />
          <path className="art-line" d="M-20 302C110 54 234 432 362 146S542 48 678 234" />
          <path className="art-line art-line--accent" d="M-20 390C124 122 238 512 382 204S562 118 678 318" />
          <circle className="art-dot" cx="388" cy="198" r="13" />
          <circle className="art-orbit" cx="388" cy="198" r="50" />
        </svg>
      )}
      {name === 'connection' && (
        <svg viewBox="0 0 620 440" role="img">
          <circle className="orb orb--outer" cx="310" cy="220" r="142" />
          <circle className="orb orb--middle" cx="310" cy="220" r="101" />
          <circle className="orb orb--core" cx="310" cy="220" r="61" />
          <path className="wave" d="M76 220H148L175 170L211 290L249 134L287 220H335L366 174L401 277L441 190L471 220H544" />
        </svg>
      )}
      {name === 'neuron' && (
        <div className="archive-stack" aria-hidden="true">
          <div className="archive-card archive-card--back"><span>24</span></div>
          <div className="archive-card archive-card--middle"><i /><i /><i /></div>
          <div className="archive-card archive-card--front">
            <b>Find your next build</b>
            <span className="archive-search">Search the archive…</span>
            <div><i>AI</i><i>Web</i><i>Data</i></div>
          </div>
        </div>
      )}
      {name === 'neurosurge' && (
        <svg viewBox="0 0 620 440" role="img">
          <g className="graph-lines">
            <path d="M118 279L201 135L305 220L414 102L508 255L382 337L305 220L188 342L118 279Z" />
            <path d="M201 135L414 102M188 342L382 337M118 279L305 220L508 255" />
          </g>
          {[[118,279],[201,135],[305,220],[414,102],[508,255],[382,337],[188,342]].map(([cx, cy], index) => (
            <circle className={index === 2 ? 'graph-node graph-node--hero' : 'graph-node'} key={`${cx}-${cy}`} cx={cx} cy={cy} r={index === 2 ? 24 : 14} />
          ))}
        </svg>
      )}
      {name === 'scribbly' && (
        <svg viewBox="0 0 620 440" role="img">
          <path className="scribble scribble--one" d="M71 302C129 76 222 383 297 174S444 78 535 274" />
          <path className="scribble scribble--two" d="M101 113C174 195 198 65 263 119S360 217 418 143S488 113 529 165" />
          <g className="cursor cursor--one"><path d="M170 245l17 42 9-17 18-8z" /><circle cx="224" cy="267" r="10" /></g>
          <g className="cursor cursor--two"><path d="M430 108l17 42 9-17 18-8z" /><circle cx="485" cy="130" r="10" /></g>
        </svg>
      )}
      <figcaption>{label}</figcaption>
    </figure>
  );
}

function ProjectCard({ project, index }) {
  return (
    <article className={`machine machine--${project.name}${index % 2 ? ' machine--reverse' : ''}`}>
      <ProjectArtwork name={project.name} label={project.label} />
      <div className="machine-copy">
        <div className="machine-meta">
          <span>0{index + 1}</span>
          <span>{project.type}</span>
          <span className="live-dot">Live</span>
        </div>
        <p className="machine-name">{project.label}</p>
        <h3>{project.headline}</h3>
        <p className="machine-description">{project.desc}</p>
        <ul className="machine-tags" aria-label={`${project.label} technologies`}>
          {project.tech.map((item) => <li key={item}>{item}</li>)}
        </ul>
        <div className="machine-actions">
          <a className="button button--dark" href={project.href} target="_blank" rel="noreferrer">
            {projectCtas[project.name]} <Arrow />
          </a>
          <a className="text-link" href={project.source} target="_blank" rel="noreferrer">
            View source <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-nav">
        <a className="wordmark" href="#top" aria-label="Tejas Ramanujam, back to top">
          <span>tejas</span><i>r.</i>
        </a>
        <nav aria-label="Primary navigation">
          <a href="#work">Work</a>
          <a href="#experience">Experience</a>
          <a href="#about">About</a>
        </nav>
        <a className="nav-hello" href={`mailto:${CONTACT.email}`}>
          Say hello <span aria-hidden="true">●</span>
        </a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span>✦</span> Software engineer · systems maker</p>
            <h1 id="hero-title">I make intelligent systems feel <em>alive.</em></h1>
            <p className="hero-intro">
              I’m Tejas—an engineer who turns ambitious AI ideas into thoughtful products people can talk to, explore, and use together.
            </p>
            <div className="hero-actions">
              <a className="button button--coral" href="#work">Meet the machines <span aria-hidden="true">↓</span></a>
              <a className="text-link text-link--light" href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
            </div>
            <div className="hero-availability">
              <span className="pulse" aria-hidden="true" />
              <span>Building in Richardson, Texas</span>
            </div>
          </div>

          <div className="hero-art-wrap">
            <div className="hero-art-halo" aria-hidden="true" />
            <img
              className="hero-art"
              src="/images/midnight-workshop-hero.webp"
              alt="A clay-style robot tending five small software machines in a midnight observatory workshop"
              width="1616"
              height="977"
              fetchPriority="high"
            />
            <span className="orbit-label orbit-label--one">AI</span>
            <span className="orbit-label orbit-label--two">VOICE</span>
            <span className="orbit-label orbit-label--three">CANVAS</span>
          </div>
        </section>

        <section className="story" id="about" aria-labelledby="story-title">
          <div className="section-kicker">01 · A small thesis</div>
          <div className="story-grid">
            <h2 id="story-title">Software should do more than work. It should invite you <em>in.</em></h2>
            <div className="story-copy">
              <p>
                From a voice assistant that shows its reasoning to a whiteboard that remembers every stroke, I care about the moment a complicated system becomes clear, useful, and a little delightful.
              </p>
              <p>
                I work across the stack—AI pipelines, APIs, interfaces, infrastructure—and stay close enough to the product to feel where it can be better.
              </p>
            </div>
          </div>
          <dl className="story-stats">
            <div><dt>5</dt><dd>live systems</dd></div>
            <div><dt>600+</dt><dd>devices automated</dd></div>
            <div><dt>{EDUCATION.gpa}</dt><dd>UT Dallas GPA</dd></div>
            <div><dt>’27</dt><dd>software engineering</dd></div>
          </dl>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="work-heading">
            <div>
              <p className="section-kicker section-kicker--light">02 · Selected work</p>
              <h2 id="work-title">Five <em>living</em> machines.</h2>
            </div>
            <p>Not mockups. Not screenshots. Five pieces of software you can use right now.</p>
          </div>
          <div className="machines">
            {PROJECTS_FEATURED.map((project, index) => (
              <ProjectCard project={project} index={index} key={project.name} />
            ))}
          </div>
          <a className="catalogue-link" href={CONTACT.demos} target="_blank" rel="noreferrer">
            <span>Enter the complete live catalogue</span>
            <small>Draw on it · search it · talk to it</small>
            <Arrow />
          </a>
        </section>

        <section className="experience" id="experience" aria-labelledby="experience-title">
          <div className="experience-intro">
            <p className="section-kicker">03 · Along the way</p>
            <h2 id="experience-title">Field notes from the <em>real world.</em></h2>
            <p>I like shipping software where the constraints are real, the users are waiting, and the results can be measured.</p>
            <a className="text-link" href="/resume.pdf" target="_blank" rel="noreferrer">Download the full résumé <Arrow /></a>
          </div>
          <div className="timeline">
            {EXPERIENCE.map((item, index) => (
              <article className="timeline-item" key={item.company}>
                <span className="timeline-no">0{index + 1}</span>
                <div>
                  <p className="timeline-period">{item.period} · {item.location}</p>
                  <h3>{item.role}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <p className="timeline-result">{item.bullets[0]}</p>
                  <ul>{item.tags.slice(0, 4).map((tag) => <li key={tag}>{tag}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="toolkit" aria-labelledby="toolkit-title">
          <div className="toolkit-heading">
            <p className="section-kicker section-kicker--light">04 · The parts shelf</p>
            <h2 id="toolkit-title">Tools I reach for.</h2>
            <p>The technology changes. The goal stays the same: make the system understandable and make the experience feel considered.</p>
          </div>
          <div className="tool-shelves">
            {SKILLS.map((group, index) => (
              <article className={`tool-shelf tool-shelf--${index + 1}`} key={group.label}>
                <span>0{index + 1}</span>
                <h3>{group.label}</h3>
                <ul>{group.items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="archive" aria-labelledby="archive-title">
          <div>
            <p className="section-kicker">05 · More experiments</p>
            <h2 id="archive-title">The workbench is rarely empty.</h2>
          </div>
          <ol>
            {PROJECTS_MORE.map((project, index) => (
              <li key={project.name}>
                <a href={project.href} target="_blank" rel="noreferrer">
                  <span>{String(index + 6).padStart(2, '0')}</span>
                  <strong>{project.label}</strong>
                  <small>{project.tech}</small>
                  <Arrow />
                </a>
              </li>
            ))}
          </ol>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-title">
          <p className="section-kicker">06 · The door is open</p>
          <h2 id="contact-title">Let’s make something unexpectedly <em>useful.</em></h2>
          <p>Have an ambitious product, an unruly system, or simply a good question?</p>
          <a className="contact-email" href={`mailto:${CONTACT.email}`}>{CONTACT.email} <Arrow /></a>
          <div className="contact-links">
            <a href={CONTACT.github} target="_blank" rel="noreferrer">GitHub <Arrow /></a>
            <a href={CONTACT.linkedin} target="_blank" rel="noreferrer">LinkedIn <Arrow /></a>
            <a href={CONTACT.demos} target="_blank" rel="noreferrer">Live demos <Arrow /></a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer">Résumé <Arrow /></a>
          </div>
        </section>
      </main>

      <footer>
        <span>© 2026 Tejas Ramanujam</span>
        <span>Designed and built with curiosity.</span>
      </footer>
    </>
  );
}

export default App;
