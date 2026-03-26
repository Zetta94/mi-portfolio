import { qsa } from '../utils/dom.js';

export function initInteractions() {
  qsa('.reveal-btn').forEach((button) => {
    button.addEventListener('click', () => {
      const container = button.closest('.flip-container');
      if (container) {
        container.classList.toggle('flipped');
      }
    });
  });

  qsa('.copy-btn').forEach((button) => {
    button.addEventListener('click', async () => {
      const codeElement = button.parentElement?.querySelector('code');
      if (!codeElement || !navigator.clipboard) {
        return;
      }

      try {
        await navigator.clipboard.writeText(codeElement.innerText);
        button.textContent = 'Copiado';
        setTimeout(() => {
          button.textContent = 'Copiar';
        }, 1500);
      } catch (error) {
        console.warn('No se pudo copiar el contenido.', error);
      }
    });
  });
}