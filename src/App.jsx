import { CONTACT, EDUCATION, EXPERIENCE, PROJECTS_FEATURED, PROJECTS_MORE, SKILLS } from './data.js';

const projectScenes = {
  'working-drawing': '/images/field-guide-portfolio.webp',
  connection: '/images/field-guide-connection.webp',
  neuron: '/images/field-guide-neuron.webp',
  neurosurge: '/images/field-guide-neurosurge.webp',
  scribbly: '/images/field-guide-scribbly.webp',
};

const projectCtas = {
  'working-drawing': 'Explore this field guide',
  connection: 'Start talking',
  neuron: 'Search the archive',
  neurosurge: 'Open the atlas',
  scribbly: 'Draw together',
};

const projectAlts = {
  'working-drawing': 'A small cream-colored spirit drawing a flowing path of petals and stars across an unfurling paper sheet',
  connection: 'Two small spirits communicating through a flower-shaped speaking trumpet beneath cherry blossoms',
  neuron: 'A small spirit organizing illustrated project cards inside a cabinet built into a flowering tree',
  neurosurge: 'A small spirit reading beneath a glowing network of linked notes, flowers, and petals',
  scribbly: 'Two small spirits drawing together with pink and blue crayons on one shared sheet',
};

function Arrow() {
  return <span aria-hidden="true">↗</span>;
}

function ProjectSpecimen({ project, index }) {
  return (
    <article className={`specimen${index % 2 ? ' specimen--reverse' : ''}`}>
      <div className="specimen-art">
        <img
          src={projectScenes[project.name]}
          alt={projectAlts[project.name]}
          width="1254"
          height="1254"
          loading="lazy"
        />
        <span className="specimen-figure">fig. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <div className="specimen-copy">
        <p className="specimen-label">Specimen {String(index + 1).padStart(2, '0')} · {project.type} <i>● live</i></p>
        <p className="specimen-name">{project.label}</p>
        <h3>{project.headline}</h3>
        <p className="specimen-description">{project.desc}</p>
        <ul className="specimen-tags" aria-label={`${project.label} technologies`}>
          {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
        </ul>
        <div className="specimen-actions">
          <a className="button button--brown" href={project.href} target="_blank" rel="noreferrer">
            {projectCtas[project.name]} <Arrow />
          </a>
          <a className="soft-link" href={project.source} target="_blank" rel="noreferrer">
            inspect source <Arrow />
          </a>
        </div>
      </div>
    </article>
  );
}

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>

      <header className="site-header">
        <a className="brand" href="#top" aria-label="Tejas Ramanujam, back to top">tejas<span>✿</span></a>
        <nav aria-label="Primary navigation">
          <a href="#about">about</a>
          <a href="#work">work</a>
          <a href="#experience">experience</a>
        </nav>
        <a className="hello-link" href={`mailto:${CONTACT.email}`}><i /> say hello</a>
      </header>

      <main id="main">
        <section className="hero" id="top" aria-labelledby="hero-title">
          <img
            className="hero-scene"
            src="/images/field-guide-hero.webp"
            alt="Five small software spirits exploring voice, archives, connected notes, drawing, and code beneath a blossoming tree"
            width="1672"
            height="941"
            fetchpriority="high"
          />
          <div className="hero-copy">
            <p className="eyebrow">✦ software engineering · AI · full stack</p>
            <h1 id="hero-title">A field guide to <em>living software.</em></h1>
            <p className="hero-intro">
              Hi, I’m Tejas. I build thoughtful AI systems and full-stack products—and give the complicated parts enough care that people actually want to use them.
            </p>
            <div className="hero-actions">
              <a className="button button--pink" href="#work">Meet the specimens <span aria-hidden="true">↓</span></a>
              <a className="soft-link" href="/resume.pdf" target="_blank" rel="noreferrer">résumé <Arrow /></a>
            </div>
            <p className="hero-note"><span>5</span> curious systems, awake and running</p>
          </div>
          <div className="petal petal--one" aria-hidden="true" />
          <div className="petal petal--two" aria-hidden="true" />
          <div className="petal petal--three" aria-hidden="true" />
        </section>

        <section className="about" id="about" aria-labelledby="about-title">
          <p className="section-label">01 / a small philosophy</p>
          <div className="about-grid">
            <h2 id="about-title">Useful can still feel <em>wonderful.</em></h2>
            <div className="about-copy">
              <p>
                I’m interested in the tender little moment when a hard technical system stops feeling hard: when an AI explains what it did, an archive helps you find the right idea, or a shared canvas simply remembers.
              </p>
              <p>
                So I work across the stack—models, APIs, interfaces, infrastructure—and keep asking the same question: <strong>could this feel better?</strong>
              </p>
            </div>
          </div>
          <dl className="stats">
            <div><dt>5</dt><dd>live builds</dd></div>
            <div><dt>600+</dt><dd>devices automated</dd></div>
            <div><dt>{EDUCATION.gpa}</dt><dd>UT Dallas GPA</dd></div>
            <div><dt>’27</dt><dd>software engineering</dd></div>
          </dl>
        </section>

        <section className="work" id="work" aria-labelledby="work-title">
          <div className="work-intro">
            <p className="section-label">02 / selected work</p>
            <h2 id="work-title">Five <em>living machines.</em></h2>
            <p>Each one has its own temperament. Every one is real software you can open, use, and inspect.</p>
          </div>
          <div className="specimens">
            {PROJECTS_FEATURED.map((project, index) => (
              <ProjectSpecimen project={project} index={index} key={project.name} />
            ))}
          </div>
          <a className="catalogue" href={CONTACT.demos} target="_blank" rel="noreferrer">
            <span><small>the complete specimen index</small>Enter the live-software catalogue</span>
            <strong>draw on it · search it · talk to it</strong>
            <Arrow />
          </a>
        </section>

        <section className="experience" id="experience" aria-labelledby="experience-title">
          <div className="experience-heading">
            <p className="section-label">03 / where the work met the world</p>
            <h2 id="experience-title">A few places I’ve made things <em>real.</em></h2>
            <p>Production constraints, waiting users, measurable results—the useful kind of pressure.</p>
            <a className="soft-link" href="/resume.pdf" target="_blank" rel="noreferrer">download the full résumé <Arrow /></a>
          </div>
          <div className="experience-list">
            {EXPERIENCE.map((item, index) => (
              <article key={item.company}>
                <span className="experience-number">0{index + 1}</span>
                <div>
                  <p className="experience-date">{item.period} · {item.location}</p>
                  <h3>{item.role}</h3>
                  <p className="experience-company">{item.company}</p>
                  <p className="experience-result">{item.bullets[0]}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="toolkit" aria-labelledby="toolkit-title">
          <div className="toolkit-heading">
            <p className="section-label">04 / things in my pockets</p>
            <h2 id="toolkit-title">The tools change. The care <em>doesn’t.</em></h2>
          </div>
          <div className="tool-groups">
            {SKILLS.map((group, index) => (
              <article key={group.label} className={`tool-group tool-group--${index + 1}`}>
                <span>0{index + 1}</span>
                <h3>{group.label}</h3>
                <ul>{group.items.map((item) => <li key={item.name}>{item.name}</li>)}</ul>
              </article>
            ))}
          </div>
        </section>

        <section className="archive" aria-labelledby="archive-title">
          <div className="archive-heading">
            <p className="section-label">05 / more from the notebook</p>
            <h2 id="archive-title">The side paths are often <em>interesting.</em></h2>
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

        <section className="contact" aria-labelledby="contact-title">
          <div className="contact-flower" aria-hidden="true">✿</div>
          <p className="section-label">06 / the gate is open</p>
          <h2 id="contact-title">Have something curious in <em>mind?</em></h2>
          <p>I’m always happy to talk about ambitious products, strange systems, or a good idea that deserves to become real.</p>
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
        <span>drawn with curiosity · built with care</span>
      </footer>
    </>
  );
}
