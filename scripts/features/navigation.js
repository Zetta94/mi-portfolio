import { qsa } from '../utils/dom.js';

export function initNavigation() {
    const navigationLinks = qsa('[data-nav-link]');
    const pages = qsa('[data-page]');
    const navigationTargets = qsa('[data-nav-target]');

    function activatePage(pageName) {
        const currentPage = document.querySelector('[data-page].active');
        const nextPage = document.querySelector(`[data-page="${pageName}"]`);

        if (!nextPage || currentPage === nextPage) {
            window.scrollTo(0, 0);
            return;
        }

        pages.forEach((page) => {
            page.classList.toggle('active', page.dataset.page === pageName);
        });

        nextPage.style.animation = 'none';
        void nextPage.offsetWidth;
        nextPage.style.animation = '';

        navigationLinks.forEach((link) => {
            const isActive = link.textContent.trim().toLowerCase() === pageName;
            link.classList.toggle('active', isActive);
            link.setAttribute('aria-current', isActive ? 'page' : 'false');
        });

        window.scrollTo(0, 0);
    }

    navigationLinks.forEach((link) => {
        link.addEventListener('click', () => {
            activatePage(link.textContent.trim().toLowerCase());
        });
    });

    navigationTargets.forEach((button) => {
        button.addEventListener('click', () => {
            activatePage(button.dataset.navTarget);
        });
    });
}