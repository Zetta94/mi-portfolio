import { qsa, qs } from '../utils/dom.js';

export function initTestimonials() {
  const testimonialsItem = qsa('[data-testimonials-item]');
  const modalContainer = qs('[data-modal-container]');
  const modalCloseBtn = qs('[data-modal-close-btn]');
  const overlay = qs('[data-overlay]');
  const modalImg = qs('[data-modal-img]');
  const modalTitle = qs('[data-modal-title]');
  const modalText = qs('[data-modal-text]');

  if (!testimonialsItem.length || !modalContainer || !modalCloseBtn || !overlay || !modalImg || !modalTitle || !modalText) {
    return;
  }

  const toggleModal = () => {
    modalContainer.classList.toggle('active');
    overlay.classList.toggle('active');
  };

  testimonialsItem.forEach((item) => {
    item.addEventListener('click', () => {
      const avatar = item.querySelector('[data-testimonials-avatar]');
      const title = item.querySelector('[data-testimonials-title]');
      const text = item.querySelector('[data-testimonials-text]');

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