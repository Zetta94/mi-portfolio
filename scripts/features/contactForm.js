import { qsa, qs } from '../utils/dom.js';

export function initContactForm() {
  const form = qs('[data-form]');
  const formInputs = qsa('[data-form-input]');
  const formBtn = qs('.form-btn');
  const toast = qs('#toast');
  const defaultFormButtonMarkup = formBtn ? formBtn.innerHTML : '';

  const showToast = (message) => {
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
  };

  const validateInput = (input) => {
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
  };

  const updateFormState = () => {
    if (!formBtn) {
      return;
    }

    const allValid = formInputs.every(validateInput);
    formBtn.disabled = !allValid;
  };

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

    const paperPlaneIcon = formBtn.querySelector('ion-icon');

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