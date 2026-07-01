(function () {
  const sections = document.querySelectorAll("[data-gp-hscroll]");
  if (!sections.length) return;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktopQuery = window.matchMedia("(min-width: 1025px)");

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  sections.forEach(function (section) {
    if (section.dataset.gpReady === "true") return;
    section.dataset.gpReady = "true";

    const viewport = section.querySelector(".gp-cc-viewport");
    const track = section.querySelector(".gp-cc-track");

    if (!viewport || !track) return;

    let travel = 0;
    let enabled = false;
    let ticking = false;

    function measure() {
      enabled = desktopQuery.matches && !reduceMotion;

      if (!enabled) {
        section.style.height = "auto";
        track.style.transform = "translate3d(0, 0, 0)";
        return;
      }

      track.style.transform = "translate3d(0, 0, 0)";

      const viewportWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;

      travel = Math.max(0, trackWidth - viewportWidth);
      section.style.height = (window.innerHeight + travel) + "px";

      update();
    }

    function update() {
      if (!enabled) return;

      const rect = section.getBoundingClientRect();
      const scrollRange = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / scrollRange, 0, 1);
      const x = -travel * progress;

      track.style.transform = "translate3d(" + x + "px, 0, 0)";
    }

    function requestUpdate() {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(function () {
        update();
        ticking = false;
      });
    }

    var resizeTimer = null;

    function requestMeasure() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(measure, 120);
    }

    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestMeasure);

    if (desktopQuery.addEventListener) {
      desktopQuery.addEventListener("change", measure);
    } else {
      desktopQuery.addListener(measure);
    }

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", measure);
    } else {
      measure();
    }

    window.addEventListener("load", measure);
    setTimeout(measure, 300);
  });
})();