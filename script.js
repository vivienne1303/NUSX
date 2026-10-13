const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
menu.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menu.setAttribute('aria-expanded', String(open));
  menu.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  menu.textContent = open ? '×' : '☰';
});
nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); menu.textContent = '☰'; menu.setAttribute('aria-label', 'Open navigation');
}));
if ('IntersectionObserver' in window) {
  if (!reducedMotion) document.documentElement.classList.add('js-motion');
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('visible');
    const counter = entry.target.querySelector('[data-count]');
    if (counter && !reducedMotion) {
      const target = Number(counter.dataset.count), start = performance.now();
      const tick = now => { const progress = Math.min((now-start)/1300, 1); counter.textContent = Math.round(target * (1-Math.pow(1-progress,3))).toLocaleString('en-SG'); if (progress < 1) requestAnimationFrame(tick); };
      requestAnimationFrame(tick);
    }
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
const events = [
  ['SOCIAL · 15 NOVEMBER 2025', 'Welcome Night 2025', 'Kick off the semester with new friends, live music, and good vibes. Open to all tertiary students. This event date has passed. Future event details will be announced here.'],
  ['WORKSHOP · 22 NOVEMBER 2025', 'Creative Futures Summit', 'A full-day summit on design, tech, and entrepreneurship — featuring speakers from top Singapore companies. This event date has passed. Future event details will be announced here.'],
  ['CULTURE · 6 DECEMBER 2025', 'International Night', 'Celebrate the diversity of our global student community with food, performances, and cultural showcases. This event date has passed. Future event details will be announced here.']
];
document.querySelectorAll('[data-event]').forEach(button => button.addEventListener('click', () => showInfo(...events[Number(button.dataset.event)])));
document.querySelector('#view-events')?.addEventListener('click', () => { document.querySelector('#events-status').hidden = false; document.querySelector('.event-grid').scrollIntoView({ behavior: reducedMotion ? 'instant' : 'smooth', block: 'start' }); });
document.querySelector('#join-button')?.addEventListener('click', () => showInfo('MEMBERSHIP', 'Your next chapter starts here.', 'Membership is open to all tertiary students in Singapore and worldwide. The membership registration link has not been provided yet. Please check back for the official application details.'));
document.querySelector('.footer-contact')?.addEventListener('click', () => showInfo('CONTACT NUSX CLUB', 'Let’s connect.', 'Official club contact details will be added here once available. You can also visit our partner at nusx.edu.sg using the link in the footer.'));
document.querySelectorAll('.social-link').forEach(button => button.addEventListener('click', () => showInfo('STAY CONNECTED', `NUSX Club on ${button.dataset.channel}`, `The official ${button.dataset.channel} profile link has not been provided yet. Check back here for the verified club account.`)));

const filters = document.querySelectorAll('[data-filter]');
filters.forEach(button => button.addEventListener('click', () => {
  const selected = button.dataset.filter;
  filters.forEach(filter => {
    const active = filter === button;
    filter.classList.toggle('selected', active);
    filter.setAttribute('aria-pressed', String(active));
  });
  let count = 0;
  document.querySelectorAll('[data-category]').forEach(card => {
    card.hidden = selected !== 'all' && card.dataset.category !== selected;
    if (!card.hidden) { count++; card.classList.add('visible'); }
  });
  document.querySelector('.filter-status').textContent = `Showing ${selected === 'all' ? 'all ' : ''}${count} event${count === 1 ? '' : 's'}`;
}));
