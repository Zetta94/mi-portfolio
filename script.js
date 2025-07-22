'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Theme toggle
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleIcon = document.getElementById('theme-toggle-icon');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
const savedTheme = localStorage.getItem('theme');

function setTheme(mode) {
  if (mode === 'light') {
    document.body.classList.add('light-mode');
    themeToggleIcon.textContent = 'Modo Oscuro 🌙';
    localStorage.setItem('theme', 'light');
  } else {
    document.body.classList.remove('light-mode');
    themeToggleIcon.textContent = 'Modo Claro 🌞';
    localStorage.setItem('theme', 'dark');
  }
}

// Initial theme
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme(prefersDark ? 'dark' : 'light');
}

themeToggleBtn.addEventListener('click', () => {
  if (document.body.classList.contains('light-mode')) {
    setTheme('dark');
  } else {
    setTheme('light');
  }
});

//Animated text
document.addEventListener("DOMContentLoaded", function () {
  // Safe Typed.js block
  try {
    new Typed('.typing-text', {
      strings: ["Soy Manuel, funciono a base de lógica 🧠, cafeína ☕ y commits en Git 💻 — en ese orden."],
      typeSpeed: 50,
      backSpeed: 25,
      showCursor: false,
      loop: true
    });
  } catch (e) {
    console.warn("Typed.js failed:", e);
  }
});
//code cards snippets

document.querySelectorAll('.copy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
   const code = btn.parentElement.querySelector('code').innerText;
     navigator.clipboard.writeText(code);
     btn.textContent = '✅ Copied';
     setTimeout(() => (btn.textContent = '📋 Copy'), 1500);
 });
});

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".reveal-btn").forEach(function (btn) {
    btn.addEventListener("click", function () {
      const container = btn.closest(".flip-container");
      container.classList.toggle("flipped");
    });
  });
});


// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category.toLowerCase();
    if (selectedValue === "todas") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}


// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Get contact form elements

const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector('.form-btn');
const paperPlaneIcon = formBtn.querySelector('ion-icon');
const toast = document.getElementById('toast');

function showToast(message) {
  toast.textContent = message;
  toast.classList.remove('hidden');
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
    toast.classList.add('hidden');
  }, 3000);
}

function validateInput(input) {
  const errorMsg = input.nextElementSibling;
  if (!input.validity.valid) {
    if (input.validity.valueMissing) {
      errorMsg.textContent = 'Este campo es obligatorio';
    } else if (input.validity.typeMismatch) {
      errorMsg.textContent = 'Ingrese un email válido';
    }
    return false;
  } else {
    errorMsg.textContent = '';
    return true;
  }
}

formInputs.forEach(input => {
  input.addEventListener("input", () => {
    const allValid = Array.from(formInputs).every(validateInput);
    formBtn.disabled = !allValid;
  });
});

form.addEventListener('submit', async function (e) {
  e.preventDefault();

  let allValid = true;
  formInputs.forEach(input => {
    if (!validateInput(input)) allValid = false;
  });

  if (!allValid) return;

  formBtn.classList.add("animate");
  paperPlaneIcon.style.transform = 'translateX(100vw)';
  paperPlaneIcon.style.transition = 'transform 2s ease-in-out';

  setTimeout(() => {
    formBtn.innerText = "Enviando...";
  }, 100);

  try {
    const response = await fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    });

    setTimeout(() => {
      paperPlaneIcon.style.transform = 'translateX(0)';
      formBtn.classList.remove("animate");
    }, 2000);

    if (response.ok) {
      formBtn.innerText = "Mensaje enviado";
      showToast("¡Su mensaje ha sido enviado con éxito!");
      form.reset();
      formBtn.setAttribute("disabled", "");
    } else {
      showToast("Existe un problema al enviar su mensaje. Por favor, inténtelo de nuevo más tarde.");
    }
  } catch (error) {
    showToast("Error al enviar el mensaje. Por favor, inténtelo de nuevo más tarde.");
  }
});


// Ruta del archivo CV
const RESUME_PATH = './files/cv-manuel-zuniga-desarrollador-de-software.pdf';

// Generador de curva SVG
function getPath(y, smoothing, points = null) {
  const defaultPoints = [
    [4, y],
    [12, y],
    [20, y]
  ];

  const finalPoints = points || defaultPoints;

  const line = (pointA, pointB) => {
    const lengthX = pointB[0] - pointA[0];
    const lengthY = pointB[1] - pointA[1];

    const controlPoint = [
      pointA[0] + lengthX * smoothing,
      pointA[1] + lengthY * smoothing
    ];

    return `Q ${controlPoint[0]},${controlPoint[1]} ${pointB[0]},${pointB[1]}`;
  };

  return `
    <path d="M ${finalPoints[0][0]},${finalPoints[0][1]}
      ${line(finalPoints[0], finalPoints[1])}
      ${line(finalPoints[1], finalPoints[2])}" 
      fill="none" stroke="white" stroke-width="2"/>
  `;
}

document.querySelectorAll('.resume-button').forEach(button => {

  const duration = 3000;
  const svg = button.querySelector('svg');
  if (!svg) return;

  const svgPath = new Proxy({
    y: null,
    smoothing: null
  }, {
    set(target, key, value) {
      target[key] = value;
      if (target.y !== null && target.smoothing !== null) {
        svg.innerHTML = getPath(target.y, target.smoothing, null);
      }
      return true;
    },
    get(target, key) {
      return target[key];
    }
  });

  button.style.setProperty('--duration', duration + 'ms');

  svgPath.y = 20;
  svgPath.smoothing = 0;

  button.addEventListener('click', e => {
    e.preventDefault();

    if (e.target.classList.contains('open-file')) {
      const a = document.createElement('a');
      a.href = RESUME_PATH;
      a.download = 'cv-manuel-zuniga-desarrollador-de-software.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return;
    }

    if (!button.classList.contains('loading')) {
      button.classList.add('loading');

      gsap.to(svgPath, {
        smoothing: 0.3,
        duration: duration * 0.065 / 1000
      });

      gsap.to(svgPath, {
        y: 12,
        duration: duration * 0.265 / 1000,
        delay: duration * 0.065 / 1000,
        ease: "elastic.out(1.12, 0.4)"
      });

      setTimeout(() => {
        svg.innerHTML = getPath(0, 0, [
          [3, 14],
          [8, 19],
          [21, 6]
        ]);
      }, duration / 2);
    }

  });
});


function getPoint(point, i, a, smoothing) {
    let cp = (current, previous, next, reverse) => {
            let p = previous || current,
                n = next || current,
                o = {
                    length: Math.sqrt(Math.pow(n[0] - p[0], 2) + Math.pow(n[1] - p[1], 2)),
                    angle: Math.atan2(n[1] - p[1], n[0] - p[0])
                },
                angle = o.angle + (reverse ? Math.PI : 0),
                length = o.length * smoothing;
            return [current[0] + Math.cos(angle) * length, current[1] + Math.sin(angle) * length];
        },
        cps = cp(a[i - 1], a[i - 2], point, false),
        cpe = cp(point, a[i - 1], a[i + 1], true);
    return `C ${cps[0]},${cps[1]} ${cpe[0]},${cpe[1]} ${point[0]},${point[1]}`;
}

function getPath(update, smoothing, pointsNew) {
    let points = pointsNew ? pointsNew : [
            [4, 12],
            [12, update],
            [20, 12]
        ],
        d = points.reduce((acc, point, i, a) => i === 0 ? `M ${point[0]},${point[1]}` : `${acc} ${getPoint(point, i, a, smoothing)}`, '');
    return `<path d="${d}" />`;
}