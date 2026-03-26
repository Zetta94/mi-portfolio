import { initSidebar } from './features/sidebar.js';
import { initTheme } from './features/theme.js';
import { initNavigation } from './features/navigation.js';
import { initTypedText } from './features/typedText.js';
import { initInteractions } from './features/interactions.js';
import { initTestimonials } from './features/testimonials.js';
import { initFiltering } from './features/filtering.js';
import { initContactForm } from './features/contactForm.js';
import { initResumeDownload } from './features/resumeDownload.js';

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