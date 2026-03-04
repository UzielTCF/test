const MOBILE_BREAKPOINT = 769;

// Configura todos los componentes cuando el DOM está listo.
document.addEventListener("DOMContentLoaded", () => {
  setupNewsletterForm();
  setupMenuToggle();
  setupTopCarousel();
  setupHeroCarousel();
});

function setupNewsletterForm() {
  const form = document.getElementById("formBoletin");
  if (!form) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Gracias por suscribirte");
    form.reset();
  });
}

function setupMenuToggle() {
  const toggle = document.getElementById("menuToggle");
  const mobileNav = document.getElementById("mobileNav");

  if (!toggle || !mobileNav) return;

  toggle.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= MOBILE_BREAKPOINT) {
      mobileNav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setupTopCarousel() {
  const carousel = document.getElementById("topCarousel");
  const slidesWrapper = document.getElementById("topSlides");
  const prevButton = document.getElementById("topPrev");
  const nextButton = document.getElementById("topNext");

  if (!carousel || !slidesWrapper || !prevButton || !nextButton) return;

  const slides = Array.from(slidesWrapper.children);
  if (!slides.length) return;

  let currentIndex = 0;

  const updatePosition = () => {
    const slideWidth = carousel.clientWidth || slides[0].clientWidth;
    slidesWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  const goTo = (newIndex) => {
    currentIndex = (newIndex + slides.length) % slides.length;
    updatePosition();
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

  let autoplayId = startAutoplay();

  function startAutoplay() {
    return setInterval(handleNext, 4800);
  }

  function restartAutoplay() {
    clearInterval(autoplayId);
    autoplayId = startAutoplay();
  }

  carousel.addEventListener("mouseenter", () => clearInterval(autoplayId));
  carousel.addEventListener("mouseleave", () => {
    clearInterval(autoplayId);
    autoplayId = startAutoplay();
  });

  window.addEventListener("resize", updatePosition);
  updatePosition();
}

function setupHeroCarousel() {
  const carousel = document.querySelector(".carousel");
  if (!carousel) return;

  const slidesWrapper = carousel.querySelector(".slides");
  const prevButton = carousel.querySelector(".prev");
  const nextButton = carousel.querySelector(".next");

  if (!slidesWrapper || !prevButton || !nextButton) return;

  const slides = Array.from(slidesWrapper.children);
  if (!slides.length) return;

  let currentIndex = 0;

  const updatePosition = () => {
    const slideWidth = carousel.clientWidth || slides[0].clientWidth;
    slidesWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  };

  const move = (direction) => {
    currentIndex = (currentIndex + direction + slides.length) % slides.length;
    updatePosition();
  };

  const handleNext = () => move(1);
  const handlePrev = () => move(-1);

  nextButton.addEventListener("click", () => {
    handleNext();
    restartAutoplay();
  });

  prevButton.addEventListener("click", () => {
    handlePrev();
    restartAutoplay();
  });

  let autoplayId = startAutoplay();

  function startAutoplay() {
    return setInterval(handleNext, 5000);
  }

  function restartAutoplay() {
    clearInterval(autoplayId);
    autoplayId = startAutoplay();
  }

  carousel.addEventListener("mouseenter", () => clearInterval(autoplayId));
  carousel.addEventListener("mouseleave", () => {
    clearInterval(autoplayId);
    autoplayId = startAutoplay();
  });

  window.addEventListener("resize", updatePosition);
  updatePosition();
}
