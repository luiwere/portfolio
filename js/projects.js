/* js/projects.js — renders project cards with category filtering, browser frames, and hover spotlights */
(function () {
  "use strict";

  var listEl = document.getElementById("project-list");
  var filterContainer = document.getElementById("project-filters");
  if (!listEl) return;

  var currentCategory = "all";

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderFilters(projects) {
    if (!filterContainer) return;

    var counts = {
      all: projects.length,
      backend: 0,
      fullstack: 0,
    };

    projects.forEach(function (p) {
      var cat = (p.category || "").toLowerCase();
      if (cat.indexOf("backend") !== -1) counts.backend++;
      if (cat.indexOf("fullstack") !== -1 || cat.indexOf("frontend") !== -1) counts.fullstack++;
    });

    var filters = [
      { id: "all", label: "All Projects", count: counts.all },
      { id: "backend", label: "Backend & Systems", count: counts.backend },
      { id: "fullstack", label: "Full-Stack Web", count: counts.fullstack },
    ];

    var html = filters
      .map(function (f) {
        var activeClass = f.id === currentCategory ? " active" : "";
        return (
          '<button class="filter-btn' +
          activeClass +
          '" data-filter="' +
          f.id +
          '">' +
          f.label +
          ' <span class="filter-count">' +
          f.count +
          "</span>" +
          "</button>"
        );
      })
      .join("");

    filterContainer.innerHTML = html;

    // Attach click listeners to filter buttons
    filterContainer.querySelectorAll(".filter-btn").forEach(function (btn) {
      btn.addEventListener("click", function () {
        currentCategory = btn.getAttribute("data-filter");
        filterContainer.querySelectorAll(".filter-btn").forEach(function (b) {
          b.classList.toggle("active", b === btn);
        });
        renderProjects(projects);
      });
    });
  }

  function renderProjects(projects) {
    if (!Array.isArray(projects) || projects.length === 0) {
      listEl.innerHTML =
        '<li class="empty-state">No projects found.</li>';
      return;
    }

    var filtered = projects.filter(function (project) {
      if (currentCategory === "all") return true;
      var cat = (project.category || "").toLowerCase();
      return cat.indexOf(currentCategory) !== -1;
    });

    if (filtered.length === 0) {
      listEl.innerHTML =
        '<li class="empty-state">No projects found in this category.</li>';
      return;
    }

    var items = filtered.map(function (project) {
      var screenshot = project.screenshot
        ? '<div class="project-thumb"><img src="' +
          escapeHtml(project.screenshot) +
          '" alt="' +
          escapeHtml(project.title) +
          ' preview" loading="lazy" onerror="this.parentElement.classList.add(\'is-empty\');this.parentElement.innerHTML=\'&lt;/&gt; ' + escapeHtml(project.title) + '\';" /></div>'
        : '<div class="project-thumb is-empty">&lt;/&gt; ' + escapeHtml(project.title) + '</div>';

      var badgeClass = project.category === "backend" ? "badge-backend" : "badge-fullstack";
      var badgeText = project.badge || (project.category === "backend" ? "Backend System" : "Full-Stack App");

      var links = [];
      if (project.demo) {
        links.push(
          '<a href="' +
            escapeHtml(project.demo) +
            '" class="project-btn project-btn-primary" target="_blank" rel="noopener">' +
            '<span>Live Demo</span>' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>' +
            '</a>'
        );
      }
      if (project.repo) {
        links.push(
          '<a href="' +
            escapeHtml(project.repo) +
            '" class="project-btn project-btn-outline" target="_blank" rel="noopener">' +
            '<span>Source Code</span>' +
            '<svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor"><path d="M12 .5C5.4.5 0 5.9 0 12.5c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7 0-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.6-.3-5.3-1.3-5.3-5.7 0-1.3.5-2.3 1.2-3.1-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0C17.3 4.7 18.3 5 18.3 5c.6 1.6.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.7 5.4-5.3 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6 4.8-1.6 8.2-6.1 8.2-11.4C24 5.9 18.6.5 12 .5z"/></svg>' +
            '</a>'
        );
      }

      var stack = Array.isArray(project.stack)
        ? project.stack
            .map(function (t) {
              return '<span class="tag">' + escapeHtml(t) + "</span>";
            })
            .join("")
        : "";

      var insights = "";
      if (project.problem || project.learned) {
        insights =
          '<div class="project-insights">' +
          (project.problem
            ? '<div class="insight-box insight-problem"><strong>Problem Solved</strong>' +
              escapeHtml(project.problem) +
              "</div>"
            : "") +
          (project.learned
            ? '<div class="insight-box insight-learned"><strong>Architecture & Lessons</strong>' +
              escapeHtml(project.learned) +
              "</div>"
            : "") +
          "</div>";
      }

      return (
        '<li class="project-card" data-animate>' +
        '<div class="project-window">' +
        '<div class="project-window-bar">' +
        '<div class="project-window-dots">' +
        '<span class="project-window-dot dot-red"></span>' +
        '<span class="project-window-dot dot-yellow"></span>' +
        '<span class="project-window-dot dot-green"></span>' +
        '</div>' +
        '<span class="project-badge ' + badgeClass + '">' + escapeHtml(badgeText) + '</span>' +
        '</div>' +
        screenshot +
        '</div>' +
        '<div class="project-body">' +
        '<div class="project-header-row">' +
        '<h3 class="project-title">' + escapeHtml(project.title) + '</h3>' +
        '</div>' +
        (project.role ? '<span class="project-role">' + escapeHtml(project.role) + '</span>' : '') +
        '<p class="project-desc">' + escapeHtml(project.description) + '</p>' +
        insights +
        '<div class="project-stack">' + stack + '</div>' +
        '<div class="project-links">' + links.join("") + '</div>' +
        '</div>' +
        '</li>'
      );
    });

    listEl.innerHTML = items.join("");

    // Trigger reveal animations for newly rendered items
    if (window.PORTFOLIO_ANIMATE && typeof window.PORTFOLIO_ANIMATE.refresh === "function") {
      window.PORTFOLIO_ANIMATE.refresh();
    }
  }

  function init() {
    var data = window.PORTFOLIO_DATA || {};
    if (data.projects) {
      renderFilters(data.projects);
      renderProjects(data.projects);
    } else {
      document.addEventListener("portfolio:ready", function () {
        renderFilters(window.PORTFOLIO_DATA.projects);
        renderProjects(window.PORTFOLIO_DATA.projects);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();