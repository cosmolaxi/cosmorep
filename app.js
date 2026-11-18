const navLinks = document.querySelectorAll('[data-view]');
const baseScreen = document.getElementById('base');
const mapScreen = document.getElementById('mapa');
const toast = document.getElementById('toast');
const nav = document.querySelector('.main-nav');
const menuToggle = document.querySelector('.menu-toggle');
let toastTimer;

function showView(view) {
  const isMap = view === 'mapa';
  baseScreen.hidden = isMap;
  mapScreen.hidden = !isMap;
  baseScreen.classList.toggle('active', !isMap);
  mapScreen.classList.toggle('active', isMap);
  document.querySelectorAll('.nav-link').forEach((link) => {
    link.classList.toggle('active', link.dataset.view === view);
  });
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
  if (isMap) history.replaceState(null, '', '#mapa');
  else history.replaceState(null, '', '#base');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navLinks.forEach((link) => link.addEventListener('click', (event) => {
  event.preventDefault();
  showView(link.dataset.view);
}));

document.getElementById('portalButton').addEventListener('click', () => showView('mapa'));

document.querySelectorAll('.planet-node').forEach((planet) => {
  planet.addEventListener('click', () => {
    toast.textContent = `${planet.dataset.planet} — planeta de demonstração. As aventuras estarão disponíveis em uma próxima etapa.`;
    toast.classList.add('show');
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(() => toast.classList.remove('show'), 3200);
  });
});

menuToggle.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(open));
});

if (window.location.hash === '#mapa') showView('mapa');
