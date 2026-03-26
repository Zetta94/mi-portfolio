export function toggleActive(element) {
  if (element) {
    element.classList.toggle('active');
  }
}

export function qs(selector, scope = document) {
  return scope.querySelector(selector);
}

export function qsa(selector, scope = document) {
  return Array.from(scope.querySelectorAll(selector));
}