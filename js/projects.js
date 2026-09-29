/* Renders project cards from data/projects.json into #project-list. */
(function () {
  "use strict";

  var listEl = document.getElementById("project-list");
  if (!listEl) return;

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function render(projects) {
    if (!Array.isArray(projects) || projects.length === 0) {
      listEl.innerHTML =
        '<li class="empty-state">No projects to show yet.</li>';
      return;
    }

    var items = projects.map(function (project) {
      var screenshot = project.screenshot
        ? '<div class="project-thumb"><img src="' +
          escapeHtml(project.screenshot) +
          '" alt="' +
          escapeHtml(project.title) +
          ' screenshot" loading="lazy" onerror="this.onerror=null;this.parentElement.classList.add(\'is-empty\');this.remove();" /></div>'
        : "";

      var links = [];
      if (project.demo) {
        links.push(
          '<a href="' +
            escapeHtml(project.demo) +
            '" class="project-link" target="_blank" rel="noopener">Demo</a>'
        );
      }
      if (project.repo) {
        links.push(
          '<a href="' +
            escapeHtml(project.repo) +
            '" class="project-link" target="_blank" rel="noopener">Code</a>'
        );
      }

      var stack = Array.isArray(project.stack)
        ? project.stack
            .map(function (t) {
              return '<span class="tag">' + escapeHtml(t) + "</span>";
            })
            .join("")
        : "";

      return (
        '<li class="project-card">' +
        screenshot +
        '<div class="project-body">' +
        '<h3 class="project-title">' +
        escapeHtml(project.title) +
        "</h3>" +
        '<p class="project-desc">' +
        escapeHtml(project.description) +
        "</p>" +
        '<p class="project-role">' + escapeHtml(project.role) + "</p>" +
        (project.problem
          ? '<p class="project-problem"><strong>Problem:</strong> ' +
            escapeHtml(project.problem) +
            "</p>"
          : "") +
        (project.learned
          ? '<p class="project-learned"><strong>Learned:</strong> ' +
            escapeHtml(project.learned) +
            "</p>"
          : "") +
        '<div class="project-stack">' + stack + "</div>" +
        '<div class="project-links">' + links.join("") + "</div>" +
        "</div>" +
        "</li>"
      );
    });

    listEl.innerHTML = items.join("");
  }

  function init() {
    var data = window.PORTFOLIO_DATA || {};
    if (data.projects) {
      render(data.projects);
    } else {
      document.addEventListener("portfolio:ready", function () {
        render(window.PORTFOLIO_DATA.projects);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();