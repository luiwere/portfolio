/* background.js — lightweight constellation particle field with ambient mouse reactivity */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var canvas = document.createElement("canvas");
  canvas.id = "bg-canvas";
  document.body.prepend(canvas);

  var ctx = canvas.getContext("2d");
  if (!ctx) return;

  var particles = [];
  var particleCount = Math.min(Math.floor(window.innerWidth / 25), 55);
  var mouse = { x: null, y: null };
  var animFrameId = null;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 1.5 + 0.8,
      hue: Math.random() > 0.5 ? "59, 130, 246" : "6, 182, 212" // Blue or Cyan
    };
  }

  function init() {
    resize();
    particles = [];
    for (var i = 0; i < particleCount; i++) {
      particles.push(createParticle());
    }
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Connect nearby particles
      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 120) {
          var alpha = (1 - dist / 120) * 0.14;
          ctx.strokeStyle = "rgba(99, 102, 241, " + alpha + ")";
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Proximity glow to cursor
      var pSize = p.size;
      var alpha = 0.45;

      if (mouse.x !== null && mouse.y !== null) {
        var mdx = p.x - mouse.x;
        var mdy = p.y - mouse.y;
        var mdist = Math.sqrt(mdx * mdx + mdy * mdy);

        if (mdist < 100) {
          alpha = 0.9;
          pSize = p.size * 1.4;
          ctx.strokeStyle = "rgba(59, 130, 246, " + (1 - mdist / 100) * 0.35 + ")";
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.stroke();
        }
      }

      ctx.fillStyle = "rgba(" + p.hue + ", " + alpha + ")";
      ctx.beginPath();
      ctx.arc(p.x, p.y, pSize, 0, Math.PI * 2);
      ctx.fill();
    }

    animFrameId = requestAnimationFrame(loop);
  }

  function onMove(e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function onLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  window.addEventListener("resize", function () {
    resize();
  });
  window.addEventListener("mousemove", onMove, { passive: true });
  window.addEventListener("mouseleave", onLeave);

  init();
  loop();
})();