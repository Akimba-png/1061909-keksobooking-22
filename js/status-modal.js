import {isEscEvent} from './util.js';

const MODAL_LAYER_INDEX = 1000;
const modalContainer = document.querySelector('main');
const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');


const renderStatusModal = (statusTemplate) => () => {
  const statusModal = statusTemplate.cloneNode(true);
  statusModal.style.zIndex = MODAL_LAYER_INDEX;
  modalContainer.appendChild(statusModal);

  const onStatusModalEscKeydown = (evt) => {
    if (isEscEvent(evt)) {
      evt.preventDefault();
      statusModal.remove();
      document.removeEventListener('keydown', onStatusModalEscKeydown);
    }
  };
  statusModal.addEventListener('click', () => {
    statusModal.remove();
  });
  document.addEventListener('keydown', onStatusModalEscKeydown);
};

const renderStatusModalSuccess = renderStatusModal(successTemplate);
const renderStatusModalError = renderStatusModal(errorTemplate);

export {renderStatusModalSuccess, renderStatusModalError};
