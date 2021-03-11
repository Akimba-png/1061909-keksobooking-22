import {changeMainPinPosition} from './render-map.js';
import {sendData} from './api.js';
import {resetPicToDefault} from './image-preview.js'

const userForm = document.querySelector('.ad-form');
const resetButton = userForm.querySelector('.ad-form__reset');


const resetForms = () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => form.reset());
  changeMainPinPosition();
  resetPicToDefault();
};


const submitForm = (onSuccess, onFail) => {
  userForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    sendData(formData, onSuccess, onFail, resetForms);
  });
};


resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForms();
});

export {submitForm};
