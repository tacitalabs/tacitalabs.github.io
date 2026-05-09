// Markdown site behaviors. Each component is self-contained so removing
// or adding one is a small, isolated change.

// ---------------------------------------------------------------------------
// Carousels: every <section class="carousel"> on the page gets its own
// prev/next/dot navigation. Multiple carousels per page is fine -- they
// are initialized independently.

(() => {
  document.querySelectorAll('.carousel').forEach((carousel) => {
    const slides = Array.from(carousel.querySelectorAll('.carousel-slide'));
    if (slides.length === 0) return;

    const prev = carousel.querySelector('.carousel-nav.prev');
    const next = carousel.querySelector('.carousel-nav.next');
    const dotsWrap = carousel.querySelector('.carousel-dots');

    let index = 0;

    const dots = slides.map((_, i) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'carousel-dot';
      btn.setAttribute('aria-label', `Go to slide ${i + 1}`);
      btn.addEventListener('click', () => show(i));
      if (dotsWrap) dotsWrap.appendChild(btn);
      return btn;
    });

    function show(nextIndex) {
      index = (nextIndex + slides.length) % slides.length;
      slides.forEach((slide, i) => {
        slide.classList.toggle('is-active', i === index);
      });
      dots.forEach((dot, i) => {
        dot.classList.toggle('is-active', i === index);
        dot.setAttribute('aria-pressed', i === index ? 'true' : 'false');
      });
    }

    if (prev) prev.addEventListener('click', () => show(index - 1));
    if (next) next.addEventListener('click', () => show(index + 1));

    // Keyboard nav while any descendant of the carousel has focus
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        show(index - 1);
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        show(index + 1);
      }
    });

    // Show the first slide initially so the carousel isn't empty.
    show(0);
  });
})();
