(function () {
  const section = document.querySelector("[data-cide-steps-scroll]");
  if (!section) return;

  const container = section.querySelector("[data-cide-steps-container]");
  const cards = Array.from(section.querySelectorAll("[data-cide-step-card]"));
  if (!cards.length || !container) return;

  const desktopQuery = window.matchMedia("(min-width: 1025px)");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  let enabled = false;
  let ticking = false;
  let stickyOffset = 0;
  let stickyViewport = window.innerHeight;

  function setActive(index, floatIndex) {
    cards.forEach(function (card, i) {
      const distance = Math.abs(floatIndex - i);
      const strength = clamp(1 - distance, 0, 1);
      const isActive = i === index;

      card.classList.toggle("is-active", isActive);
      card.style.setProperty("--name-y", ((1 - strength) * 22).toFixed(2) + "px");
      card.style.setProperty("--name-opacity", (0.36 + strength * 0.64).toFixed(3));
      card.style.setProperty("--desc-opacity", (0.34 + strength * 0.66).toFixed(3));
      card.style.setProperty("--card-opacity", (0.45 + strength * 0.55).toFixed(3));
      card.style.setProperty("--card-scale", (0.965 + strength * 0.035).toFixed(3));
      card.style.setProperty("--card-y", ((i - floatIndex) * 18).toFixed(2) + "px");
      card.style.setProperty("--image-y", ((i - floatIndex) * -10).toFixed(2) + "px");
      card.style.setProperty("--line-scale", (0.18 + strength * 0.82).toFixed(3));
    });
  }

  function update() {
    if (!enabled) return;

    const rect = section.getBoundingClientRect();
    const maxScroll = Math.max(1, section.offsetHeight - stickyViewport);
    const progress = clamp((stickyOffset - rect.top) / maxScroll, 0, 1);
    const headingHide = clamp(progress / 0.12, 0, 1);
    const lift = -headingHide * Math.min(170, window.innerHeight * 0.2);
    const stepProgress = clamp((progress - 0.08) / 0.92, 0, 1);
    const floatIndex = stepProgress * (cards.length - 1);
    const activeIndex = clamp(Math.round(floatIndex), 0, cards.length - 1);

    setPinnedState(rect, maxScroll);
    section.style.setProperty("--heading-hide", headingHide.toFixed(3));
    section.style.setProperty("--container-lift", lift.toFixed(2) + "px");
    setActive(activeIndex, floatIndex);
  }

  function setPinnedState(rect, maxScroll) {
    const sticky = section.querySelector(".cide-steps-sticky");
    if (!sticky) return;

    const entered = rect.top <= stickyOffset;
    const leaving = rect.top <= stickyOffset - maxScroll;

    sticky.classList.toggle("is-fixed", entered && !leaving);
    sticky.classList.toggle("is-released", leaving);

    if (leaving) {
      sticky.style.transform = "translateX(-50%) translate3d(0," + maxScroll + "px,0)";
    } else {
      sticky.style.transform = "";
    }
  }

  function measure() {
    enabled = desktopQuery.matches && !reduceMotion;
    stickyOffset = parseFloat(getComputedStyle(section).getPropertyValue("--site-header-offset")) || 0;
    stickyViewport = Math.max(1, window.innerHeight - stickyOffset);

    if (!enabled) {
      section.style.height = "auto";
      section.style.setProperty("--heading-hide", "0");
      section.style.setProperty("--container-lift", "0px");
      const sticky = section.querySelector(".cide-steps-sticky");
      if (sticky) {
        sticky.classList.remove("is-fixed", "is-released");
        sticky.style.transform = "";
      }
      cards.forEach(function (card) {
        card.classList.add("is-active");
        card.style.setProperty("--card-y", "0px");
        card.style.setProperty("--card-scale", "1");
        card.style.setProperty("--card-opacity", "1");
        card.style.setProperty("--name-y", "0px");
        card.style.setProperty("--name-opacity", "1");
        card.style.setProperty("--desc-opacity", "1");
        card.style.setProperty("--image-y", "0px");
        card.style.setProperty("--line-scale", "1");
      });
      return;
    }

    section.style.height = (stickyViewport * (cards.length + 1)) + "px";
    update();
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }

  let resizeTimer = null;
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
  window.addEventListener("pageshow", measure);
  setTimeout(measure, 300);
})();
