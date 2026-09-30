/* js/skills.js — renders categorized skill matrix cards with icons and indicators */
(function () {
  "use strict";

  var groupsEl = document.getElementById("skill-groups");
  if (!groupsEl) return;

  var GROUP_CONFIG = {
    languages: {
      label: "Languages",
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>',
      color: "#3b82f6"
    },
    frameworks: {
      label: "Frameworks & Libs",
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>',
      color: "#8b5cf6"
    },
    databases: {
      label: "Databases & Storage",
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>',
      color: "#06b6d4"
    },
    tools: {
      label: "DevOps & Cloud Tools",
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',
      color: "#10b981"
    }
  };

  function escapeHtml(str) {
    if (!str) return "";
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderGroup(key, items) {
    var config = GROUP_CONFIG[key] || {
      label: key,
      icon: '<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg>',
      color: "#3b82f6"
    };

    var chips = (items || [])
      .map(function (item) {
        var used = item.usedIn ? escapeHtml(item.usedIn) : "";
        return (
          '<li class="skill-chip">' +
          '<div class="skill-name-row">' +
          '<span class="skill-name">' + escapeHtml(item.name) + '</span>' +
          '<span class="skill-indicator" style="background-color:' + config.color + '"></span>' +
          '</div>' +
          (used ? '<span class="skill-used">' + used + '</span>' : '') +
          '</li>'
        );
      })
      .join("");

    return (
      '<div class="skill-group" data-animate>' +
      '<div class="skill-group-head">' +
      '<div class="skill-group-icon" style="background:' + config.color + '1a; color:' + config.color + ';">' + config.icon + '</div>' +
      '<h3>' + escapeHtml(config.label) + '</h3>' +
      '</div>' +
      '<ul class="skill-list">' +
      chips +
      '</ul>' +
      '</div>'
    );
  }

  function render(skills) {
    var groups = ["languages", "frameworks", "databases", "tools"];
    var html = groups
      .map(function (key) {
        return renderGroup(key, skills ? skills[key] : null);
      })
      .join("");
    groupsEl.innerHTML = html;

    if (window.PORTFOLIO_ANIMATE && typeof window.PORTFOLIO_ANIMATE.refresh === "function") {
      window.PORTFOLIO_ANIMATE.refresh();
    }
  }

  function init() {
    var data = window.PORTFOLIO_DATA || {};
    if (data.skills) {
      render(data.skills);
    } else {
      document.addEventListener("portfolio:ready", function () {
        render(window.PORTFOLIO_DATA.skills);
      });
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();