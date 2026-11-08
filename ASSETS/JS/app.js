const menuToggle = document.querySelector(".menu-toggle");
const navPanel = document.querySelector(".nav-panel");
const heroVideo = document.querySelector(".hero-video");
const heroClips = [
  "ASSETS/VIDEO/typing.mp4",
  "ASSETS/VIDEO/coding.mp4",
  "ASSETS/VIDEO/large-format-printing.mp4",
];

if (heroVideo) {
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let clipIndex = 0;

  function playHeroClip() {
    heroVideo.src = heroClips[clipIndex];
    heroVideo.load();
    heroVideo.play().catch(() => {});
  }

  if (!reduceMotion.matches) {
    heroVideo.addEventListener("ended", () => {
      clipIndex = (clipIndex + 1) % heroClips.length;
      playHeroClip();
    });
    playHeroClip();
  } else {
    heroVideo.src = heroClips[0];
    heroVideo.load();
  }
}

function setMenuOpen(isOpen) {
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Close navigation menu" : "Open navigation menu");
  navPanel.classList.toggle("is-open", isOpen);
}

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  setMenuOpen(!isOpen);
});

navPanel.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    setMenuOpen(false);
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    setMenuOpen(false);
    menuToggle.focus();
  }
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".navbar")) {
    setMenuOpen(false);
  }
});

const themeToggle = document.querySelector(".theme-toggle");
const pageRoot = document.documentElement;
let savedTheme = "light";

try {
  savedTheme = localStorage.getItem("sam-hector-theme") || "light";
} catch {
  savedTheme = "light";
}

pageRoot.dataset.theme = savedTheme;

function updateThemeToggle(theme) {
  const nextTheme = theme === "dark" ? "light" : "dark";
  const themeIcon = themeToggle.querySelector("i");
  themeIcon.className = theme === "dark" ? "bi bi-sun-fill" : "bi bi-moon-fill";
  themeToggle.setAttribute("aria-label", `Switch to ${nextTheme} theme`);
  themeToggle.title = `Switch to ${nextTheme} theme`;
}

if (themeToggle) {
  updateThemeToggle(savedTheme);
  themeToggle.addEventListener("click", () => {
    const nextTheme = pageRoot.dataset.theme === "dark" ? "light" : "dark";
    pageRoot.dataset.theme = nextTheme;
    updateThemeToggle(nextTheme);

    try {
      localStorage.setItem("sam-hector-theme", nextTheme);
    } catch {
      // Theme still works for the current page when storage is unavailable.
    }
  });
}

