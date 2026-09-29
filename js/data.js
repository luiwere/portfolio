/* Loads project and skills data into window.PORTFOLIO_DATA for other scripts. */
(function () {
  "use strict";

  function fetchJSON(path) {
    return fetch(path, { cache: "no-store" }).then(function (res) {
      if (!res.ok) {
        throw new Error("Failed to load " + path + " (" + res.status + ")");
      }
      return res.json();
    });
  }

  window.PORTFOLIO_DATA = window.PORTFOLIO_DATA || {};

  Promise.all([
    fetchJSON("data/projects.json"),
    fetchJSON("data/skills.json"),
  ])
    .then(function (results) {
      window.PORTFOLIO_DATA.projects = results[0];
      window.PORTFOLIO_DATA.skills = results[1];
      document.dispatchEvent(new CustomEvent("portfolio:ready"));
    })
    .catch(function (err) {
      console.error(err);
    });
})();