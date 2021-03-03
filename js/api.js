import {checkResponseStatus, showErrorMessage} from './util.js';

const getData = (onSuccess) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then((json) => onSuccess(json))
    .catch(() => showErrorMessage());
};


const sendData = (body, onSuccess, onFail, operateOption)=> {
  fetch('https://22.javascript.pages.academy/keksobooking',
    {
      method: 'POST',
      body,
    })
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then(() => onSuccess())
    .then(() => operateOption())
    .catch(() => onFail());
};

export {getData, sendData};
