import {checkResponseStatus, showErrorMessage} from './util.js';

const DOWNLOAD_URL = 'https://22.javascript.pages.academy/keksobooking/data';
const UPLOAD_URL = 'https://22.javascript.pages.academy/keksobooking';

const getData = (onSuccess) => {
  fetch(DOWNLOAD_URL)
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then((json) => onSuccess(json))
    .catch(() => showErrorMessage());
};


const sendData = (body, onSuccess, onFail, callback)=> {
  fetch(UPLOAD_URL,
    {
      method: 'POST',
      body,
    })
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then(() => onSuccess())
    .then(() => callback())
    .catch(() => onFail());
};

export {getData, sendData};
