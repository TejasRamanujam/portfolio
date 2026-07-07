const GH = 'https://github.com/TejasRamanujam';

export const CONTACT = {
  email: 'tejasrama143@gmail.com',
  phone: '612-978-0228',
  github: GH,
  linkedin: 'https://linkedin.com/in/tejas-ramanujam',
  demos: 'https://tejas-live-demos.vercel.app',
};

export const EDUCATION = {
  school: 'University of Texas at Dallas',
  degree: 'B.S. Software Engineering',
  minor: 'Business Administration',
  period: 'Aug 2023 — May 2027',
  gpa: '3.87',
  location: 'Richardson, TX',
  coursework: ['Artificial Intelligence', 'Data Structures & Algorithms', 'Machine Learning'],
};

export const EXPERIENCE = [
  {
    role: 'AI Intern',
    company: 'Sally Beauty',
    location: 'Plano, TX',
    period: 'Jun 2026 — Current',
    tags: ['Azure', 'FastAPI', 'React', 'Tailwind CSS', 'Playwright', 'Quickbase', 'CI/CD'],
    bullets: [
      'Built a full-stack enterprise platform: provisioned Azure infrastructure (App Service, PostgreSQL, Key Vault), scaffolded the React/Tailwind front end and FastAPI backend, resulting in a 20% faster ERP integration',
      'Engineered a Quickbase extraction pipeline (full load + nightly delta across 5 tables) and set up a CI/CD pipeline with automated Playwright end-to-end tests, cutting deployment cycle time by 30%',
    ],
  },
  {
    role: 'Software Intern',
    company: 'NexRev LLC',
    location: 'Plano, TX',
    period: 'Jun 2024 — Aug 2024',
    tags: ['Python', 'Claude Code', 'Claude API', 'Git'],
    bullets: [
      'Automated OS migration across 600+ devices via Python scripting, cutting manual deployment time by 80%',
      'Built Claude Code–powered Excel macro tool cataloging 100+ hardware assets, improving tracking accuracy by 40%',
    ],
  },
  {
    role: 'Software Assistant',
    company: 'Synergy Sparq',
    location: 'Remote',
    period: 'Oct 2022 — Jan 2023',
    tags: ['Python', 'HTML', 'CSS', 'JavaScript', 'Git'],
    bullets: [
      'Developed Python automation scripts in Agile sprints, reducing manual review cycles by 25%',
      'Audited websites, identifying and resolving 25+ usability and accessibility issues',
    ],
  },
  {
    role: 'Cloud Researcher',
    company: 'Bytepoint Consulting LLC',
    location: 'Frisco, TX',
    period: 'May 2021 — Jun 2023',
    tags: ['Python', 'JavaScript', 'Java', 'AWS', 'SQL'],
    bullets: [
      'Researched AWS cloud topics to support creation of an online development course',
      'Developed 4+ introductory labs in Python and JavaScript for beginners',
    ],
  },
];

/* Five live demos — each links to its deployed URL. */
export const PROJECTS_FEATURED = [
  {
    name: 'working-drawing',
    label: 'The Working Drawing — This Site',
    type: 'Portfolio',
    highlight: 'YOU ARE HERE — SOURCE ON GITHUB',
    tech: ['React', 'Vite', 'Canvas 2D', 'Variable Fonts'],
    desc: 'Portfolio as a live drafting sheet: flow-field plotter drawing the background, variable-type kinetics, zero UI dependencies.',
    href: `${GH}/portfolio`,
    period: 'LIVE',
  },
  {
    name: 'connection',
    label: 'Connection — AI Voice Assistant',
    type: 'AI / Voice',
    highlight: 'LIVE — SPEECH IN, SPEECH OUT',
    tech: ['Next.js', 'Gemini', 'Web Speech API', 'WebGL'],
    desc: 'Voice assistant: speech recognition in, Gemini reasoning, synthesized speech out — visualized as a WebGL shader orb.',
    href: 'https://tejas-voice-assistant.vercel.app',
    period: 'LIVE',
  },
  {
    name: 'neuron',
    label: 'Neuron — Project Database',
    type: 'Full Stack',
    highlight: 'LIVE — 18 PROJECTS CATALOGUED',
    tech: ['FastAPI', 'TypeScript', 'SQLAlchemy', 'Neon'],
    desc: 'PMO-style database of 18 CS projects with keyword search, tag filtering, and difficulty categorization via RESTful API.',
    href: 'https://tejas-project-database.vercel.app',
    period: 'LIVE',
  },
  {
    name: 'neurosurge',
    label: 'Neurosurge — Second Brain',
    type: 'Full Stack',
    highlight: 'LIVE — NOTES AS A GRAPH',
    tech: ['React', 'FastAPI', 'Neon', 'Force Graph'],
    desc: 'Second brain for linked notes, rendered as an interactive force-directed knowledge graph.',
    href: 'https://tejas-neurosurge.vercel.app',
    period: 'LIVE',
  },
  {
    name: 'scribbly',
    label: 'Scribbly — Persistent Whiteboard',
    type: 'Full Stack',
    highlight: 'LIVE — DRAWINGS THAT SURVIVE REFRESH',
    tech: ['React', 'Canvas', 'FastAPI', 'Neon'],
    desc: 'Persistent whiteboard: freehand canvas drawing with boards saved server-side, so nothing is lost on refresh.',
    href: 'https://tejas-whiteboard.vercel.app',
    period: 'LIVE',
  },
];

export const PROJECTS_MORE = [
  { name: 'enterprise-ai-ops-hub', label: 'Enterprise AI Ops Hub', tech: 'LangGraph · Kubernetes', href: `${GH}/enterprise-ai-ops-hub` },
  { name: 'Prophecy', label: 'Prophecy — AI Risk Assessor', tech: 'LightGBM · HackUTD XI', href: GH },
  { name: 'SentimentAnalysis', label: 'NLP Sentiment Analysis', tech: 'PyTorch · GloVe', href: `${GH}/SentimentAnalysis` },
  { name: 'multi-agent-workflow-engine', label: 'Multi-Agent Workflow Engine', tech: 'TypeScript · LangChain', href: `${GH}/multi-agent-workflow-engine` },
  { name: 'ai-code-review-pipeline', label: 'AI Code Review Pipeline', tech: 'Python · Claude API', href: `${GH}/ai-code-review-pipeline` },
  { name: 'real-time-dashboard-builder', label: 'Real-time Dashboard Builder', tech: 'TypeScript · WebSockets', href: `${GH}/real-time-dashboard-builder` },
  { name: 'infrastructure-cost-optimizer', label: 'Infrastructure Cost Optimizer', tech: 'Python · AWS', href: `${GH}/infrastructure-cost-optimizer` },
  { name: 'Spot-Weakness', label: 'Spot Weakness', tech: 'Python · LightGBM', href: `${GH}/Spot-Weakness` },
  { name: 'Fools-Gold', label: "Fool's Gold", tech: 'C# · C++', href: `${GH}/Fools-Gold` },
  { name: '3354-Team10', label: 'Banking App', tech: 'Java · PostgreSQL', href: `${GH}/3354-Team10` },
  { name: 'axxess_app', label: 'Axxess App', tech: 'C++ · Swift', href: `${GH}/axxess_app` },
];

/*
  Skills, resume taxonomy. Each skill carries refs — the builds (or roles)
  where it was actually used — plotted in the legend when selected.
  A ref without an href renders as plain annotation text.
*/
const R = (label, href = null) => ({ label, href });

const REF = {
  portfolio: R('The Working Drawing — this site', `${GH}/portfolio`),
  connection: R('Connection — voice assistant', 'https://tejas-voice-assistant.vercel.app'),
  neuron: R('Neuron — project database', 'https://tejas-project-database.vercel.app'),
  neurosurge: R('Neurosurge — second brain', 'https://tejas-neurosurge.vercel.app'),
  scribbly: R('Scribbly — whiteboard', 'https://tejas-whiteboard.vercel.app'),
  aiops: R('Enterprise AI Ops Hub', `${GH}/enterprise-ai-ops-hub`),
  prophecy: R('Prophecy — AI risk assessor', GH),
  sentiment: R('NLP Sentiment Analysis', `${GH}/SentimentAnalysis`),
  mawe: R('Multi-Agent Workflow Engine', `${GH}/multi-agent-workflow-engine`),
  codereview: R('AI Code Review Pipeline', `${GH}/ai-code-review-pipeline`),
  dashboard: R('Real-time Dashboard Builder', `${GH}/real-time-dashboard-builder`),
  costopt: R('Infrastructure Cost Optimizer', `${GH}/infrastructure-cost-optimizer`),
  spotweak: R('Spot Weakness', `${GH}/Spot-Weakness`),
  foolsgold: R("Fool's Gold", `${GH}/Fools-Gold`),
  banking: R('Banking App', `${GH}/3354-Team10`),
  axxess: R('Axxess App', `${GH}/axxess_app`),
  sally: R('Sally Beauty — enterprise ERP platform'),
  sallyci: R('Sally Beauty — CI/CD + e2e test suite'),
  nexrev: R('NexRev — asset inventory tool'),
  bytepoint: R('Bytepoint — intro coding labs'),
};

export const SKILLS = [
  {
    label: 'AI / LLM',
    items: [
      { name: 'Claude API', refs: [REF.codereview, REF.nexrev] },
      { name: 'Claude Code', refs: [REF.portfolio, REF.nexrev] },
      { name: 'LangChain', refs: [REF.neuron, REF.mawe] },
      { name: 'OpenAI API', refs: [REF.neuron, REF.mawe] },
      { name: 'Gemini', refs: [REF.connection] },
      { name: 'PyTorch (FFNN, RNN)', refs: [REF.sentiment] },
      { name: 'LightGBM', refs: [REF.prophecy, REF.spotweak] },
      { name: 'NLP / Sentiment Analysis', refs: [REF.sentiment] },
    ],
  },
  {
    label: 'Backend & APIs',
    items: [
      { name: 'FastAPI', refs: [REF.neuron, REF.neurosurge, REF.scribbly, REF.sally] },
      { name: 'Python', refs: [REF.codereview, REF.sentiment, REF.costopt, REF.spotweak] },
      { name: 'RESTful API Design', refs: [REF.neuron, REF.sally] },
      { name: 'PostgreSQL', refs: [REF.aiops, REF.prophecy, REF.banking, REF.sally] },
      { name: 'SQLite', refs: [] },
      { name: 'SQLAlchemy', refs: [REF.neuron] },
      { name: 'Docker', refs: [REF.aiops, REF.codereview] },
    ],
  },
  {
    label: 'Frontend & Tools',
    items: [
      { name: 'React', refs: [REF.portfolio, REF.neurosurge, REF.scribbly, REF.sally] },
      { name: 'TypeScript', refs: [REF.neuron, REF.mawe, REF.dashboard] },
      { name: 'Playwright', refs: [REF.sallyci] },
      { name: 'HTML', refs: [] },
      { name: 'Tailwind CSS', refs: [REF.sally] },
      { name: 'Next.js', refs: [REF.connection] },
      { name: 'Git', refs: [] },
      { name: 'VS Code', refs: [] },
    ],
  },
  {
    label: 'Languages',
    items: [
      { name: 'Python', refs: [REF.codereview, REF.sentiment, REF.costopt] },
      { name: 'Java', refs: [REF.banking] },
      { name: 'Go', refs: [] },
      { name: 'C++', refs: [REF.foolsgold, REF.axxess] },
      { name: 'SQL', refs: [REF.banking, REF.neuron] },
      { name: 'TypeScript', refs: [REF.neuron, REF.mawe, REF.dashboard] },
      { name: 'C', refs: [] },
      { name: 'Swift', refs: [REF.axxess] },
      { name: 'JavaScript', refs: [REF.bytepoint, REF.dashboard] },
    ],
  },
];
