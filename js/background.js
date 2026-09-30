/* background.js — subtle canvas particle field behind content. */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var canvas = document.createElement("canvas");
  canvas.id = "bg-canvas";
  document.body.appendChild(canvas);

  var ctx = canvas.getContext("2d");
  var particles = [];
  var count = 60;
  var mouse = { x: null, y: null };

  function init() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  function createParticle() {
    return {
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.35,
      vy: (Math.random() - 0.5) * 0.35,
      size: Math.random() * 1.8 + 0.6,
    };
  }

  function resize() {
    init();
  }

  function loop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (particles.length < count) {
      particles.push(createParticle());
    }

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) p.x = canvas.width;
      if (p.x > canvas.width) p.x = 0;
      if (p.y < 0) p.y = canvas.height;
      if (p.y > canvas.height) p.y = 0;

      // Connect nearby particles with a faint line.
      for (var j = i + 1; j < particles.length; j++) {
        var q = particles[j];
        var dx = p.x - q.x;
        var dy = p.y - q.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 110) {
          var alpha = 1 - dist / 110;
          ctx.strokeStyle = "rgba(79, 156, 249, " + alpha * 0.18 + ")";
          ctx.lineWidth = 0.8;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(q.x, q.y);
          ctx.stroke();
        }
      }

      // Draw the particle, brightening near the cursor.
      var px = p.x;
      var py = p.y;
      if (mouse.x !== null && mouse.y !== null) {
        var mx = p.x - mouse.x;
        var my = p.y - mouse.y;
        var mdist = Math.sqrt(mx * mx + my * my);
        if (mdist < 75) {
          ctx.fillStyle = "rgba(79, 156, 249, 0.55)";
          ctx.shadowBlur = 8;
          ctx.shadowColor = "rgba(79, 156, 249, 0.6)";
          ctx.beginPath();
          ctx.arc(px, py, p.size + 1, 0, Math.PI * 2);
          ctx.fill();
          ctx.shadowBlur = 0;
          continue;
        }
      }

      ctx.fillStyle = "rgba(154, 164, 178, 0.7)";
      ctx.beginPath();
      ctx.arc(px, py, p.size, 0, Math.PI * 2);
      ctx.fill();
    }

    requestAnimationFrame(loop);
  }

  function onMove(e) {
    var rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  }

  function onLeave() {
    mouse.x = null;
    mouse.y = null;
  }

  init();
  window.addEventListener("resize", resize);
  window.addEventListener("mousemove", onMove);
  window.addEventListener("mouseleave", onLeave);
  requestAnimationFrame(loop);
})();