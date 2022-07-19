import {filterActivator} from './page-activator.js';

const ALERT_SHOW_TIME = 2000;

const ERRORMESSAGE = 'Ошибка загрузки данных. Обновите страницу.';

const changeOfTypesHousing = (type) => {
  switch (type) {
    case 'hotel':
      return 'Отель';
    case 'palace':
      return 'Дворец';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'flat':
      return 'Квартира';
  }
};

const getAddress = ({ lat, lng }) => (
  `${lat.toFixed(5)}, ${lng.toFixed(5)}`
);

const isEscEvent = (evt) => (
  evt.key === 'Escape' || evt.key === 'Esc'
);

const closePopup = () => {
  if (document.querySelector('.success')) {
    document.querySelector('.success').remove();
  }
  if (document.querySelector('.error')) {
    document.querySelector('.error').remove();
  }
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown(evt) {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
}

const onPopupClick = () => {
  closePopup();
};

const showSuccessMessage = () => {
  const successTemplateElement = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplateElement.cloneNode(true);
  successMessage.style.zIndex = 1000;
  document.querySelector('main').append(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const showErrorMessage = (message) => {
  const errorTemplateElement = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplateElement.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  if (message) {
    errorMessage.querySelector('p').textContent = message;
  }
  document.querySelector('main').append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

const onError = () => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 10000;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '100px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = ERRORMESSAGE;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
  filterActivator();
};

export {
  changeOfTypesHousing,
  getAddress,
  showErrorMessage,
  showSuccessMessage,
  debounce,
  onError
};
