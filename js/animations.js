/* animations.js — smooth scroll reveals & dynamic spotlight hover */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
  );

  function observeAll() {
    var targets = document.querySelectorAll(
      "[data-animate], .hero-content > *, .code-preview-window, .hero-highlights-grid, .about-card-main, .bento-mini-card, .contact-card-box"
    );

    targets.forEach(function (node, index) {
      node.setAttribute("data-animate", "");
      if (!node.style.transitionDelay && !node.classList.contains("no-delay")) {
        node.style.transitionDelay = (index % 5) * 0.08 + "s";
      }
      observer.observe(node);
    });
  }

  // Interactive mouse card spotlight
  function initSpotlight() {
    document.addEventListener("mousemove", function (e) {
      var cards = document.querySelectorAll(".project-card, .bento-mini-card, .skill-group, .contact-item-card");
      cards.forEach(function (card) {
        var rect = card.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        card.style.setProperty("--mouse-x", x + "px");
        card.style.setProperty("--mouse-y", y + "px");
      });
    });
  }

  window.PORTFOLIO_ANIMATE = {
    refresh: function () {
      setTimeout(observeAll, 50);
    }
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      observeAll();
      initSpotlight();
    });
  } else {
    observeAll();
    initSpotlight();
  }

  document.addEventListener("portfolio:ready", function () {
    setTimeout(observeAll, 100);
  });
})();