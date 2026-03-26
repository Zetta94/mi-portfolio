export function initTypedText() {
  if (!window.Typed || !document.querySelector('.typing-text')) {
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