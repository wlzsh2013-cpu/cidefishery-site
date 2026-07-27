(function () {
  function initStepModules() {
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

      const sticky = module.querySelector(".leyou-app-sticky, .gp-step-sticky");
      const background = module.querySelector(".leyou-app-bg");
      const heading = module.querySelector("[data-gp-step-heading]");
      const items = Array.from(module.querySelectorAll(".leyou-app-item, .gp-step-item"));
      const cards = Array.from(module.querySelectorAll(".leyou-app-card, .gp-step-card"));

      if (!items.length || !cards.length) return;

      var activeIndex = 0;
      var ticking = false;
      var enabled = false;
      var stickyOffset = 0;
      var stickyViewport = window.innerHeight;

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

      function moveBackground(progress) {
        if (!sticky || !background) return;

        const travel = Math.max(0, background.offsetHeight - sticky.clientHeight);
        background.style.setProperty("--venue-bg-y", (-travel * progress).toFixed(2) + "px");
      }

      function setPinnedState(rect, maxScroll) {
        if (!sticky) return;

        const entered = rect.top <= stickyOffset;
        const leaving = rect.top <= stickyOffset - maxScroll;

        sticky.classList.toggle("is-fixed", entered && !leaving);
        sticky.classList.toggle("is-released", leaving);

        if (leaving) {
          sticky.style.transform = "translate3d(0," + maxScroll + "px,0)";
        } else {
          sticky.style.transform = "";
        }
      }

      function indexFromProgress(progress) {
        if (items.length <= 1) return 0;
        const firstSwitch = 0.07;

        if (progress <= firstSwitch) return 0;

        const steppedProgress = clamp((progress - firstSwitch) / (1 - firstSwitch), 0, 1);
        return Math.floor(steppedProgress * (items.length - 1)) + 1;
      }

      function progressFromIndex(index) {
        if (index <= 0 || items.length <= 1) return 0;

        const firstSwitch = 0.07;

        return firstSwitch + ((index - 1) / Math.max(1, items.length - 1)) * (1 - firstSwitch);
      }

      function readStickyOffset() {
        if (!sticky) return 0;

        const top = parseFloat(window.getComputedStyle(sticky).top);
        return Number.isFinite(top) ? top : 0;
      }

      function measure() {
        enabled = desktopQuery.matches && !reduceMotion;
        stickyOffset = readStickyOffset();
        stickyViewport = Math.max(1, window.innerHeight - stickyOffset);

        if (!enabled) {
          module.style.height = "auto";
          if (sticky) {
            sticky.classList.remove("is-fixed", "is-released");
            sticky.style.transform = "";
          }
          moveBackground(0);
          if (heading) heading.classList.remove("is-hidden");
          setActive(0);
          return;
        }

        module.style.height = (stickyViewport * (items.length + 1)) + "px";
        update();
      }

      function update() {
        if (!enabled) return;

        const rect = module.getBoundingClientRect();
        const maxScroll = Math.max(1, module.offsetHeight - stickyViewport);
        const progress = clamp((stickyOffset - rect.top) / maxScroll, 0, 1);

        setPinnedState(rect, maxScroll);
        moveBackground(progress);

        if (heading) {
          heading.classList.toggle("is-hidden", progress > 0.08);
        }

        const nextIndex = indexFromProgress(progress);

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

          const targetProgress = progressFromIndex(index);
          const maxScroll = module.offsetHeight - stickyViewport;
          const targetY = window.scrollY + module.getBoundingClientRect().top - stickyOffset + maxScroll * targetProgress;

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
      window.addEventListener("pageshow", measure);
      setTimeout(measure, 300);
      setTimeout(measure, 900);
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initStepModules);
  } else {
    initStepModules();
  }

  window.addEventListener("pageshow", initStepModules);
})();
