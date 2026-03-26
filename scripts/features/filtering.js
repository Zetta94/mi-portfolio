import { qsa, qs, toggleActive } from '../utils/dom.js';

export function initFiltering() {
  const select = qs('[data-select]');
  const selectItems = qsa('[data-select-item]');
  const selectValue = qs('[data-selecct-value]');
  const filterButtons = qsa('[data-filter-btn]');
  const filterItems = qsa('[data-filter-item]');

  const filterItemsByCategory = (selectedValue) => {
    filterItems.forEach((item) => {
      const itemCategory = item.dataset.category.toLowerCase();
      const shouldShow = selectedValue === 'todas' || selectedValue === itemCategory;
      item.classList.toggle('active', shouldShow);
    });
  };

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

  let lastClickedBtn = filterButtons.length ? filterButtons[0] : null;

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selectedValue = button.innerText.toLowerCase();

      if (selectValue) {
        selectValue.innerText = button.innerText;
      }

      filterItemsByCategory(selectedValue);

      if (lastClickedBtn) {
        lastClickedBtn.classList.remove('active');
      }

      button.classList.add('active');
      lastClickedBtn = button;
    });
  });
}