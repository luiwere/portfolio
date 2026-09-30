/* js/main.js — mobile nav toggle, scrollspy, copy email toast, footer year */
(function () {
  "use strict";

  // Dynamic Year in footer
  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  // Header scroll state
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  window.addEventListener("scroll", onScrollHeader, { passive: true });
  onScrollHeader();

  // Mobile Navigation Drawer Toggle
  var navToggle = document.querySelector(".mobile-nav-toggle");
  var primaryNav = document.querySelector(".primary-nav");

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isExpanded = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", !isExpanded);
      primaryNav.classList.toggle("is-open");
    });

    // Close mobile nav when clicking a link
    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        primaryNav.classList.remove("is-open");
        if (navToggle) navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // ScrollSpy for Active Navigation Link
  var sections = document.querySelectorAll("section[id]");
  var navLinks = document.querySelectorAll(".primary-nav a[href^='#']");

  function onScrollSpy() {
    var scrollY = window.pageYOffset;

    sections.forEach(function (current) {
      var sectionHeight = current.offsetHeight;
      var sectionTop = current.offsetTop - 120;
      var sectionId = current.getAttribute("id");

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(function (link) {
          if (link.getAttribute("href") === "#" + sectionId) {
            link.classList.add("active");
          } else {
            link.classList.remove("active");
          }
        });
      }
    });
  }
  window.addEventListener("scroll", onScrollSpy, { passive: true });

  // Copy Email to Clipboard with Toast Notification
  var copyEmailBtn = document.getElementById("copy-email-btn");
  var toast = document.getElementById("toast");

  function showToast(msg) {
    if (!toast) return;
    toast.querySelector(".toast-msg").textContent = msg;
    toast.classList.add("show");
    setTimeout(function () {
      toast.classList.remove("show");
    }, 3200);
  }

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", function () {
      var email = "luiwere@gmail.com";
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(
          function () {
            showToast("Copied luiwere@gmail.com to clipboard!");
          },
          function () {
            showToast("luiwere@gmail.com");
          }
        );
      } else {
        // Fallback for older browsers
        var textarea = document.createElement("textarea");
        textarea.value = email;
        document.body.appendChild(textarea);
        textarea.select();
        try {
          document.execCommand("copy");
          showToast("Copied luiwere@gmail.com to clipboard!");
        } catch (err) {
          showToast("luiwere@gmail.com");
        }
        document.body.removeChild(textarea);
      }
    });
  }
})();