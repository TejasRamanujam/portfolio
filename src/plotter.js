/*
  PLOTTER — a flow-field pen that draws the sheet, live.
  Canvas 2D. Particles advect through a layered-sine angle field and
  leave low-alpha ink strokes that accumulate like a plotter drawing.
  Honest 60fps: capped DPR, fixed particle budget, paused when hidden.
*/

const TAU = Math.PI * 2;

// Cheap organic angle field: layered sines beat real noise for the budget.
function fieldAngle(x, y, t) {
  const s = 0.0016;
  const a =
    Math.sin(x * s * 1.7 + t * 0.00021) +
    Math.cos(y * s * 1.3 - t * 0.00017) +
    Math.sin((x + y) * s * 0.8 + t * 0.00009) +
    Math.cos(Math.hypot(x - 400, y - 300) * s * 0.9 - t * 0.00013);
  return a * 1.15;
}

export function createPlotter(canvas, { reducedMotion = false, scheme = 'day', visibilityTarget = canvas } = {}) {
  const ctx = canvas.getContext('2d', { alpha: true });
  let W = 0;
  let H = 0;
  let dpr = 1;
  let raf = 0;
  let running = false;
  let t = Math.random() * 100000;
  let frame = 0;

  const fine = matchMedia('(pointer: fine)').matches;
  const pointer = { x: -9999, y: -9999, vx: 0, vy: 0, on: false };

  const INK = scheme === 'night' ? 'rgba(235, 232, 218,' : 'rgba(25, 23, 18,';
  const BLUE = 'rgba(216, 65, 12,';
  const PAPER = scheme === 'night' ? 'rgba(10, 25, 43,' : 'rgba(238, 233, 224,';
  let canvasVisible = true;

  let particles = [];

  function spawn(p) {
    p.x = Math.random() * W;
    p.y = Math.random() * H;
    p.life = 120 + Math.random() * 420;
    p.blue = Math.random() < 0.14;
    p.speed = 0.55 + Math.random() * 0.9;
    p.w = 0.5 + Math.random() * 0.7;
    return p;
  }

  function resize() {
    dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    W = canvas.clientWidth;
    H = canvas.clientHeight;
    canvas.width = Math.round(W * dpr);
    canvas.height = Math.round(H * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.lineCap = 'round';
    const count = Math.round(Math.min(280, Math.max(120, (W * H) / 6200)));
    particles = Array.from({ length: count }, () => spawn({}));
    if (reducedMotion) {
      for (let i = 0; i < 700; i++) step(1);
    }
  }

  function step(dt) {
    // Slow fade so the sheet never turns to mud, but strokes linger.
    frame++;
    if (frame % 3 === 0) {
      ctx.fillStyle = PAPER + ' 0.012)';
      ctx.fillRect(0, 0, W, H);
    }

    for (const p of particles) {
      const px = p.x;
      const py = p.y;
      let ang = fieldAngle(p.x, p.y, t);

      // Pointer swirl: the pen bends around the reader's hand.
      if (pointer.on) {
        const dx = p.x - pointer.x;
        const dy = p.y - pointer.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 32400) {
          const d = Math.sqrt(d2) || 1;
          const push = (1 - d / 180) * 2.6;
          p.x += (-dy / d) * push * p.speed;
          p.y += (dx / d) * push * p.speed;
        }
      }

      p.x += Math.cos(ang) * p.speed * dt;
      p.y += Math.sin(ang) * p.speed * dt;
      p.life -= dt;

      if (p.x < -20 || p.x > W + 20 || p.y < -20 || p.y > H + 20 || p.life <= 0) {
        spawn(p);
        continue;
      }

      ctx.strokeStyle = (p.blue ? BLUE : INK) + (p.blue ? ' 0.075)' : ' 0.05)');
      ctx.lineWidth = p.w;
      ctx.beginPath();
      ctx.moveTo(px, py);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();
    }
    t += dt * 16;
  }

  let last = 0;
  function loop(now) {
    if (!running) return;
    const dt = Math.min(2.5, last ? (now - last) / 16.666 : 1);
    last = now;
    step(dt);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running || reducedMotion || document.hidden || !canvasVisible) return;
    running = true;
    last = 0;
    raf = requestAnimationFrame(loop);
  }

  function stop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  function onVisibility() {
    if (document.hidden) stop();
    else start();
  }

  const observer = 'IntersectionObserver' in window
    ? new IntersectionObserver(([entry]) => {
        canvasVisible = entry.isIntersecting;
        if (canvasVisible) start();
        else stop();
      })
    : null;

  function onPointerMove(e) {
    pointer.x = e.clientX;
    pointer.y = e.clientY;
    pointer.on = true;
  }
  function onPointerLeave() {
    pointer.on = false;
  }

  // A deliberate ink burst — used when hovering a project row.
  function burst(x, y) {
    if (reducedMotion) return;
    let n = 0;
    for (const p of particles) {
      if (n >= 26) break;
      if (Math.random() < 0.35) {
        p.x = x + (Math.random() - 0.5) * 60;
        p.y = y + (Math.random() - 0.5) * 24;
        p.life = 60 + Math.random() * 120;
        n++;
      }
    }
  }

  resize();
  window.addEventListener('resize', resize);
  document.addEventListener('visibilitychange', onVisibility);
  observer?.observe(visibilityTarget);
  if (fine) {
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onPointerLeave);
  }

  if (reducedMotion) {
    // resize() plotted a completed static drawing synchronously.
  } else {
    start();
  }

  return {
    burst,
    destroy() {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
      observer?.disconnect();
      if (fine) {
        window.removeEventListener('pointermove', onPointerMove);
        document.documentElement.removeEventListener('pointerleave', onPointerLeave);
      }
    },
  };
}
