const menuToggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector(".mobile-nav");
const yearEl = document.querySelector("#year");

if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

if (menuToggle && mobileNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", String(isOpen));
    mobileNav.setAttribute("aria-hidden", String(!isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      mobileNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      mobileNav.setAttribute("aria-hidden", "true");
    });
  });
}

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const dotsRoot = carousel.querySelector("[data-dots]");
  const prevBtn = carousel.querySelector("[data-prev]");
  const nextBtn = carousel.querySelector("[data-next]");
  let index = 0;
  let timerId = null;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, j) => {
      slide.classList.toggle("is-active", j === index);
    });
    const dots = dotsRoot?.querySelectorAll(".carousel-dot");
    dots?.forEach((dot, j) => {
      dot.classList.toggle("is-active", j === index);
    });
  }

  if (dotsRoot && slides.length) {
    slides.forEach((_, j) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot" + (j === 0 ? " is-active" : "");
      dot.setAttribute("aria-label", `Show review ${j + 1}`);
      dot.addEventListener("click", () => {
        show(j);
        resetAutoplay();
      });
      dotsRoot.appendChild(dot);
    });
  }

  function next() {
    show(index + 1);
  }

  function prev() {
    show(index - 1);
  }

  nextBtn?.addEventListener("click", () => {
    next();
    resetAutoplay();
  });
  prevBtn?.addEventListener("click", () => {
    prev();
    resetAutoplay();
  });

  function resetAutoplay() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(next, 7000);
  }

  if (slides.length > 1) {
    resetAutoplay();
  }
}
