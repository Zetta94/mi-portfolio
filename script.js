'use strict';

function qs(selector, scope) {
    return (scope || document).querySelector(selector);
}

function qsa(selector, scope) {
    return Array.from((scope || document).querySelectorAll(selector));
}

function toggleActive(element) {
    if (element) {
        element.classList.toggle('active');
    }
}

function initSidebar() {
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

function initTheme() {
    const themeToggleBtn = qs('#theme-toggle');
    const themeToggleIcon = qs('#theme-toggle-icon');
    const mobileThemeQuery = window.matchMedia('(max-width: 767px)');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme');

    function isMobileThemeLocked() {
        return mobileThemeQuery.matches;
    }

    function applyTheme(mode) {
        const nextMode = isMobileThemeLocked() ? 'dark' : mode;

        if (nextMode === 'light') {
            document.body.classList.add('light-mode');
            if (themeToggleIcon) {
                themeToggleIcon.textContent = 'Tema oscuro';
            }
            if (themeToggleBtn) {
                themeToggleBtn.setAttribute('aria-label', 'Cambiar a tema oscuro');
                themeToggleBtn.disabled = false;
            }
            localStorage.setItem('theme', 'light');
            return;
        }

        document.body.classList.remove('light-mode');
        if (themeToggleIcon) {
            themeToggleIcon.textContent = isMobileThemeLocked() ? 'Solo oscuro' : 'Tema claro';
        }
        if (themeToggleBtn) {
            themeToggleBtn.setAttribute('aria-label', isMobileThemeLocked() ? 'Tema oscuro fijo en móvil' : 'Cambiar a tema claro');
            themeToggleBtn.disabled = isMobileThemeLocked();
        }
        localStorage.setItem('theme', 'dark');
    }

    applyTheme(savedTheme || (prefersDark ? 'dark' : 'light'));

    if (!themeToggleBtn) {
        mobileThemeQuery.addEventListener('change', () => {
            applyTheme(localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light'));
        });
        return;
    }

    themeToggleBtn.addEventListener('click', () => {
        if (isMobileThemeLocked()) {
            applyTheme('dark');
            return;
        }

        applyTheme(document.body.classList.contains('light-mode') ? 'dark' : 'light');
    });

    mobileThemeQuery.addEventListener('change', () => {
        applyTheme(localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light'));
    });
}

function initNavigation() {
    const navigationLinks = qsa('[data-nav-link]');
    const pages = qsa('[data-page]');
    const navigationTargets = qsa('[data-nav-target]');

    function activatePage(pageName) {
        const currentPage = qs('[data-page].active');
        const nextPage = qs(`[data-page="${pageName}"]`);

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

function initTypedText() {
    if (!window.Typed || !qs('.typing-text')) {
        return;
    }

    new Typed('.typing-text', {
        strings: [
            'Backend con foco en producto, estabilidad y decisiones tecnicas sostenibles.',
            'Construyo APIs y servicios claros, mantenibles y listos para evolucionar.',
            'Me interesa el software que resuelve problemas reales y escala con criterio.'
        ],
        typeSpeed: 50,
        backSpeed: 24,
        backDelay: 1800,
        showCursor: false,
        loop: true
    });
}

function initInteractions() {
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
            const codeElement = button.parentElement ? button.parentElement.querySelector('code') : null;
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

function initTestimonials() {
    const testimonialsItems = qsa('[data-testimonials-item]');
    const modalContainer = qs('[data-modal-container]');
    const modalCloseBtn = qs('[data-modal-close-btn]');
    const overlay = qs('[data-overlay]');
    const modalImg = qs('[data-modal-img]');
    const modalTitle = qs('[data-modal-title]');
    const modalText = qs('[data-modal-text]');

    if (!testimonialsItems.length || !modalContainer || !modalCloseBtn || !overlay || !modalImg || !modalTitle || !modalText) {
        return;
    }

    function toggleModal() {
        modalContainer.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    testimonialsItems.forEach((item) => {
        item.addEventListener('click', () => {
            const avatar = qs('[data-testimonials-avatar]', item);
            const title = qs('[data-testimonials-title]', item);
            const text = qs('[data-testimonials-text]', item);

            if (!avatar || !title || !text) {
                return;
            }

            modalImg.src = avatar.src;
            modalImg.alt = avatar.alt;
            modalTitle.innerHTML = title.innerHTML;
            modalText.innerHTML = text.innerHTML;
            toggleModal();
        });
    });

    modalCloseBtn.addEventListener('click', toggleModal);
    overlay.addEventListener('click', toggleModal);
}

function initFiltering() {
    const select = qs('[data-select]');
    const selectItems = qsa('[data-select-item]');
    const selectValue = qs('[data-selecct-value]') || qs('[data-select-value]');
    const filterButtons = qsa('[data-filter-btn]');
    const filterItems = qsa('[data-filter-item]');

    function filterItemsByCategory(selectedValue) {
        filterItems.forEach((item) => {
            const itemCategory = item.dataset.category.toLowerCase();
            const shouldShow = selectedValue === 'todas' || selectedValue === itemCategory;
            item.classList.toggle('active', shouldShow);
        });
    }

    if (select && selectValue && selectItems.length) {
        select.addEventListener('click', () => {
            toggleActive(select);
        });

        selectItems.forEach((item) => {
            item.addEventListener('click', () => {
                const selectedValue = item.innerText.toLowerCase();
                selectValue.innerText = item.innerText;
                toggleActive(select);
                filterItemsByCategory(selectedValue);
            });
        });
    }

    let lastClickedButton = filterButtons.length ? filterButtons[0] : null;

    filterButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const selectedValue = button.innerText.toLowerCase();

            if (selectValue) {
                selectValue.innerText = button.innerText;
            }

            filterItemsByCategory(selectedValue);

            if (lastClickedButton) {
                lastClickedButton.classList.remove('active');
            }

            button.classList.add('active');
            lastClickedButton = button;
        });
    });
}

function initContactForm() {
    const form = qs('[data-form]');
    const formInputs = qsa('[data-form-input]');
    const formBtn = qs('.form-btn');
    const toast = qs('#toast');
    const defaultFormButtonMarkup = formBtn ? formBtn.innerHTML : '';

    function showToast(message) {
        if (!toast) {
            return;
        }

        toast.textContent = message;
        toast.classList.remove('hidden');
        toast.classList.add('show');

        setTimeout(() => {
            toast.classList.remove('show');
            toast.classList.add('hidden');
        }, 3000);
    }

    function validateInput(input) {
        const errorMessage = input.nextElementSibling;

        if (!input.validity.valid) {
            if (errorMessage) {
                errorMessage.textContent = input.validity.typeMismatch ? 'Ingrese un email valido' : 'Este campo es obligatorio';
            }
            return false;
        }

        if (errorMessage) {
            errorMessage.textContent = '';
        }

        return true;
    }

    function updateFormState() {
        if (!formBtn) {
            return;
        }

        const allValid = formInputs.every(validateInput);
        formBtn.disabled = !allValid;
    }

    formInputs.forEach((input) => {
        input.addEventListener('input', updateFormState);
    });

    if (!form || !formBtn) {
        return;
    }

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const allValid = formInputs.every(validateInput);
        if (!allValid) {
            return;
        }

        formBtn.classList.add('animate');
        formBtn.disabled = true;

        const paperPlaneIcon = qs('ion-icon', formBtn);

        if (paperPlaneIcon) {
            paperPlaneIcon.style.transform = 'translateX(100vw)';
            paperPlaneIcon.style.transition = 'transform 2s ease-in-out';
        }

        setTimeout(() => {
            formBtn.textContent = 'Enviando...';
        }, 100);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: new FormData(form),
                headers: { Accept: 'application/json' }
            });

            setTimeout(() => {
                if (paperPlaneIcon) {
                    paperPlaneIcon.style.transform = 'translateX(0)';
                }
                formBtn.classList.remove('animate');
            }, 2000);

            if (response.ok) {
                formBtn.textContent = 'Mensaje enviado';
                showToast('Su mensaje fue enviado correctamente.');
                form.reset();
                setTimeout(() => {
                    formBtn.innerHTML = defaultFormButtonMarkup;
                    formBtn.disabled = true;
                }, 2000);
                return;
            }

            formBtn.innerHTML = defaultFormButtonMarkup;
            formBtn.disabled = false;
            showToast('Hubo un problema al enviar el mensaje. Intentelo nuevamente mas tarde.');
        } catch (error) {
            formBtn.innerHTML = defaultFormButtonMarkup;
            formBtn.disabled = false;
            showToast('No fue posible enviar el mensaje. Intentelo nuevamente mas tarde.');
        }
    });
}

function initResumeDownload() {
    const resumePath = 'files/Currículum Manuel Zuñiga 2026.pdf';

    function getPoint(point, index, points, smoothing) {
        function controlPoint(current, previous, next, reverse) {
            const previousPoint = previous || current;
            const nextPoint = next || current;
            const line = {
                length: Math.sqrt(Math.pow(nextPoint[0] - previousPoint[0], 2) + Math.pow(nextPoint[1] - previousPoint[1], 2)),
                angle: Math.atan2(nextPoint[1] - previousPoint[1], nextPoint[0] - previousPoint[0])
            };
            const angle = line.angle + (reverse ? Math.PI : 0);
            const length = line.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        }

        const cps = controlPoint(points[index - 1], points[index - 2], point, false);
        const cpe = controlPoint(point, points[index - 1], points[index + 1], true);
        return 'C ' + cps[0] + ',' + cps[1] + ' ' + cpe[0] + ',' + cpe[1] + ' ' + point[0] + ',' + point[1];
    }

    function getPath(update, smoothing, pointsNew) {
        const points = pointsNew || [[4, 12], [12, update], [20, 12]];
        return points.reduce((accumulator, point, index, allPoints) => {
            return index === 0 ? 'M ' + point[0] + ',' + point[1] : accumulator + ' ' + getPoint(point, index, allPoints, smoothing);
        }, '');
    }

    qsa('.resume-button').forEach((button) => {
        if (typeof window.gsap === 'undefined') {
            return;
        }

        const svg = qs('svg', button);
        if (!svg) {
            return;
        }

        const duration = 3000;
        const svgPath = new Proxy({ y: null, smoothing: null }, {
            set(target, key, value) {
                target[key] = value;
                if (target.y !== null && target.smoothing !== null) {
                    svg.innerHTML = '<path d="' + getPath(target.y, target.smoothing, null) + '" />';
                }
                return true;
            },
            get(target, key) {
                return target[key];
            }
        });

        button.style.setProperty('--duration', duration);
        svgPath.y = 20;
        svgPath.smoothing = 0;

        button.addEventListener('click', (event) => {
            event.preventDefault();

            if (event.target.classList.contains('open-file')) {
                const link = document.createElement('a');
                link.href = resumePath;
                link.download = 'Curriculum-Manuel-Zuniga-2026.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                return;
            }

            if (button.classList.contains('loading')) {
                return;
            }

            button.classList.add('loading');

            gsap.to(svgPath, {
                smoothing: 0.3,
                duration: duration * 0.065 / 1000
            });

            gsap.to(svgPath, {
                y: 12,
                duration: duration * 0.265 / 1000,
                delay: duration * 0.065 / 1000,
                ease: Elastic.easeOut.config(1.12, 0.4)
            });

            setTimeout(() => {
                svg.innerHTML = '<path d="M 3,14 C 4.666666666666666,15.666666666666666 6.333333333333333,17.333333333333332 8,19 C 12.333333333333332,14.666666666666668 16.666666666666664,10.333333333333334 21,6" />';
            }, duration / 2);
        });
    });
}

initSidebar();
initTheme();
initNavigation();
initTestimonials();
initFiltering();
initResumeDownload();

document.addEventListener('DOMContentLoaded', () => {
    initTypedText();
    initInteractions();
    initContactForm();
});