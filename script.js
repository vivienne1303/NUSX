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
