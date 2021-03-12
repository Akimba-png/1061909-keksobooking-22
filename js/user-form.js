import {changeMainPinPosition} from './render-map.js';
import {sendData} from './api.js';
import {resetPicToDefault} from './image-preview.js'

const ERROR_COLOR = '#ff0000';
const PRICE_LIMIT = 1000000;
const TitleLength = {
  MIN: 30,
  MAX: 100,
};
const userForm = document.querySelector('.ad-form');
const resetButton = userForm.querySelector('.ad-form__reset');


const resetForms = () => {
  const forms = document.querySelectorAll('form');
  forms.forEach((form) => form.reset());
  changeMainPinPosition();
  resetPicToDefault();
  checkPropertyCost();
  showFrame(titleInput);
  showFrame(priceInput);
  showFrame(guestInput);
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
  if (parseInt(priceInput.value) > parseInt(priceInput.min) && parseInt(priceInput.value) < PRICE_LIMIT || priceInput.value === '') {
    showFrame(priceInput)
  } else {
    showFrame(priceInput, ERROR_COLOR)
  }
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


const showFrame = (input, color = 'transparent') => {
  input.style.borderColor = color;
};

const setCustomMessage = (input, message) => {
  input.setCustomValidity(message);
};


const titleInput = userForm.querySelector('#title');

const onTitleChange = () => {
  return (evt) => {
    const titleLength = evt.target.value.length;

    if (titleInput.validity.tooShort) {
      showFrame(titleInput, ERROR_COLOR);
      setCustomMessage(titleInput, 'Осталось ввести: ' + (TitleLength.MIN - titleLength) + ' симв.');
    } else if (titleInput.validity.tooLong) {
      showFrame(titleInput, ERROR_COLOR);
      setCustomMessage(titleInput, 'Следует удалить: ' + (titleLength - TitleLength.MAX) + ' симв.');
    } else if (titleInput.validity.valueMissing) {
      showFrame(titleInput, ERROR_COLOR);
      setCustomMessage(titleInput, 'Введите сообщение длиной от ' + TitleLength.MIN + ' до ' + TitleLength.MAX + ' симв.');
    } else {
      showFrame(titleInput);
      setCustomMessage(titleInput, '');
    }

    if (evt.type === 'input') {
      titleInput.reportValidity();
    }
  };
};

titleInput.addEventListener('input', onTitleChange());
titleInput.addEventListener('invalid', onTitleChange());


const onPriceChange = () => {
  return (evt) => {
    const priceInputValue = parseInt(evt.target.value);
    const minPrice = parseInt(evt.target.min);

    if (priceInputValue > PRICE_LIMIT) {
      showFrame(priceInput, ERROR_COLOR);
      setCustomMessage(priceInput, 'Цена не может превышать лимит в ' + PRICE_LIMIT);
    } else if (priceInput.validity.valueMissing) {
      showFrame(priceInput, ERROR_COLOR);
      setCustomMessage(priceInput, 'Укажите стоимость жилья, до ' + PRICE_LIMIT);
    } else if (priceInputValue < minPrice) {
      showFrame(priceInput, ERROR_COLOR);
      setCustomMessage(priceInput, 'Для данного типа жилья цена не может быть меньше ' + minPrice);
    } else {
      showFrame(priceInput);
      setCustomMessage(priceInput, '');
    }

    if (evt.type === 'input') {
      priceInput.reportValidity();
    }
  };
};

priceInput.addEventListener('input', onPriceChange());
priceInput.addEventListener('invalid', onPriceChange());


const roomInput = userForm.querySelector('#room_number');
const guestInput = userForm.querySelector('#capacity');

const onCapacityChange = () => {
  return (evt) => {
    const roomNumber = roomInput.value;
    const guestNumber = guestInput.value;

    if (roomNumber === '100' && guestNumber !== '0') {
      setCustomMessage(guestInput, 'Недоступно для гостей');
      showFrame(guestInput, ERROR_COLOR);
    } else if (guestNumber === '0' && roomNumber !== '100') {
      setCustomMessage(guestInput, 'доступно только для 100 комнат');
      showFrame(guestInput, ERROR_COLOR);
    } else if (guestNumber > roomNumber) {
      setCustomMessage(guestInput, `доступное кол-во гостей не более ${roomNumber}`);
      showFrame(guestInput, ERROR_COLOR);
    } else {
      setCustomMessage(guestInput, '');
      showFrame(guestInput);
    }

    if (evt.type === 'change') {
      guestInput.reportValidity();
    }
  };
}

guestInput.addEventListener('change', onCapacityChange());
guestInput.addEventListener('invalid', onCapacityChange());

roomInput.addEventListener('change',onCapacityChange());

export {submitForm, checkPropertyCost};
