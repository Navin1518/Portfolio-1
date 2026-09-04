/* =====================================================
   PORTFOLIO STYLESHEET
   Structure: Variables -> Base -> Header -> Hero ->
   Sections -> Skills -> Projects -> Contact -> Footer ->
   Animations -> Responsive
   ===================================================== */

/* -----------------------------------------------------
   1. CSS VARIABLES (Design Tokens)
   Dark mode is the default theme (applied on <html>).
   Light mode values are under [data-theme="light"].
   ----------------------------------------------------- */
:root {
  /* Change primary color here — this drives buttons, links, accents */
  --primary-color: #E8B339;      /* muted gold accent */
  --primary-color-dim: #B98F2A;  /* darker shade, used for hover/borders */

  --bg-color: #0F1419;           /* main background (dark) */
  --bg-alt: #151B22;             /* slightly lighter panel background */
  --text-color: #E9EEF3;         /* main text */
  --text-muted: #8B98A5;         /* secondary / muted text */
  --card-bg: #161C24;            /* card background */
  --border-color: #262E38;       /* subtle borders */

  --font-heading: "Space Grotesk", sans-serif;
  --font-body: "Inter", sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --max-width: 1080px;
  --radius: 10px;
  --transition: 0.25s ease;
}

/* Light theme overrides — toggled via JS by setting data-theme="light" on <html> */
[data-theme="light"] {
  --bg-color: #F7F6F2;
  --bg-alt: #FFFFFF;
  --text-color: #1B2027;
  --text-muted: #5B6470;
  --card-bg: #FFFFFF;
  --border-color: #E3E0D8;
  --primary-color-dim: #C99A24;
}

/* -----------------------------------------------------
   2. BASE / RESET
   ----------------------------------------------------- */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  scroll-behavior: smooth;
}

body {
  font-family: var(--font-body);
  background-color: var(--bg-color);
  color: var(--text-color);
  line-height: 1.6;
  transition: background-color var(--transition), color var(--transition);
  /* Faint dot-grid texture, a nod to code-editor grids */
  background-image: radial-gradient(var(--border-color) 1px, transparent 1px);
  background-size: 28px 28px;
}

img {
  max-width: 100%;
  display: block;
}

a {
  text-decoration: none;
  color: inherit;
}

ul {
  list-style: none;
}

h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.2;
}

.section-inner,
.hero-inner {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 24px;
}

/* Keyboard focus visibility */
a:focus-visible,
button:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 3px;
}

/* Respect reduced-motion preference */
@media (prefers-reduced-motion: reduce) {
  html {
    scroll-behavior: auto;
  }
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}

/* -----------------------------------------------------
   3. HEADER / NAVBAR
   ----------------------------------------------------- */
.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  background-color: rgba(15, 20, 25, 0.85);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid var(--border-color);
}

[data-theme="light"] .site-header {
  background-color: rgba(247, 246, 242, 0.85);
}

.navbar {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 16px 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;
}

.logo {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  white-space: nowrap;
}

.logo-accent {
  color: var(--primary-color);
}

/* Blinking terminal-style cursor next to the logo */
.cursor-blink {
  color: var(--primary-color);
  animation: blink 1.1s steps(1) infinite;
}

.nav-links {
  display: flex;
  gap: 28px;
  flex: 1;
  justify-content: center;
}

.nav-link {
  font-size: 0.95rem;
  font-weight: 500;
  color: var(--text-muted);
  position: relative;
  padding-bottom: 4px;
  transition: color var(--transition);
}

.nav-link::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: width var(--transition);
}

.nav-link:hover {
  color: var(--text-color);
}

.nav-link:hover::after {
  width: 100%;
}

.menu-toggle {
  display: none;
  flex-direction: column;
  justify-content: space-between;
  width: 24px;
  height: 18px;
  background: none;
  border: none;
  cursor: pointer;
}

.menu-toggle span {
  display: block;
  height: 2px;
  width: 100%;
  background-color: var(--text-color);
  border-radius: 2px;
}

/* Dark/light mode toggle button */
.theme-toggle {
  background: none;
  border: 1px solid var(--border-color);
  border-radius: 50%;
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text-color);
  transition: border-color var(--transition), transform var(--transition);
  flex-shrink: 0;
}

.theme-toggle:hover {
  border-color: var(--primary-color);
  transform: rotate(15deg);
}

.theme-icon {
  width: 18px;
  height: 18px;
}

/* -----------------------------------------------------
   4. HERO SECTION
   ----------------------------------------------------- */
.hero {
  padding: 96px 0 80px;
}

.hero-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 48px;
}

.hero-text {
  flex: 1;
  max-width: 560px;
}

.hero-eyebrow {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--primary-color);
  margin-bottom: 16px;
}

.hero-heading {
  font-size: clamp(2.1rem, 4.5vw, 3.2rem);
  margin-bottom: 16px;
}

.hero-name {
  color: var(--primary-color);
  display: block;
}

.hero-subheading {
  font-size: 1.05rem;
  color: var(--text-color);
  margin-bottom: 12px;
  max-width: 46ch;
}

.hero-tagline {
  font-size: 0.98rem;
  color: var(--text-muted);
  margin-bottom: 32px;
  max-width: 46ch;
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

/* Circular profile image, WhatsApp/Instagram avatar style */
.hero-visual {
  flex-shrink: 0;
}

.profile-ring {
  width: 260px;
  height: 260px;
  border-radius: 50%;
  padding: 6px;
  background: conic-gradient(
    var(--primary-color),
    var(--border-color) 65%,
    var(--primary-color)
  );
  display: flex;
  align-items: center;
  justify-content: center;
}

.profile-img {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid var(--bg-color);
}

/* -----------------------------------------------------
   5. BUTTONS (shared)
   ----------------------------------------------------- */
.btn {
  display: inline-block;
  padding: 12px 26px;
  border-radius: var(--radius);
  font-weight: 600;
  font-size: 0.95rem;
  transition: transform var(--transition), background-color var(--transition), border-color var(--transition);
  border: 1px solid transparent;
}

.btn:hover {
  transform: translateY(-2px);
}

.btn-primary {
  background-color: var(--primary-color);
  color: #14181D;
}

.btn-primary:hover {
  background-color: var(--primary-color-dim);
}

.btn-secondary {
  border-color: var(--border-color);
  color: var(--text-color);
}

.btn-secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-outline {
  border-color: var(--border-color);
  color: var(--text-color);
}

.btn-outline:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.btn-sm {
  padding: 8px 16px;
  font-size: 0.85rem;
}

/* -----------------------------------------------------
   6. GENERIC SECTION SPACING
   ----------------------------------------------------- */
.section {
  padding: 72px 0;
  border-top: 1px solid var(--border-color);
}

.section-heading {
  font-size: 1.8rem;
  margin-bottom: 28px;
}

/* -----------------------------------------------------
   7. ABOUT SECTION
   ----------------------------------------------------- */
.about-text {
  max-width: 68ch;
  color: var(--text-muted);
  font-size: 1.02rem;
}

/* -----------------------------------------------------
   8. SKILLS SECTION
   ----------------------------------------------------- */
.skills-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.skill-tag {
  font-family: var(--font-mono);
  font-size: 0.85rem;
  padding: 10px 16px;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 999px;
  color: var(--text-color);
  transition: border-color var(--transition), transform var(--transition), color var(--transition);
}

.skill-tag:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* -----------------------------------------------------
   9. PROJECTS SECTION
   ----------------------------------------------------- */
.projects-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.project-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  padding: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  transition: border-color var(--transition), transform var(--transition);
}

.project-card:hover {
  border-color: var(--primary-color-dim);
  transform: translateY(-4px);
}

.project-title {
  font-size: 1.15rem;
  margin-bottom: 10px;
}

.project-desc {
  font-size: 0.92rem;
  color: var(--text-muted);
  margin-bottom: 16px;
}

.project-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 20px;
}

.tech-tag {
  font-family: var(--font-mono);
  font-size: 0.75rem;
  color: var(--primary-color);
  border: 1px solid var(--border-color);
  padding: 4px 10px;
  border-radius: 6px;
}

.project-card-links {
  display: flex;
  gap: 10px;
}

/* -----------------------------------------------------
   10. CONTACT SECTION
   ----------------------------------------------------- */
.contact-text {
  color: var(--text-muted);
  max-width: 60ch;
  margin-bottom: 28px;
}

.social-links {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius);
  font-size: 0.9rem;
  font-weight: 500;
  transition: border-color var(--transition), color var(--transition), transform var(--transition);
}

.social-link svg {
  width: 18px;
  height: 18px;
}

.social-link:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* -----------------------------------------------------
   11. FOOTER
   ----------------------------------------------------- */
.site-footer {
  border-top: 1px solid var(--border-color);
  padding: 28px 24px;
  text-align: center;
  font-size: 0.85rem;
  color: var(--text-muted);
}

/* -----------------------------------------------------
   12. ANIMATIONS
   ----------------------------------------------------- */
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}

/* Fade-in-on-scroll: JS toggles the .visible class via IntersectionObserver */
.fade-section {
  opacity: 0;
  transform: translateY(16px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-section.visible {
  opacity: 1;
  transform: translateY(0);
}

/* -----------------------------------------------------
   13. RESPONSIVE / MOBILE-FIRST ADJUSTMENTS
   ----------------------------------------------------- */
@media (max-width: 900px) {
  .projects-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 720px) {
  .menu-toggle {
    display: flex;
    order: 3;
  }

  .nav-links {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background-color: var(--bg-color);
    border-bottom: 1px solid var(--border-color);
    flex-direction: column;
    align-items: center;
    gap: 0;
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition);
  }

  .nav-links.open {
    max-height: 320px;
  }

  .nav-links li {
    width: 100%;
    text-align: center;
  }

  .nav-link {
    display: block;
    padding: 16px 0;
  }

  .nav-link::after {
    display: none;
  }

  .hero-inner {
    flex-direction: column-reverse;
    text-align: center;
    gap: 32px;
  }

  .hero-text {
    max-width: 100%;
  }

  .hero-subheading,
  .hero-tagline {
    max-width: 100%;
    margin-left: auto;
    margin-right: auto;
  }

  .hero-buttons {
    justify-content: center;
  }

  .profile-ring {
    width: 200px;
    height: 200px;
  }

  .projects-grid {
    grid-template-columns: 1fr;
  }

  .skills-grid,
  .social-links {
    justify-content: center;
  }
}

@media (max-width: 420px) {
  .hero {
    padding: 64px 0 56px;
  }

  .section {
    padding: 56px 0;
  }
}