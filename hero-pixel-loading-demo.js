const hero = document.querySelector("#hero");
const mask = document.querySelector("#pixelMask");
const heroAboutSpacer = document.querySelector("#heroAboutSpacer");
const aboutSection = document.querySelector("#about");
const aboutPhotoSlot = document.querySelector("#aboutPhotoSlot");
const aboutPhotoImage = document.querySelector("#aboutPhotoImage");
const transitionPhoto = document.querySelector("#transitionPhoto");
const transitionPhotoImage = document.querySelector("#transitionPhotoImage");
const skillsStage = document.querySelector("#skills");
const skillSteps = [...document.querySelectorAll(".skill-step")];
const certificatesStage = document.querySelector("#certificates");
const certificateCards = [...document.querySelectorAll(".certificates-card")];
const certificateViewButtons = [...document.querySelectorAll(".certificates-view")];
const certificatesModal = document.querySelector("#certificatesModal");
const certificatesModalImage = document.querySelector("#certificatesModalImage");
const certificatesModalCaption = document.querySelector("#certificatesModalCaption");
const certificatesModalBackdrop = document.querySelector(".certificates-modal-backdrop");
const projectsStage = document.querySelector("#projects");
const projectsTrack = document.querySelector("#projectsTrack");
const projectCards = [...document.querySelectorAll(".project-card")];
const ctaSection = document.querySelector("#cta");
const ctaPixelCanvas = document.querySelector("#ctaPixelCanvas");
const siteNav = document.querySelector(".site-nav");
const siteMenu = document.querySelector("#siteMenu");
const menuButtons = [...document.querySelectorAll(".menu")];
const siteMenuScrim = document.querySelector(".site-menu-scrim");
const siteMenuClose = document.querySelector(".site-menu-close");
const siteMenuLinks = [...document.querySelectorAll(".site-menu-link")];
const rootStyle = document.documentElement.style;
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
const mobileSkillsQuery = window.matchMedia("(max-width: 560px)");
const scrollKeys = new Set(["ArrowDown", "ArrowUp", "End", "Home", "PageDown", "PageUp", " "]);
const initialMenuTargetName = getMenuTargetFromHash();
const shouldSkipIntroForDeepLink = initialMenuTargetName === "projects" || initialMenuTargetName === "cta";

if (!shouldSkipIntroForDeepLink) {
  document.documentElement.classList.add("is-scroll-locked");
  document.body.classList.add("is-intro-loading", "is-scroll-locked");
}

let ticking = false;
let projectsTicking = false;
let pendingHashTargetName = null;
let aboutTransitionDistance = 1;
let aboutPhotoRect = {
  top: 0,
  left: 0,
  width: window.innerWidth,
  height: window.innerHeight,
};

function randomBetween(min, max) {
  return Math.random() * (max - min) + min;
}

function clamp(value, min = 0, max = 1) {
  return Math.min(Math.max(value, min), max);
}

function lerp(start, end, progress) {
  return start + (end - start) * progress;
}

function smoothstep(start, end, value) {
  const progress = clamp((value - start) / (end - start));
  return progress * progress * (3 - 2 * progress);
}

function isScrollLocked() {
  return document.documentElement.classList.contains("is-scroll-locked");
}

function lockScroll() {
  document.documentElement.classList.add("is-scroll-locked");
  document.body.classList.add("is-scroll-locked");
  window.scrollTo(0, 0);
}

function unlockScroll() {
  document.documentElement.classList.remove("is-scroll-locked");
  document.body.classList.remove("is-scroll-locked");
}

function setNavTheme(theme) {
  if (!siteNav) {
    return;
  }

  siteNav.classList.toggle("is-light", theme === "light");
  siteNav.classList.toggle("is-dark", theme === "dark");
}

function setMobileSectionNavMinimal(isActive) {
  document.body.classList.toggle("is-mobile-section-nav-minimal", isActive && mobileSkillsQuery.matches);
}

function syncNavTheme() {
  if (!siteNav) {
    return;
  }

  const navMarker = Math.min(window.innerHeight - 1, Math.max(64, siteNav.getBoundingClientRect().bottom + 8));
  if (window.scrollY <= 4) {
    setMobileSectionNavMinimal(false);
    setNavTheme("light");
    return;
  }

  let theme = "dark";
  const sectionContainsMarker = (section) => {
    if (!section) {
      return false;
    }

    const rect = section.getBoundingClientRect();

    return rect.top <= navMarker && rect.bottom > navMarker;
  };

  const isSkillsSection = sectionContainsMarker(skillsStage);
  const isCertificatesSection = sectionContainsMarker(certificatesStage);
  const isProjectsSection = sectionContainsMarker(projectsStage);
  const isMinimalMobileSection = isSkillsSection || isCertificatesSection || isProjectsSection;

  if (isSkillsSection) {
    theme = "light";
  }

  if (isCertificatesSection) {
    theme = "light";
  }

  if (isProjectsSection) {
    theme = "light";
  }

  if (sectionContainsMarker(aboutSection)) {
    theme = "dark";
  }

  if (sectionContainsMarker(ctaSection)) {
    theme = "dark";
  }

  setMobileSectionNavMinimal(isMinimalMobileSection);
  setNavTheme(theme);
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
  requestProjectsSync();
  syncNavTheme();
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

function getMenuTargetFromHash() {
  if (window.location.hash === "#projects") {
    return "projects";
  }

  if (window.location.hash === "#cta") {
    return "cta";
  }

  if (window.location.hash === "#hero") {
    return "home";
  }

  return null;
}

function scrollToMenuTarget(targetName, options = {}) {
  const behavior = options.behavior || (reducedMotionQuery.matches ? "auto" : "smooth");

  if (targetName === "home") {
    window.scrollTo({ top: 0, behavior });
    if (window.location.hash) {
      window.history.replaceState(null, "", window.location.pathname + window.location.search);
    }
    syncNavTheme();
    return;
  }

  const target = targetName === "projects" ? projectsStage : ctaSection;

  if (target) {
    const targetTop = Math.max(0, window.scrollY + target.getBoundingClientRect().top);
    const settleDelay = options.settleDelay ?? (behavior === "auto" ? 160 : reducedMotionQuery.matches ? 0 : 720);

    window.scrollTo({ top: targetTop, behavior });
    window.history.replaceState(null, "", `#${target.id}`);
    syncNavTheme();
    requestProjectsSync();

    window.setTimeout(() => {
      syncProjects();
      const remainingOffset = target.getBoundingClientRect().top;

      if (Math.abs(remainingOffset) > 4) {
        window.scrollTo({ top: Math.max(0, window.scrollY + remainingOffset), behavior: "auto" });
      }

      requestProjectsSync();
      syncNavTheme();
    }, settleDelay);
  }
}

function applyPendingHashTarget() {
  if (!pendingHashTargetName || isScrollLocked()) {
    return;
  }

  const targetName = pendingHashTargetName;
  pendingHashTargetName = null;

  requestAnimationFrame(() => {
    requestAnimationFrame(() => scrollToMenuTarget(targetName));
  });
}

function scrollToInitialDeepLinkTarget(targetName) {
  requestAnimationFrame(() => {
    syncProjects();
    requestAnimationFrame(() => {
      scrollToMenuTarget(targetName, { behavior: "auto", settleDelay: 160 });
    });
  });
}

function preventIntroScroll(event) {
  if (!isScrollLocked()) {
    return;
  }

  event.preventDefault();
  window.scrollTo(0, 0);
}

function preventIntroKeyScroll(event) {
  if (!isScrollLocked() || !scrollKeys.has(event.key)) {
    return;
  }

  event.preventDefault();
  window.scrollTo(0, 0);
}

function resetScrollTransition() {
  document.body.classList.remove("is-about-active", "is-about-complete", "is-skills-revealed");
  skillSteps.forEach((step) => step.classList.remove("is-skill-step-revealed"));
  rootStyle.setProperty("--hero-bg-opacity", "1");
  rootStyle.setProperty("--hero-ui-opacity", "1");
  rootStyle.setProperty("--headline-scroll-x", "0px");
  rootStyle.setProperty("--headline-scroll-opacity", "1");
  rootStyle.setProperty("--about-opacity", "0");
  rootStyle.setProperty("--about-content-progress", "0");
  rootStyle.setProperty("--about-content-y", "112%");
  rootStyle.setProperty("--transition-photo-opacity", "0");
  rootStyle.setProperty("--skills-opacity", "0");
  rootStyle.setProperty("--skills-title-y", "18px");
  rootStyle.setProperty("--skills-content-y", "34px");
  setNavTheme("light");

  for (let index = 1; index <= 4; index += 1) {
    rootStyle.setProperty(`--skill-${index}-progress`, "0");
    rootStyle.setProperty(`--skill-${index}-content-progress`, "0");
  }

  transitionPhoto.style.top = "0px";
  transitionPhoto.style.left = "0px";
  transitionPhoto.style.width = `${window.innerWidth}px`;
  transitionPhoto.style.height = `${window.innerHeight}px`;
  transitionPhotoImage.style.transform = "translate(0px, 0px)";
}

function completeIntroImmediately() {
  document.documentElement.classList.remove("is-scroll-locked");
  document.body.classList.remove("is-intro-loading", "is-scroll-locked");
  document.body.classList.add("is-nav-ready");
  hero.classList.add("is-ready");
  hero.classList.remove("is-loading");
  mask.classList.remove("is-built");
  mask.style.display = "none";
}

function buildPixelMask() {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const base = width < 560 ? 22 : width < 900 ? 28 : 34;
  const centerX = width / 2;
  const centerY = height / 2;
  const maxDistance = Math.hypot(centerX, centerY);
  const pixels = [];

  mask.replaceChildren();

  let y = 0;

  while (y < height) {
    const rowHeight = Math.min(Math.round(base * randomBetween(0.72, 1.5)), height - y);
    let x = 0;

    while (x < width) {
      const blockWidth = Math.min(Math.round(base * randomBetween(0.72, 1.65)), width - x);
      const blockHeight = rowHeight;
      const px = x;
      const py = y;
      const distanceFromCenter = Math.hypot(px + blockWidth / 2 - centerX, py + blockHeight / 2 - centerY);
      const edgeBias = distanceFromCenter / maxDistance;
      const delay = 220 + (1 - edgeBias) * 1500 + randomBetween(-70, 190);

      pixels.push(
        `<i class="pixel" style="left:${px}px;top:${py}px;width:${blockWidth}px;height:${blockHeight}px;--delay:${Math.max(
          0,
          delay
        )}ms"></i>`
      );

      x += blockWidth;
    }

    y += rowHeight;
  }

  mask.innerHTML = pixels.join("");
}

function play() {
  const isReducedMotion = reducedMotionQuery.matches;

  document.body.classList.add("is-intro-loading");
  document.body.classList.remove("is-about-active", "is-about-complete", "is-skills-revealed", "is-nav-ready");
  skillSteps.forEach((step) => step.classList.remove("is-skill-step-revealed"));
  lockScroll();
  resetScrollTransition();
  hero.classList.remove("is-ready", "is-loading");
  mask.classList.remove("is-built");
  mask.style.display = "block";
  buildPixelMask();

  requestAnimationFrame(() => {
    mask.classList.add("is-built");
    hero.classList.add("is-loading");
    window.setTimeout(() => {
      hero.classList.add("is-ready");
      document.body.classList.add("is-nav-ready");
      document.body.classList.remove("is-intro-loading");
      unlockScroll();
      measureTransition();
      syncScrollTransition();
      syncNavTheme();
      syncProjects();
      applyPendingHashTarget();
    }, isReducedMotion ? 0 : 2200);
    window.setTimeout(() => {
      mask.style.display = "none";
    }, isReducedMotion ? 0 : 3400);
  });
}

function measureTransition() {
  aboutTransitionDistance = Math.max(1, heroAboutSpacer.offsetHeight);

  const slotRect = aboutPhotoSlot.getBoundingClientRect();

  aboutPhotoRect = {
    top: slotRect.top,
    left: slotRect.left,
    width: slotRect.width,
    height: slotRect.height,
  };
}

function syncScrollTransition() {
  ticking = false;

  if (isScrollLocked()) {
    window.scrollTo(0, 0);
    resetScrollTransition();
    return;
  }

  const aboutProgress = clamp(window.scrollY / aboutTransitionDistance);
  const isIntroLoading = document.body.classList.contains("is-intro-loading");
  const isAboutComplete = !isIntroLoading && aboutProgress >= 0.995;

  document.body.classList.toggle("is-about-active", isAboutComplete);
  document.body.classList.toggle("is-about-complete", isAboutComplete);

  const headlineProgress = smoothstep(0, 0.35, aboutProgress);
  const aboutSurfaceProgress = aboutProgress > 0.01 ? 1 : 0;
  const photoProgress = smoothstep(0.01, 0.75, aboutProgress);
  const aboutContentProgress = smoothstep(0.75, 1, aboutProgress);
  const transitionPhotoOpacity = !isIntroLoading && aboutProgress > 0.01 && !isAboutComplete ? 1 : 0;

  const photoTop = lerp(0, aboutPhotoRect.top, photoProgress);
  const photoLeft = lerp(0, aboutPhotoRect.left, photoProgress);
  const photoWidth = lerp(window.innerWidth, aboutPhotoRect.width, photoProgress);
  const photoHeight = lerp(window.innerHeight, aboutPhotoRect.height, photoProgress);

  rootStyle.setProperty("--hero-bg-opacity", String(1 - aboutSurfaceProgress));
  rootStyle.setProperty("--hero-ui-opacity", String(1 - smoothstep(0.32, 0.72, aboutProgress)));
  rootStyle.setProperty("--headline-scroll-x", `${-window.innerWidth * 1.1 * headlineProgress}px`);
  rootStyle.setProperty("--headline-scroll-opacity", String(1 - smoothstep(0.2, 0.35, aboutProgress)));
  rootStyle.setProperty("--about-opacity", String(isAboutComplete ? 1 : aboutSurfaceProgress));
  rootStyle.setProperty("--about-content-progress", String(aboutContentProgress));
  rootStyle.setProperty("--about-content-y", `${(1 - aboutContentProgress) * 112}%`);
  rootStyle.setProperty("--transition-photo-opacity", String(transitionPhotoOpacity));
  rootStyle.setProperty("--skills-opacity", "0");
  rootStyle.setProperty("--skills-title-y", "18px");
  rootStyle.setProperty("--skills-content-y", "34px");

  transitionPhoto.style.top = `${photoTop}px`;
  transitionPhoto.style.left = `${photoLeft}px`;
  transitionPhoto.style.width = `${photoWidth}px`;
  transitionPhoto.style.height = `${photoHeight}px`;
  transitionPhotoImage.style.transform = `translate(${-photoLeft}px, ${-photoTop}px)`;
  aboutPhotoImage.style.transform = `translate(${-aboutPhotoRect.left}px, ${-aboutPhotoRect.top}px)`;
}

function requestScrollSync() {
  if (isScrollLocked()) {
    window.scrollTo(0, 0);
    resetScrollTransition();
    return;
  }

  if (!ticking) {
    ticking = true;
    requestAnimationFrame(syncScrollTransition);
  }
}

function revealSkills() {
  document.body.classList.add("is-skills-revealed");
}

function revealSkillStep(step) {
  step.classList.add("is-skill-step-revealed");
}

function revealCertificates() {
  document.body.classList.add("is-certificates-revealed");
}

function revealCta() {
  document.body.classList.add("is-cta-revealed");
}

function measureCertificateCards() {
  if (!certificatesStage || certificateCards.length === 0) {
    return;
  }

  certificatesStage.style.setProperty("--certificate-card-height", "0px");

  const tallestCard = Math.max(...certificateCards.map((card) => Math.ceil(card.scrollHeight)));

  certificatesStage.style.setProperty("--certificate-card-height", `${tallestCard}px`);
}

function syncProjects() {
  projectsTicking = false;

  if (!projectsStage || !projectsTrack || projectCards.length === 0) {
    return;
  }

  if (reducedMotionQuery.matches) {
    projectsStage.style.removeProperty("--projects-stage-height");
    projectsTrack.style.setProperty("--projects-scroll-y", "0px");
    projectCards.forEach((card) => {
      card.style.setProperty("--project-opacity", "1");
      card.style.setProperty("--project-active", "1");
    });
    return;
  }

  const rect = projectsStage.getBoundingClientRect();
  const cardStep =
    projectCards.length > 1
      ? Math.max(1, projectCards[1].offsetTop - projectCards[0].offsetTop)
      : Math.max(1, projectCards[0].offsetHeight);
  const isMobileProjects = window.innerWidth <= 560;
  const focusTarget = isMobileProjects ? 0.52 : 0.5;
  const introDistance = Math.max(
    0,
    window.innerHeight - (window.innerHeight * focusTarget - projectCards[0].offsetHeight * 0.5)
  );
  const exitDistance =
    isMobileProjects
      ? Math.min(window.innerHeight * 0.34, cardStep * 1.7)
      : Math.min(window.innerHeight * 0.28, cardStep * 1.2);
  const activeTravel = cardStep * (projectCards.length - 1);
  const baseTravel = activeTravel + exitDistance;
  const totalTravel = introDistance + baseTravel;
  const baseStageVh = isMobileProjects ? 520 : 430;
  const baseScrollRange = Math.max(1, window.innerHeight * (baseStageVh / 100 - 1));
  const scrollRange = Math.max(1, baseScrollRange * (totalTravel / Math.max(1, baseTravel)));
  const progress = clamp(-rect.top / scrollRange);
  const visualScrollY = progress * totalTravel;
  const activeScrollY = Math.max(0, visualScrollY - introDistance);
  const introProgress = introDistance > 0 ? clamp(visualScrollY / introDistance) : 1;

  projectsStage.style.setProperty("--projects-stage-height", `${Math.ceil(scrollRange + window.innerHeight)}px`);
  projectsTrack.style.setProperty("--projects-scroll-y", `${visualScrollY}px`);

  const focusDistance = cardStep * 0.82;

  projectCards.forEach((card, index) => {
    const cardCenterOffset = index * cardStep;
    const distance = Math.abs(activeScrollY - cardCenterOffset);
    const baseActiveAmount = 1 - clamp(distance / focusDistance);
    const activeAmount = index === 0 ? baseActiveAmount * introProgress : baseActiveAmount;
    const opacity = 0.2 + activeAmount * 0.8;

    card.style.setProperty("--project-active", activeAmount.toFixed(3));
    card.style.setProperty("--project-opacity", opacity.toFixed(3));
  });
}

function requestProjectsSync() {
  if (!projectsTicking) {
    projectsTicking = true;
    requestAnimationFrame(syncProjects);
  }
}

class CtaPixel {
  constructor(x, y, color, speed, delay, delayHide, step, boundSize) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.speed = randomBetween(0.1, 0.9) * speed;
    this.size = 0;
    this.sizeStep = randomBetween(0.06, 0.46);
    this.minSize = 0.5;
    this.maxSizeAvailable = boundSize || 3;
    this.maxSize = randomBetween(this.minSize, this.maxSizeAvailable);
    this.sizeDirection = 1;
    this.delay = delay;
    this.delayHide = delayHide;
    this.counter = 0;
    this.counterHide = 0;
    this.counterStep = step;
    this.isHidden = false;
    this.isFlicking = false;
  }

  draw(ctx) {
    if (this.size <= 0) {
      return;
    }

    const centerOffset = this.maxSizeAvailable * 0.5 - this.size * 0.5;

    ctx.fillStyle = this.color;
    ctx.fillRect(this.x + centerOffset, this.y + centerOffset, this.size, this.size);
  }

  show() {
    this.isHidden = false;
    this.counterHide = 0;

    if (this.counter <= this.delay) {
      this.counter += this.counterStep;
      return;
    }

    if (this.size >= this.maxSize) {
      this.isFlicking = true;
    }

    if (this.isFlicking) {
      this.flicker();
      return;
    }

    this.size += this.sizeStep;
  }

  hide() {
    this.counter = 0;

    if (this.counterHide <= this.delayHide) {
      this.counterHide += this.counterStep;

      if (this.isFlicking) {
        this.flicker();
      }

      return;
    }

    this.isFlicking = false;

    if (this.size <= 0) {
      this.size = 0;
      this.isHidden = true;
      return;
    }

    this.size -= 0.045;
  }

  flicker() {
    if (this.size >= this.maxSize) {
      this.sizeDirection = -1;
    } else if (this.size <= this.minSize) {
      this.sizeDirection = 1;
    }

    this.size += this.sizeDirection * this.speed;
  }
}

const ctaPixelState = {
  pixels: [],
  request: null,
  lastTime: 0,
  ticker: 0,
  maxTicker: 360,
  animationDirection: 1,
  width: 0,
  height: 0,
  isRunning: false,
};

function getCtaPixelDelay(x, y, fromTop = false) {
  const dx = x - ctaPixelState.width * 0.5;
  const dy = fromTop ? y : y - ctaPixelState.height;

  return Math.sqrt(dx ** 2 + dy ** 2);
}

function initCtaPixels() {
  if (!ctaPixelState.width || !ctaPixelState.height) {
    return;
  }

  const gap = window.innerWidth <= 560 ? 10 : 12;
  const step = (ctaPixelState.width + ctaPixelState.height) * 0.005;
  const speed = randomBetween(0.008, 0.22);
  const maxSize = Math.max(2, Math.floor(gap * 0.56));
  const colors = [
    "rgba(5, 5, 5, 0.06)",
    "rgba(5, 5, 5, 0.08)",
    "rgba(5, 5, 5, 0.1)",
    "rgba(38, 38, 38, 0.08)",
    "rgba(104, 194, 141, 0.1)",
  ];

  ctaPixelState.pixels = [];

  for (let x = 0; x < ctaPixelState.width; x += gap) {
    for (let y = 0; y < ctaPixelState.height; y += gap) {
      if (x + maxSize > ctaPixelState.width || y + maxSize > ctaPixelState.height) {
        continue;
      }

      const color = colors[Math.floor(Math.random() * colors.length)];
      const delay = getCtaPixelDelay(x, y);
      const delayHide = getCtaPixelDelay(x, y, true);

      ctaPixelState.pixels.push(new CtaPixel(x, y, color, speed, delay, delayHide, step, maxSize));
    }
  }
}

function resizeCtaPixelCanvas() {
  if (!ctaSection || !ctaPixelCanvas || reducedMotionQuery.matches) {
    return;
  }

  const rect = ctaSection.getBoundingClientRect();
  const width = Math.floor(rect.width);
  const height = Math.floor(rect.height);

  if (width <= 0 || height <= 0) {
    return;
  }

  const dpr = Math.min(window.devicePixelRatio || 1, 2);

  ctaPixelState.width = width;
  ctaPixelState.height = height;
  ctaPixelCanvas.width = Math.floor(width * dpr);
  ctaPixelCanvas.height = Math.floor(height * dpr);

  const ctx = ctaPixelCanvas.getContext("2d");

  if (ctx) {
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, width, height);
  }

  initCtaPixels();
  ctaPixelState.ticker = 0;
  ctaPixelState.lastTime = 0;
}

function animateCtaPixels() {
  if (!ctaPixelState.isRunning || !ctaPixelCanvas || reducedMotionQuery.matches) {
    ctaPixelState.request = null;
    return;
  }

  const ctx = ctaPixelCanvas.getContext("2d");

  if (!ctx) {
    ctaPixelState.request = null;
    return;
  }

  ctaPixelState.request = requestAnimationFrame(animateCtaPixels);

  const interval = 1000 / 60;
  const now = performance.now();
  const diff = now - (ctaPixelState.lastTime || 0);

  if (diff < interval) {
    return;
  }

  ctaPixelState.lastTime = now - (diff % interval);
  ctx.clearRect(0, 0, ctaPixelState.width, ctaPixelState.height);

  if (ctaPixelState.ticker >= ctaPixelState.maxTicker) {
    ctaPixelState.animationDirection = -1;
  } else if (ctaPixelState.ticker <= 0) {
    ctaPixelState.animationDirection = 1;
  }

  let allHidden = true;

  ctaPixelState.pixels.forEach((pixel) => {
    if (ctaPixelState.animationDirection > 0) {
      pixel.show();
      allHidden = false;
    } else {
      pixel.hide();
      allHidden = allHidden && pixel.isHidden;
    }

    pixel.draw(ctx);
  });

  ctaPixelState.ticker += ctaPixelState.animationDirection;

  if (ctaPixelState.animationDirection < 0 && allHidden) {
    ctaPixelState.ticker = 0;
  }
}

function startCtaPixelAnimation() {
  if (!ctaSection || !ctaPixelCanvas || reducedMotionQuery.matches) {
    return;
  }

  if (!ctaPixelState.width || !ctaPixelState.height) {
    resizeCtaPixelCanvas();
  }

  if (ctaPixelState.isRunning) {
    return;
  }

  ctaPixelState.isRunning = true;
  ctaPixelState.lastTime = 0;
  animateCtaPixels();
}

function stopCtaPixelAnimation() {
  ctaPixelState.isRunning = false;

  if (ctaPixelState.request) {
    cancelAnimationFrame(ctaPixelState.request);
    ctaPixelState.request = null;
  }
}

function setupCtaPixelBackground() {
  if (!ctaSection || !ctaPixelCanvas || reducedMotionQuery.matches) {
    return;
  }

  resizeCtaPixelCanvas();

  if ("ResizeObserver" in window) {
    const resizeObserver = new ResizeObserver(() => {
      resizeCtaPixelCanvas();

      if (ctaPixelState.isRunning && !ctaPixelState.request) {
        animateCtaPixels();
      }
    });

    resizeObserver.observe(ctaSection);
  }

  if ("IntersectionObserver" in window) {
    const ctaPixelObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          startCtaPixelAnimation();
          return;
        }

        stopCtaPixelAnimation();
      },
      { rootMargin: "120px 0px", threshold: 0 }
    );

    ctaPixelObserver.observe(ctaSection);
    return;
  }

  startCtaPixelAnimation();
}

let activeCertificateButton = null;

function openCertificatePreview(button) {
  activeCertificateButton = button;
  certificatesModalImage.src = button.dataset.certificateSrc;
  certificatesModalImage.alt = button.dataset.certificateTitle;
  certificatesModalCaption.textContent = button.dataset.certificateTitle;
  certificatesModal.classList.add("is-open");
  certificatesModal.setAttribute("aria-hidden", "false");
  certificatesModalBackdrop.focus();
}

function closeCertificatePreview() {
  if (!certificatesModal.classList.contains("is-open")) {
    return;
  }

  certificatesModal.classList.remove("is-open");
  certificatesModal.setAttribute("aria-hidden", "true");
  certificatesModalImage.removeAttribute("src");
  certificatesModalImage.alt = "";
  certificatesModalCaption.textContent = "";

  if (activeCertificateButton) {
    activeCertificateButton.focus();
    activeCertificateButton = null;
  }
}

if (reducedMotionQuery.matches) {
  revealSkills();
  skillSteps.forEach(revealSkillStep);
  revealCertificates();
  revealCta();
} else if ("IntersectionObserver" in window) {
  const skillsObserver = new IntersectionObserver(
    (entries) => {
      if (!mobileSkillsQuery.matches && entries.some((entry) => entry.isIntersecting)) {
        revealSkills();
        skillsObserver.disconnect();
      }
    },
    { rootMargin: "0px 0px -50% 0px", threshold: 0 }
  );

  skillsObserver.observe(skillsStage);

  const mobileSkillsStageObserver = new IntersectionObserver(
    (entries) => {
      if (mobileSkillsQuery.matches && entries.some((entry) => entry.isIntersecting)) {
        revealSkills();
        mobileSkillsStageObserver.disconnect();
      }
    },
    { threshold: 0 }
  );

  mobileSkillsStageObserver.observe(skillsStage);

  const skillStepObserver = new IntersectionObserver(
    (entries) => {
      if (!mobileSkillsQuery.matches) {
        return;
      }

      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          revealSkills();
          revealSkillStep(entry.target);
          skillStepObserver.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -45% 0px", threshold: 0 }
  );

  skillSteps.forEach((step) => skillStepObserver.observe(step));

  if (certificatesStage) {
    const certificatesObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealCertificates();
          certificatesObserver.disconnect();
        }
      },
      { rootMargin: "0px 0px -30% 0px", threshold: 0 }
    );

    certificatesObserver.observe(certificatesStage);
  }

  if (ctaSection) {
    const ctaObserver = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          revealCta();
          ctaObserver.disconnect();
        }
      },
      { rootMargin: "0px 0px -40% 0px", threshold: 0 }
    );

    ctaObserver.observe(ctaSection);
  }
} else {
  window.addEventListener(
    "scroll",
    () => {
      const rect = skillsStage.getBoundingClientRect();

      if (!mobileSkillsQuery.matches && rect.top <= window.innerHeight * 0.5) {
        revealSkills();
      }

      if (mobileSkillsQuery.matches) {
        skillSteps.forEach((step) => {
          const stepRect = step.getBoundingClientRect();

          if (stepRect.top < window.innerHeight * 0.55) {
            revealSkillStep(step);
          }
        });
      }

      if (certificatesStage && certificatesStage.getBoundingClientRect().top < window.innerHeight * 0.7) {
        revealCertificates();
      }

      if (ctaSection && ctaSection.getBoundingClientRect().top < window.innerHeight * 0.6) {
        revealCta();
      }
    },
    { passive: true }
  );
}

certificateViewButtons.forEach((button) => {
  button.addEventListener("click", () => openCertificatePreview(button));
});

document.addEventListener("click", (event) => {
  const menuButton = event.target.closest(".menu");

  if (!menuButton) {
    return;
  }

  event.preventDefault();
  toggleMenu();
});

siteMenuLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetName = link.dataset.menuTarget;

    closeMenu();
    requestAnimationFrame(() => {
      requestAnimationFrame(() => scrollToMenuTarget(targetName));
    });
  });
});

if (siteMenuScrim) {
  siteMenuScrim.addEventListener("click", closeMenu);
}

if (siteMenuClose) {
  siteMenuClose.addEventListener("click", closeMenu);
}

if (certificatesModalBackdrop) {
  certificatesModalBackdrop.addEventListener("click", closeCertificatePreview);
}

window.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeCertificatePreview();
    closeMenu();
  }
});

measureCertificateCards();
syncNavTheme();
syncProjects();
window.addEventListener("load", () => {
  measureCertificateCards();
  syncNavTheme();
  syncProjects();
  requestAnimationFrame(syncProjects);
});
window.addEventListener("hashchange", () => {
  const targetName = getMenuTargetFromHash();

  if (targetName) {
    pendingHashTargetName = targetName;
    applyPendingHashTarget();
  }

  syncNavTheme();
  syncProjects();
  requestAnimationFrame(syncProjects);
});
window.addEventListener("resize", () => {
  measureTransition();
  measureCertificateCards();
  resizeCtaPixelCanvas();
  syncNavTheme();
  syncProjects();
  requestScrollSync();

  if (mask.style.display !== "none") {
    buildPixelMask();
  }
});
window.addEventListener("scroll", requestScrollSync, { passive: true });
window.addEventListener("scroll", requestProjectsSync, { passive: true });
window.addEventListener("scroll", syncNavTheme, { passive: true });
window.addEventListener("portfolio-language-change", () => {
  setMenuExpanded(document.body.classList.contains("is-menu-open"));
});
window.addEventListener("wheel", preventMenuScroll, { passive: false });
window.addEventListener("touchmove", preventMenuScroll, { passive: false });
window.addEventListener("keydown", preventMenuKeyScroll);
window.addEventListener("wheel", preventIntroScroll, { passive: false });
window.addEventListener("touchmove", preventIntroScroll, { passive: false });
window.addEventListener("keydown", preventIntroKeyScroll);

measureTransition();
syncScrollTransition();
syncNavTheme();
setupCtaPixelBackground();

pendingHashTargetName = initialMenuTargetName;

if (shouldSkipIntroForDeepLink) {
  completeIntroImmediately();
  pendingHashTargetName = null;
  scrollToInitialDeepLinkTarget(initialMenuTargetName);
} else {
  play();
}
