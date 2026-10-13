const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.innerHTML = open ? '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m5 5 14 14M19 5 5 19"/></svg>' : '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.innerHTML = '<svg class="icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18M3 12h18M3 18h18"/></svg>'; menu.setAttribute('aria-label', 'Open navigation');
}));
if ('IntersectionObserver' in window) {
  if (!reducedMotion) document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    observer.unobserve(entry.target);
  }), { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}
const dialog = document.querySelector('#info-dialog');
function showInfo(label, title, description) {
  document.querySelector('#dialog-label').textContent = label;
  document.querySelector('#dialog-title').textContent = title;
  document.querySelector('#dialog-description').textContent = description;
  dialog.showModal();
}
document.querySelectorAll('.dialog-close,#dialog-done').forEach(button => button.addEventListener('click', () => dialog.close()));
dialog.addEventListener('click', e => { if (e.target === dialog) { const r = dialog.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) dialog.close(); } });
document.querySelector('#join-button')?.addEventListener('click', () => showInfo('MEMBERSHIP', 'Your next chapter starts here.', 'Membership is open to all tertiary students in Singapore and worldwide. Membership will open after our first activity with NUSX. Registration is not active yet.'));
document.querySelector('.footer-contact')?.addEventListener('click', () => showInfo('CONTACT NUSX CLUB', 'Let’s connect.', 'Official club contact details will be added here once available. You can also visit our partner at nusx.edu.sg using the link in the footer.'));



// Joining stays closed until the first NUSX activity.
document.querySelectorAll('[data-join-soon]').forEach(button => {
  button.addEventListener('click', () => showInfo(
    'MEMBERSHIP',
    'Coming Soon',
    'Membership will open after our first activity with NUSX. Stay tuned for registration details.'
  ));
});

// A bounded, keyboard-accessible graphic; page scrolling remains available on touch.
const ticket = document.querySelector('[data-drag-ticket]');
if (ticket) {
  let origin = null, position = { x: 0, y: 0 };
  const clamp = value => Math.max(-35, Math.min(35, value));
  const renderTicket = () => { ticket.style.translate = `${position.x}px ${position.y}px`; };
  ticket.addEventListener('pointerdown', event => {
    if (event.button !== 0) return;
    origin = { x: event.clientX - position.x, y: event.clientY - position.y };
    ticket.setPointerCapture(event.pointerId);
    ticket.classList.add('dragging');
  });
  ticket.addEventListener('pointermove', event => {
    if (!origin) return;
    position = { x: clamp(event.clientX - origin.x), y: clamp(event.clientY - origin.y) };
    renderTicket();
  });
  const endDrag = () => { origin = null; ticket.classList.remove('dragging'); };
  ticket.addEventListener('pointerup', endDrag);
  ticket.addEventListener('pointercancel', endDrag);
  ticket.addEventListener('lostpointercapture', endDrag);
  ticket.addEventListener('keydown', event => {
    const steps = { ArrowLeft: [-5, 0], ArrowRight: [5, 0], ArrowUp: [0, -5], ArrowDown: [0, 5] };
    if (!steps[event.key]) return;
    event.preventDefault();
    position = { x: clamp(position.x + steps[event.key][0]), y: clamp(position.y + steps[event.key][1]) };
    renderTicket();
  });
}
