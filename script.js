const MOBILE_BREAKPOINT = 769;

// Configura componentes cuando el DOM está listo.
document.addEventListener("DOMContentLoaded", () => {
  setupNewsletterForm();
  setupMenuToggle();
  setupHeroCarousel();
});

function setupNewsletterForm() {
  const form = document.getElementById("formBoletin");
  const messageEl = document.getElementById("newsletterMessage");
  if (!form || !messageEl) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    // Simula envío asíncrono (reemplaza alert()).
    messageEl.hidden = false;
    messageEl.textContent = "Enviando...";

    // Aquí puedes llamar a una API real (Formspree, Netlify Forms, etc.).
    // Simulamos respuesta exitosa.
    setTimeout(() => {
      messageEl.textContent = "¡Gracias! Te hemos suscrito correctamente. Revisa tu correo para confirmar.";
      form.reset();
      if (submitBtn) submitBtn.disabled = false;

      // Ocultar el mensaje después de 6 segundos.
      setTimeout(() => {
        messageEl.hidden = true;
        messageEl.textContent = "";
      }, 6000);
    }, 900);
  });
}

function setupMenuToggle() {
  const toggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
    if (isOpen) mobileNav.querySelector('a')?.focus();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupHeroCarousel() {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const slidesWrapper = carousel.querySelector(".slides");
  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");
  const statusElId = "carouselStatus";
  let statusEl = document.getElementById(statusElId);

  if (!slidesWrapper || !prevButton || !nextButton) return;

  const slides = Array.from(slidesWrapper.querySelectorAll("img, .slide"));
  if (!slides.length) return;

  // Make carousel keyboard-focusable and accessible
  carousel.setAttribute("tabindex", "0");
  carousel.setAttribute("role", "region");
  carousel.setAttribute("aria-roledescription", "carrusel");

  // Create live region if not present
  if (!statusEl) {
    statusEl = document.createElement("div");
    statusEl.id = statusElId;
    statusEl.className = "sr-only";
    statusEl.setAttribute("role", "status");
    statusEl.setAttribute("aria-live", "polite");
    carousel.appendChild(statusEl);
  }

  // Add slide attributes and build indicators
  let indicators = carousel.querySelector(".carousel-indicators");
  if (!indicators) {
    indicators = document.createElement("div");
    indicators.className = "carousel-indicators";
    carousel.appendChild(indicators);
  }

  slides.forEach((slide, i) => {
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "diapositiva");
    slide.setAttribute("aria-label", `${i + 1} de ${slides.length}`);

    // Indicator button
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "indicator";
    btn.setAttribute("aria-label", `Ir a la imagen ${i + 1}`);
    btn.dataset.index = String(i);
    btn.addEventListener("click", () => {
      goTo(i);
      restartAutoplay();
      btn.focus();
    });
    indicators.appendChild(btn);
  });

  let currentIndex = 0;

  const updateUI = () => {
    const slideWidth = carousel.clientWidth || slides[0].clientWidth;
    slidesWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;

    // Update indicators
    const buttons = indicators.querySelectorAll("button.indicator");
    buttons.forEach((b) => b.removeAttribute("aria-current"));
    const active = buttons[currentIndex];
    if (active) active.setAttribute("aria-current", "true");

    // Update status for screen readers
    const alt = slides[currentIndex].getAttribute("alt") || slides[currentIndex].textContent || "Imagen";
    statusEl.textContent = `Imagen ${currentIndex + 1} de ${slides.length}: ${alt}`;
  };

  const goTo = (newIndex) => {
    currentIndex = (newIndex + slides.length) % slides.length;
    updateUI();
  };

  const handleNext = () => goTo(currentIndex + 1);
  const handlePrev = () => goTo(currentIndex - 1);

  nextButton.addEventListener("click", () => {
    handleNext();
    restartAutoplay();
  });

  prevButton.addEventListener("click", () => {
    handlePrev();
    restartAutoplay();
  });

  // Keyboard support when carousel is focused
  carousel.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") {
      e.preventDefault();
      handleNext();
      restartAutoplay();
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      handlePrev();
      restartAutoplay();
    }
  });

  // Autoplay with respect to prefers-reduced-motion
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let autoplayId = null;

  function startAutoplay() {
    if (prefersReduced) return null;
    return setInterval(() => {
      handleNext();
    }, 5000);
  }

  function restartAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = startAutoplay();
  }

  // Pause on hover, focus
  carousel.addEventListener("mouseenter", () => { if (autoplayId) clearInterval(autoplayId); });
  carousel.addEventListener("mouseleave", () => { restartAutoplay(); });
  carousel.addEventListener("focusin", () => { if (autoplayId) clearInterval(autoplayId); });
  carousel.addEventListener("focusout", () => { restartAutoplay(); });

  // Pause when window/tab is hidden
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      if (autoplayId) clearInterval(autoplayId);
    } else {
      restartAutoplay();
    }
  });

  // Responsiveness
  window.addEventListener("resize", updateUI);

  // Start
  updateUI();
  autoplayId = startAutoplay();
}
