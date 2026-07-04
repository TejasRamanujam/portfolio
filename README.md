# Tejas Ramanujam — Portfolio

Personal portfolio built as **"The Working Drawing"** — an engineer's drafting sheet brought to life.

**Live:** https://tejas-suminagashi.vercel.app

## Design

- Warm paper, ink black, one ultramarine accent; hairline rules, dimension ticks, section stamps
- Flow-field pen plotter (Canvas 2D) that draws continuously, swirls around the cursor, and fires ink bursts on project hover
- Variable-font typography (Archivo wght 100–900 × wdth 62–125): cursor-reactive kinetic hero, titles that stretch on scroll-in
- Fragment Mono annotations, live Richardson TX clock, crosshair coordinate readout
- Press `G` for the hidden drafting grid

## Stack

Vite + React 18, zero runtime dependencies beyond React. Self-hosted variable fonts. Respects `prefers-reduced-motion` with a static pre-plotted fallback.

## Develop

```bash
npm install
npm run dev    # local dev server
npm run build  # production build → dist/
```
