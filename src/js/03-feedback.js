import throttle from 'lodash.throttle';

// Obtener los elementos del formulario
const feedbackForm = document.querySelector('.feedback-form');
const emailInput = feedbackForm.querySelector('input[name="email"]');
const messageInput = feedbackForm.querySelector('textarea[name="message"]');

// Función para guardar el estado del formulario en el almacenamiento local
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem('feedback-form-state', JSON.stringify(formState));
}, 500); // Actualizar el almacenamiento local no más de una vez cada 500 milisegundos

// Función para cargar el estado del formulario desde el almacenamiento local
const loadFormState = () => {
  const storedState = localStorage.getItem('feedback-form-state');
  if (storedState) {
    const formState = JSON.parse(storedState);
    emailInput.value = formState.email || '';
    messageInput.value = formState.message || '';
  }
};

// Escuchar el evento de entrada en los campos del formulario y guardar el estado
feedbackForm.addEventListener('input', saveFormState);

// Cargar el estado del formulario al cargar la página
window.addEventListener('DOMContentLoaded', loadFormState);

// Manejar el envío del formulario
feedbackForm.addEventListener('submit', function (event) {
  event.preventDefault();
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  console.log(formState);

  // Limpiar el almacenamiento local y los campos del formulario
  localStorage.removeItem('feedback-form-state');
  emailInput.value = '';
  messageInput.value = '';
});
