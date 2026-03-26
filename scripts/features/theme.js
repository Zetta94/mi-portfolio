import { qs } from '../utils/dom.js';

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function applyTheme(mode, themeToggleBtn, themeToggleIcon) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleIcon) {
      themeToggleIcon.textContent = 'Tema oscuro';
    }
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', 'Cambiar a tema oscuro');
    }
    localStorage.setItem('theme', 'light');
    return;
  }

  document.body.classList.remove('light-mode');
  if (themeToggleIcon) {
    themeToggleIcon.textContent = 'Tema claro';
  }
  if (themeToggleBtn) {
    themeToggleBtn.setAttribute('aria-label', 'Cambiar a tema claro');
  }
  localStorage.setItem('theme', 'dark');
}

export function initTheme() {
  const themeToggleBtn = qs('#theme-toggle');
  const themeToggleIcon = qs('#theme-toggle-icon');

  applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'), themeToggleBtn, themeToggleIcon);

  if (!themeToggleBtn) {
    return;
  }

  themeToggleBtn.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('light-mode') ? 'dark' : 'light';
    applyTheme(nextTheme, themeToggleBtn, themeToggleIcon);
  });
}