(function () {
  "use strict";

  const rootStyle = document.documentElement.style;
  const productDevice = document.querySelector("#productDevice");
  const problemSolution = document.querySelector("#problemSolution");
  const revealBlocks = [...document.querySelectorAll(".reveal-block")];
  const orbitBlocks = [...document.querySelectorAll(".solution-orbit")];
  const processList = document.querySelector(".process-list");
  const menuButtons = [...document.querySelectorAll(".project-menu")];
  const siteMenu = document.querySelector("#siteMenu");
  const siteMenuScrim = document.querySelector(".site-menu-scrim");
  const siteMenuClose = document.querySelector(".site-menu-close");
  const siteMenuLinks = [...document.querySelectorAll(".site-menu-link")];
  const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
  const stickyQuery = window.matchMedia("(min-width: 768px)");
  const desktopOrbitQuery = window.matchMedia("(min-width: 1024px)");
  const scrollKeys = new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);

  let ticking = false;

  function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
  }

  function setMenuExpanded(isExpanded) {
    menuButtons.forEach((button) => {
      button.setAttribute("aria-expanded", String(isExpanded));
      button.setAttribute(
        "aria-label",
        window.portfolioI18n?.t(isExpanded ? "Close menu" : "Open menu") || (isExpanded ? "Close menu" : "Open menu")
      );
    });
  }

  function openMenu() {
    if (!siteMenu) {
      return;
    }

    document.documentElement.classList.add("is-menu-open");
    document.body.classList.add("is-menu-open");
    siteMenu.setAttribute("aria-hidden", "false");
    setMenuExpanded(true);
  }

  function closeMenu() {
    if (!siteMenu) {
      return;
    }

    document.documentElement.classList.remove("is-menu-open");
    document.body.classList.remove("is-menu-open");
    siteMenu.setAttribute("aria-hidden", "true");
    setMenuExpanded(false);
  }

  function toggleMenu() {
    if (document.body.classList.contains("is-menu-open")) {
      closeMenu();
      return;
    }

    openMenu();
  }

  function preventMenuScroll(event) {
    if (!document.body.classList.contains("is-menu-open")) {
      return;
    }

    event.preventDefault();
  }

  function preventMenuKeyScroll(event) {
    if (!document.body.classList.contains("is-menu-open") || !scrollKeys.has(event.key)) {
      return;
    }

    const interactiveTarget = event.target.closest?.(
      "a, button, input, select, textarea, [role='button'], [contenteditable='true']"
    );

    if (event.key === " " && interactiveTarget) {
      return;
    }

    event.preventDefault();
  }

  function revealBlock(block) {
    block.classList.add("is-visible");

    if (block.classList.contains("solution-orbit") && (!desktopOrbitQuery.matches || reducedMotionQuery.matches)) {
      block.classList.add("is-orbit-drawn");
    }
  }

  function syncDesktopOrbitDraw() {
    if (!desktopOrbitQuery.matches || reducedMotionQuery.matches || orbitBlocks.length === 0) {
      return;
    }

    orbitBlocks.forEach((block) => {
      if (block.classList.contains("is-orbit-drawn")) {
        return;
      }

      const rect = block.getBoundingClientRect();

      if (rect.top <= window.innerHeight) {
        block.classList.add("is-orbit-drawn");
      }
    });
  }

  function revealAll() {
    revealBlocks.forEach((block) => block.classList.add("is-visible"));
    orbitBlocks.forEach((block) => block.classList.add("is-orbit-drawn"));
    if (processList) {
      processList.classList.add("is-visible");
    }
    rootStyle.setProperty("--device-opacity", "1");
  }

  function syncDeviceOpacity() {
    ticking = false;
    syncDesktopOrbitDraw();

    if (!productDevice || !problemSolution || reducedMotionQuery.matches || !stickyQuery.matches) {
      rootStyle.setProperty("--device-opacity", "1");
      return;
    }

    const rect = problemSolution.getBoundingClientRect();
    const fadeStart = window.innerHeight * 0.78;
    const fadeEnd = window.innerHeight * 0.18;
    const progress = clamp((fadeStart - rect.top) / Math.max(1, fadeStart - fadeEnd));
    const opacity = 1 - progress * 0.9;

    rootStyle.setProperty("--device-opacity", opacity.toFixed(3));
  }

  function requestDeviceOpacitySync() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(syncDeviceOpacity);
    }
  }

  function initObservers() {
    if (reducedMotionQuery.matches || !("IntersectionObserver" in window)) {
      revealAll();
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealBlock(entry.target);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -14% 0px", threshold: 0.12 }
    );

    revealBlocks.forEach((block) => revealObserver.observe(block));

    const orbitObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealBlock(entry.target);
            orbitObserver.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -24% 0px", threshold: 0.22 }
    );

    orbitBlocks.forEach((block) => orbitObserver.observe(block));

    if (problemSolution && orbitBlocks.length > 0) {
      const problemObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            orbitBlocks.forEach(revealBlock);
            problemObserver.disconnect();
          }
        },
        { rootMargin: "0px 0px -34% 0px", threshold: 0.12 }
      );

      problemObserver.observe(problemSolution);
    }

    if (processList) {
      const processObserver = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            processList.classList.add("is-visible");
            processObserver.disconnect();
          }
        },
        { rootMargin: "0px 0px -28% 0px", threshold: 0.12 }
      );

      processObserver.observe(processList);
    }
  }

  function onMotionPreferenceChange() {
    if (reducedMotionQuery.matches) {
      revealAll();
    }
    syncDeviceOpacity();
  }

  function onDesktopOrbitChange() {
    if (!desktopOrbitQuery.matches) {
      orbitBlocks.forEach((block) => {
        if (block.classList.contains("is-visible")) {
          block.classList.add("is-orbit-drawn");
        }
      });
    }

    syncDeviceOpacity();
  }

  initObservers();
  syncDeviceOpacity();

  menuButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      event.preventDefault();
      toggleMenu();
    });
  });

  siteMenuLinks.forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  if (siteMenuScrim) {
    siteMenuScrim.addEventListener("click", closeMenu);
  }

  if (siteMenuClose) {
    siteMenuClose.addEventListener("click", closeMenu);
  }

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && document.body.classList.contains("is-menu-open")) {
      closeMenu();
    }
  });

  window.addEventListener("scroll", requestDeviceOpacitySync, { passive: true });
  window.addEventListener("resize", requestDeviceOpacitySync, { passive: true });
  window.addEventListener("portfolio-language-change", () => {
    setMenuExpanded(document.body.classList.contains("is-menu-open"));
  });
  window.addEventListener("wheel", preventMenuScroll, { passive: false });
  window.addEventListener("touchmove", preventMenuScroll, { passive: false });
  window.addEventListener("keydown", preventMenuKeyScroll);

  if (typeof reducedMotionQuery.addEventListener === "function") {
    reducedMotionQuery.addEventListener("change", onMotionPreferenceChange);
    stickyQuery.addEventListener("change", syncDeviceOpacity);
    desktopOrbitQuery.addEventListener("change", onDesktopOrbitChange);
  }
})();
