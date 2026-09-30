/* animations.js — reveal elements on scroll via IntersectionObserver. */
(function () {
  "use strict";

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  var STATIC_SELECTOR = [
    ".hero .eyebrow",
    ".hero h1",
    ".hero .lede",
    ".cta-row .btn",
    ".about-grid .about-copy > *",
    ".about-grid .about-meta",
    ".contact h2",
    ".contact p",
    ".contact-links > li",
  ].join(", ");

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: "0px 0px -40px 0px" }
  );

  function observe(selector, extraClass) {
    document.querySelectorAll(selector).forEach(function (node, index) {
      node.setAttribute("data-animate", "");
      if (extraClass) {
        node.classList.add(extraClass);
      }
      node.style.transitionDelay = index * 0.08 + "s";
      observer.observe(node);
    });
  }

  // Static content exists at first paint.
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", function () {
      observe(STATIC_SELECTOR);
    });
  } else {
    observe(STATIC_SELECTOR);
  }

  // Dynamically injected project cards render after JSON loads.
  // Project cards slide in from the side; skill groups fade up.
  // We defer to a macrotask (setTimeout) so this runs AFTER the
  // portfolio:ready dispatch finishes, at which point projects.js
  // has already injected the .project-list <li> cards.
  function onReady() {
    setTimeout(function () {
      observe(".project-list > li", "slide-from-side");
      observe(".skill-group");
    });
  }
  document.addEventListener("portfolio:ready", onReady);
  if (window.PORTFOLIO_DATA && window.PORTFOLIO_DATA.projects) {
    onReady();
  }
})();