const getRandomInteger = (from, until) => {
  if (from < 0 || until < 0) {
    return -1;
  }
  if (from > until) {
    [from, until] = [until, from];
  }
  return Math.floor(Math.random() * (until - from + 1)) + from;
};

const getRandom = (from, until, digits = 5) => {
  if (from < 0 || until < 0) {
    return -1;
  }
  if (from > until) {
    [from, until] = [until, from];
  }
  return parseFloat((Math.random() * (until - from) + from).toFixed(digits));
};

const getRandomArrayElement = (elements) => (
  elements[getRandomInteger(0, elements.length - 1)]
);

const getRandomArrayOfArray = (originalArray) => {
  const maxLength = originalArray.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const newArray = [];
  while (newArray.length < lengthOfArray) {
    const indexOfElement =  getRandomInteger(0, maxLength - 1);
    const element = originalArray[indexOfElement];
    if (!newArray.includes(element)) {
      newArray.push(element);
    }
  }
  return newArray;
};

const switchingOfTypesHousing = (type) => {
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

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  switch (true) {
    case (num % 100 > 10 && num % 100 < 21) || (num % 10 > 4 && num % 10 < 10) || (num % 10 === 0):
      return genitivePlural;
    case num % 10 === 1:
      return nominative;
    case num % 10 > 1 && num % 10 < 5:
      return genitiveSingular;
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
  //document.removeEventListener('keydown', onPopupEscKeydown);
  //document.removeEventListener('keydown', onPopupClick);
};

const onPopupEscKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const onPopupClick = () => {
  closePopup();
};

const showSuccessMessage = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successMessage = successTemplate.cloneNode(true);
  successMessage.style.zIndex = 1000;
  document.querySelector('main').append(successMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

const showErrorMessage = (message) => {
  const errorTemplate = document.querySelector('#error').content.querySelector('.error');
  const errorMessage = errorTemplate.cloneNode(true);
  errorMessage.style.zIndex = 1000;
  if (message) {
    errorMessage.querySelector('p').textContent = message;
  }
  document.querySelector('main').append(errorMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', onPopupClick);
};

export {getRandomInteger , getRandom , getRandomArrayElement , getRandomArrayOfArray, switchingOfTypesHousing,numDecline, getAddress,showErrorMessage, showSuccessMessage};
