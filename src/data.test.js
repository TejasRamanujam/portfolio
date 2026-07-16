import { describe, expect, it } from 'vitest';
import { PROJECTS_FEATURED } from './data';

describe('featured project proof', () => {
  it('gives every external demo a live URL and source repository', () => {
    for (const project of PROJECTS_FEATURED) {
      expect(project.href).toMatch(/^https:\/\//);
      expect(project.source).toMatch(/^https:\/\/github\.com\/TejasRamanujam\//);
    }
  });

  it('keeps the Neuron catalogue count current', () => {
    const neuron = PROJECTS_FEATURED.find((project) => project.name === 'neuron');
    expect(neuron.highlight).toContain('24 PROJECTS');
    expect(neuron.desc).toContain('24 CS projects');
  });
});
