const phone = "5592999999999";
const publico = "Seu Público-alvo";
const message = encodeURIComponent(`Olá! Quero um diagnóstico para ${publico}`);
const whatsappLink = `https://wa.me/${phone}?text=${message}`;

const ctaHero = document.getElementById("ctaHero");
const ctaHeroPrimary = document.getElementById("ctaHeroPrimary");
const ctaFinal = document.getElementById("ctaFinal");
if (ctaHero) ctaHero.href = whatsappLink;
if (ctaHeroPrimary) ctaHeroPrimary.href = whatsappLink;
if (ctaFinal) ctaFinal.href = whatsappLink;

if (window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.utils.toArray(".section").forEach(section => {
    gsap.from(section, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: "power3.out",
      scrollTrigger: {
        trigger: section,
        start: "top 85%",
        toggleActions: "play none none reverse"
      }
    });
  });
}

const headerEl = document.getElementById("header");
const navToggle = document.querySelector(".nav-toggle");
window.addEventListener("scroll", () => {
  if (!headerEl) return;
  headerEl.classList.toggle("scrolled", window.scrollY > 60);
});
if (navToggle && headerEl) {
  navToggle.addEventListener("click", () => {
    headerEl.classList.toggle("open");
  });
  const navLinks = headerEl.querySelectorAll(".nav-links a");
  navLinks.forEach(a => a.addEventListener("click", () => headerEl.classList.remove("open")));
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) headerEl.classList.remove("open");
  });
}

const portfolioCarousel = document.getElementById("portfolioCarousel");
if (portfolioCarousel) {
  const track = portfolioCarousel.querySelector(".carousel-track");
  const slides = Array.from(track.children);
  const prevBtn = portfolioCarousel.querySelector(".carousel-prev");
  const nextBtn = portfolioCarousel.querySelector(".carousel-next");
  const dots = Array.from(portfolioCarousel.querySelectorAll(".carousel-dots button"));
  let index = 0;
  const update = () => {
    track.style.transform = `translateX(-${index * 100}%)`;
    dots.forEach((d, i) => d.classList.toggle("active", i === index));
  };
  const goTo = (i) => {
    index = (i + slides.length) % slides.length;
    update();
  };
  if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
  if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));
  dots.forEach((dot, i) => dot.addEventListener("click", () => goTo(i)));
  let auto = null;
  const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const start = () => {
    if (prefersReduced) return;
    stop();
    auto = setInterval(() => goTo(index + 1), 2500);
  };
  const stop = () => {
    if (auto) {
      clearInterval(auto);
      auto = null;
    }
  };
  portfolioCarousel.addEventListener("mouseenter", stop);
  portfolioCarousel.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stop();
    else start();
  });
  update();
  start();
}
