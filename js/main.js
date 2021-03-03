import './render-map.js';
import './user-form.js';
import {renderAdIcons} from './render-map.js';

const LOAD_ERROR_MESSAGE_SHOW_TIME = 5000;

import {checkResponseStatus} from './util.js';

const showLoadErrorMessage = () => {
  const LoadErrorMessageContainer = document.createElement('div');
  LoadErrorMessageContainer.style.position = 'absolute';
  LoadErrorMessageContainer.style.top = '73px';
  LoadErrorMessageContainer.style.zIndex = 1000;
  LoadErrorMessageContainer.style.minWidth = '1000px';
  LoadErrorMessageContainer.style.maxWidth = '1200px';
  LoadErrorMessageContainer.style.width = '100%'
  LoadErrorMessageContainer.style.height = '25px';
  LoadErrorMessageContainer.style.textAlign = 'center';
  LoadErrorMessageContainer.style.fontWeight = 'bold';
  LoadErrorMessageContainer.style.color = 'red';
  LoadErrorMessageContainer.textContent = 'При получении данных от сервера произошла ошибка. Попробуйте повторить запрос позднее.'

  document.body.append(LoadErrorMessageContainer);

  setTimeout(() => {
    LoadErrorMessageContainer.remove();
  }, LOAD_ERROR_MESSAGE_SHOW_TIME);
};


fetch('https://22.javascript.pages.academy/keksobooking/data')
.then(checkResponseStatus)
.then((response) => response.json())
.then((json) => renderAdIcons(json))
.catch(() => showLoadErrorMessage());

