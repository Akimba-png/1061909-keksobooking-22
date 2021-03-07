const ERROR_MESSAGE_SHOW_TIME = 5000;
const ERROR_MESSAGE_LAYER_LEVEL = 1000;

const getRandom = (min, max) => {
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new RangeError('Заданный параметр не входит в допустимый диапазон');
}


const getRandomPoint = (min, max, fraction) => {
  if (min >= 0 && max > min) {
    return +((Math.random() * (max - min)) + min).toFixed(fraction);
  }
  throw new RangeError('Заданный параметр не входит в допустимый диапазон');
};


const getRandomArrayElement = (elements) =>
  elements[getRandom(0, elements.length - 1)];


const getRandomArray = (items) => {
  const randomArray = [];
  for (let i = 0; i < items.length; i++) {
    const item = getRandomArrayElement(items);
    const isItemInclude = randomArray.some(function (value) {
      return value === item;
    })
    if (!isItemInclude) {
      randomArray.push(item);
    } else {
      i--;
    }
  }
  randomArray.length = getRandom(1, items.length);
  return randomArray;
};


const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  } else {
    throw new Error('При работе с сервером возникла непредвиденная ошибка');
  }
};


const isEscEvent = (evt) => {
  return evt.key === ('Escape' || 'Esc');
};


const showErrorMessage = () => {
  const ErrorMessageContainer = document.createElement('div');
  ErrorMessageContainer.style.position = 'absolute';
  ErrorMessageContainer.style.top = '73px';
  ErrorMessageContainer.style.zIndex = ERROR_MESSAGE_LAYER_LEVEL;
  ErrorMessageContainer.style.minWidth = '1000px';
  ErrorMessageContainer.style.maxWidth = '1200px';
  ErrorMessageContainer.style.width = '100%'
  ErrorMessageContainer.style.height = '25px';
  ErrorMessageContainer.style.textAlign = 'center';
  ErrorMessageContainer.style.fontWeight = 'bold';
  ErrorMessageContainer.style.color = 'red';
  ErrorMessageContainer.textContent = 'При получении данных от сервера произошла ошибка. Попробуйте повторить запрос позднее.'

  document.body.append(ErrorMessageContainer);

  setTimeout(() => {
    ErrorMessageContainer.remove();
  }, ERROR_MESSAGE_SHOW_TIME);
};

const debounce = (callback, delay) => {
  let timerId;
  return () => {
    clearTimeout(timerId);
    timerId = setTimeout(callback, delay);
  };
};

export {getRandom, getRandomPoint, getRandomArrayElement, getRandomArray, checkResponseStatus, isEscEvent, showErrorMessage, debounce};
