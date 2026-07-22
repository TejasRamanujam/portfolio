import { describe, expect, it } from 'vitest';
import { CASE_STUDIES } from './caseStudies.js';
import { PROJECTS_FEATURED, PROJECTS_MORE } from './data.js';

describe('portfolio content integrity', () => {
  it('uses the verified Prophecy Devpost destination', () => {
    const prophecy = PROJECTS_MORE.find((project) => project.name === 'Prophecy');
    expect(prophecy.href).toBe('https://devpost.com/software/proficie');
  });

  it('does not publish the stale Neuron count', () => {
    const neuron = PROJECTS_FEATURED.find((project) => project.name === 'neuron');
    expect(`${neuron.highlight} ${neuron.desc}`).not.toMatch(/\b18\b/);
  });

  it('has a sourced detail sheet for every featured project', () => {
    expect(Object.keys(CASE_STUDIES).sort()).toEqual(PROJECTS_FEATURED.map((project) => project.name).sort());
    Object.values(CASE_STUDIES).forEach((study) => {
      expect(study.problem.length).toBeGreaterThan(80);
      expect(study.decisions).toHaveLength(4);
      expect(study.live).toMatch(/^https:\/\//);
      expect(study.repo).toMatch(/^https:\/\//);
      expect(JSON.stringify(study)).not.toContain('TODO(user)');
    });
  });
});
