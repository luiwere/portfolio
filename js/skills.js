/* Renders skill groups from data/skills.json into #skill-groups. */
(function () {
  "use strict";

  var groupsEl = document.getElementById("skill-groups");
  if (!groupsEl) return;

  var GROUP_LABELS = {
    languages: "Languages",
    frameworks: "Frameworks",
    databases: "Databases",
    tools: "Tools",
  };

  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  function renderGroup(key, items) {
    var label = GROUP_LABELS[key] || key;
    var chips = (items || [])
      .map(function (item) {
        var used = item.usedIn ? " · " + escapeHtml(item.usedIn) : "";
        return (
          '<li class="skill-chip">' +
          escapeHtml(item.name) +
          '<span class="skill-used">' +
          used +
          "</span>" +
          "</li>"
        );
      })
      .join("");

    return (
      '<div class="skill-group">' +
      "<h3>" +
      escapeHtml(label) +
      "</h3>" +
      '<ul class="skill-list">' +
      chips +
      "</ul>" +
      "</div>"
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