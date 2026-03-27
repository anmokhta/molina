const yearEl = document.getElementById("year");
if (yearEl) {
  yearEl.textContent = String(new Date().getFullYear());
}

const carousel = document.querySelector("[data-carousel]");
if (carousel) {
  const slides = Array.from(carousel.querySelectorAll("[data-slide]"));
  const controls = document.querySelector("#carousel-controls");
  const dotsRoot = controls?.querySelector("[data-dots]");
  const prevBtn = carousel.querySelector("[data-prev]");
  const nextBtn = carousel.querySelector("[data-next]");
  let index = 0;
  let timerId = null;

  function show(i) {
    index = (i + slides.length) % slides.length;
    slides.forEach((slide, j) => {
      slide.classList.toggle("is-active", j === index);
    });
    if (dotsRoot) {
      dotsRoot.querySelectorAll(".carousel-dot").forEach((dot, j) => {
        dot.classList.toggle("is-active", j === index);
      });
    }
    const activeSlot = slides[index].querySelector(".service-header-slot");
    if (controls && activeSlot) {
      activeSlot.appendChild(controls);
    }
  }

  if (dotsRoot) {
    slides.forEach((slide, i) => {
      const title = slide.querySelector(".service-title")?.textContent?.trim() || `Service ${i + 1}`;
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = i === 0 ? "carousel-dot is-active" : "carousel-dot";
      dot.setAttribute("aria-label", `Show ${title}`);
      dot.addEventListener("click", () => {
        show(i);
        restartAuto();
      });
      dotsRoot.appendChild(dot);
    });
  }

  function restartAuto() {
    if (timerId) clearInterval(timerId);
    timerId = setInterval(() => show(index + 1), 6000);
  }

  prevBtn?.addEventListener("click", () => {
    show(index - 1);
    restartAuto();
  });

  nextBtn?.addEventListener("click", () => {
    show(index + 1);
    restartAuto();
  });

  show(0);
  if (slides.length > 1) restartAuto();
}
