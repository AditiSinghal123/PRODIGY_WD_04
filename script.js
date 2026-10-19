const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav-link');

menuToggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  menuToggle.textContent = isOpen ? '×' : '☰';
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation');
    menuToggle.textContent = '☰';
  });
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.textContent = '☰';
  }
});

document.getElementById('year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

const sections = document.querySelectorAll('main section[id]');
const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`));
    }
  });
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach(section => activeObserver.observe(section));

const topButton = document.getElementById('backToTop');
window.addEventListener('scroll', () => topButton.classList.toggle('visible', window.scrollY > 500));
topButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

const rotatingText = document.getElementById('rotatingText');
const words = ['web', 'AI & ML', 'new ideas', 'the future'];
let wordIndex = 0;
setInterval(() => {
  wordIndex = (wordIndex + 1) % words.length;
  rotatingText.style.opacity = '0';
  setTimeout(() => {
    rotatingText.textContent = words[wordIndex];
    rotatingText.style.opacity = '1';
  }, 180);
}, 2300);
rotatingText.style.transition = 'opacity .18s ease';
