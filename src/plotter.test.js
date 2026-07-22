import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createPlotter } from './plotter.js';

const originalGlobals = {
  window: globalThis.window,
  document: globalThis.document,
  matchMedia: globalThis.matchMedia,
  IntersectionObserver: globalThis.IntersectionObserver,
  requestAnimationFrame: globalThis.requestAnimationFrame,
  cancelAnimationFrame: globalThis.cancelAnimationFrame,
};

describe('plotter scheduling', () => {
  let documentListeners;
  let observerCallback;
  let context;
  let canvas;

  beforeEach(() => {
    documentListeners = {};
    context = {
      setTransform: vi.fn(), fillRect: vi.fn(), beginPath: vi.fn(), moveTo: vi.fn(),
      lineTo: vi.fn(), stroke: vi.fn(), lineCap: '', fillStyle: '', strokeStyle: '', lineWidth: 0,
    };
    canvas = { clientWidth: 120, clientHeight: 80, getContext: () => context };
    const FakeIntersectionObserver = class {
      constructor(callback) { observerCallback = callback; }
      observe() {}
      disconnect() {}
    };
    globalThis.window = { devicePixelRatio: 1, addEventListener: vi.fn(), removeEventListener: vi.fn(), IntersectionObserver: FakeIntersectionObserver };
    globalThis.document = {
      hidden: false,
      documentElement: { addEventListener: vi.fn(), removeEventListener: vi.fn() },
      addEventListener: vi.fn((name, callback) => { documentListeners[name] = callback; }),
      removeEventListener: vi.fn(),
    };
    globalThis.matchMedia = () => ({ matches: true });
    globalThis.requestAnimationFrame = vi.fn(() => 42);
    globalThis.cancelAnimationFrame = vi.fn();
    globalThis.IntersectionObserver = FakeIntersectionObserver;
  });

  afterEach(() => Object.assign(globalThis, originalGlobals));

  it('draws a completed static field without scheduling animation under reduced motion', () => {
    const plotter = createPlotter(canvas, { reducedMotion: true });
    expect(context.stroke).toHaveBeenCalled();
    expect(requestAnimationFrame).not.toHaveBeenCalled();
    plotter.destroy();
  });

  it('pauses and resumes for viewport and document visibility', () => {
    const plotter = createPlotter(canvas);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(1);
    observerCallback([{ isIntersecting: false }]);
    expect(cancelAnimationFrame).toHaveBeenCalled();
    observerCallback([{ isIntersecting: true }]);
    expect(requestAnimationFrame).toHaveBeenCalledTimes(2);
    document.hidden = true;
    documentListeners.visibilitychange();
    document.hidden = false;
    documentListeners.visibilitychange();
    expect(requestAnimationFrame).toHaveBeenCalledTimes(3);
    plotter.destroy();
  });
});
