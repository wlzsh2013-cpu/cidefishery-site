(function () {
  const modules = document.querySelectorAll("[data-gp-step-module]");
  if (!modules.length) return;

  const desktopQuery = window.matchMedia("(min-width: 1025px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  modules.forEach(function (module) {
    if (module.dataset.gpReady === "true") return;
    module.dataset.gpReady = "true";

    const heading = module.querySelector("[data-gp-step-heading]");
    const items = Array.from(module.querySelectorAll(".gp-step-item"));
    const cards = Array.from(module.querySelectorAll(".gp-step-card"));

    if (!items.length || !cards.length) return;

    var activeIndex = 0;
    var ticking = false;
    var enabled = false;

    function setActive(index) {
      index = clamp(index, 0, items.length - 1);

      if (index === activeIndex && cards[index].classList.contains("is-active")) return;

      activeIndex = index;

      items.forEach(function (item, i) {
        item.classList.toggle("is-active", i === index);
      });

      cards.forEach(function (card, i) {
        card.classList.toggle("is-active", i === index);
      });
    }

    function measure() {
      enabled = desktopQuery.matches && !reduceMotion;

      if (!enabled) {
        module.style.height = "auto";
        if (heading) heading.classList.remove("is-hidden");
        setActive(0);
        return;
      }

      module.style.height = (window.innerHeight * (items.length + 1)) + "px";
      update();
    }

    function update() {
      if (!enabled) return;

      const rect = module.getBoundingClientRect();
      const maxScroll = Math.max(1, module.offsetHeight - window.innerHeight);
      const progress = clamp(-rect.top / maxScroll, 0, 1);

      if (heading) {
        heading.classList.toggle("is-hidden", progress > 0.08);
      }

      const switchStart = 0.12;
      const switchProgress = clamp((progress - switchStart) / (1 - switchStart), 0, 1);
      const nextIndex = Math.round(switchProgress * (items.length - 1));

      setActive(nextIndex);
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

    items.forEach(function (item, index) {
      item.addEventListener("click", function () {
        if (!enabled) {
          setActive(index);
          return;
        }

        const switchStart = 0.12;
        const targetProgress = switchStart + (index / Math.max(1, items.length - 1)) * (1 - switchStart);
        const maxScroll = module.offsetHeight - window.innerHeight;
        const targetY = window.scrollY + module.getBoundingClientRect().top + maxScroll * targetProgress;

        window.scrollTo({
          top: targetY,
          behavior: "smooth"
        });
      });
    });

    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", measure);
    } else {
      measure();
    }

    window.addEventListener("load", measure);
    setTimeout(measure, 300);
  });
})();