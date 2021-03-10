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
  checkPropertyCost();
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



const typeInput = userForm.querySelector('#type');
const priceInput = userForm.querySelector('#price');
const timeIn = userForm.querySelector('#timein');
const timeOut = userForm.querySelector('#timeout');

const propertyCost = {
  bungalow: {minValue: 0, placeholder: '0'},
  flat: {minValue: 1000, placeholder: '1000'},
  house: {minValue: 5000, placeholder: '5000'},
  palace: {minValue: 10000, placeholder: '10000'},
};


const checkPropertyCost = (type = 'flat') => {
  priceInput.min = propertyCost[type].minValue;
  priceInput.placeholder = propertyCost[type].placeholder;
};

typeInput.addEventListener('change', (evt) => {
  checkPropertyCost(evt.target.value.toString());
});


const setCheckOutTime = (checkIn) => {
  timeOut.value = checkIn;
};

const setCheckInTime = (checkOut) => {
  timeIn.value = checkOut;
};

timeIn.addEventListener('change', (evt) => {
  setCheckOutTime(evt.target.value);
});

timeOut.addEventListener('change', (evt) => {
  setCheckInTime(evt.target.value);
});

export {submitForm, checkPropertyCost};
