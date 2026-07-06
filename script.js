document.documentElement.classList.add("js");

const progressBar = document.querySelector(".scroll-progress");
const navLinks = [...document.querySelectorAll(".site-nav a")];
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);
const revealElements = document.querySelectorAll(".reveal");

function updateScrollProgress() {
  const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
}

function updateActiveNav() {
  let currentSection = null;

  for (let index = sections.length - 1; index >= 0; index -= 1) {
    const section = sections[index];
    const sectionTop = section.offsetTop - 140;

    if (window.scrollY >= sectionTop) {
      currentSection = section;
      break;
    }
  }

  navLinks.forEach((link) => {
    const isActive = currentSection && link.getAttribute("href") === `#${currentSection.id}`;
    link.classList.toggle("is-active", Boolean(isActive));
  });
}

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -80px 0px",
  },
);

revealElements.forEach((element) => revealObserver.observe(element));

window.addEventListener("scroll", () => {
  updateScrollProgress();
  updateActiveNav();
});

window.addEventListener("resize", updateScrollProgress);

updateScrollProgress();
updateActiveNav();
