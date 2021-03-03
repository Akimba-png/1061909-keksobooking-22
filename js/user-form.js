import {isEscEvent, checkResponseStatus} from './util.js';
import {changeMainPinPosition} from './render-map.js';

const userForm = document.querySelector('.ad-form');
const resetButton = userForm.querySelector('.ad-form__reset');
const modalContainer = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


const resetForms = () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => form.reset());
  changeMainPinPosition();
};


//Вынести в отдельный блок user-modal?


const renderStatusModal = (statusTemplate) => () => {
  const statusModal = statusTemplate.cloneNode(true);
  statusModal.style.zIndex = 1001;
  modalContainer.appendChild(statusModal);

  const onStatusModalEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      statusModal.remove();
      console.log('esc');
      document.removeEventListener('keydown', onStatusModalEscKeydown);
    }
  };
  statusModal.addEventListener('click', () => {
    statusModal.remove();
    console.log('click');
  });
  document.addEventListener('keydown', onStatusModalEscKeydown);
  // if (!statusModal.querySelector('button')) {
  //   resetForms();
  // }
};

const renderStatusModalSuccess = renderStatusModal(successTemplate);
const renderStatusModalError = renderStatusModal(errorTemplate);
// renderStatusModal(successTemplate);


const submitForm = (onSuccess, onFail, operateForm) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);
    console.log(formData);

    fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body: formData,
    })
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .then(() => onSuccess())
    .then(() => operateForm())
    .catch(() => onFail());
  });
};

submitForm(renderStatusModalSuccess, renderStatusModalError, resetForms);


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});


