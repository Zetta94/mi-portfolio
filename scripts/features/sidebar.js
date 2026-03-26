import { qs, toggleActive } from '../utils/dom.js';

export function initSidebar() {
  const sidebar = qs('[data-sidebar]');
  const contactToggleBtn = qs('#contact-toggle');

  if (!sidebar || !contactToggleBtn) {
    return;
  }

  contactToggleBtn.addEventListener('click', () => {
    toggleActive(sidebar);
    contactToggleBtn.setAttribute('aria-expanded', String(sidebar.classList.contains('active')));
  });
}