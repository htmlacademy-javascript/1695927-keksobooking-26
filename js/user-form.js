import {doRequest} from './api.js';
import {showSuccessMessage, showErrorMessage } from './util.js';
import {resetAddress} from './map.js';
import {previewHousingPhotoChooserElement, previewAvatarContainerElement} from './photo.js';
import {sliderElement} from './price-slider.js';
import {priceFieldElement} from './elements-of-dom.js';

const MAX_PRICE = 100000;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MIN_VALUE_BUNGALOW = 0;
const MIN_VALUE_FLAT = 1000;
const MIN_VALUE_HOTEL = 3000;
const MIN_VALUE_HOUSE = 5000;
const MIN_VALUE_PALACE = 10000;
const PREVIEW_FIRST_STARTING = 'img/muffin-grey.svg';
const adForm =  document.querySelector('.ad-form');
const timeInSelectElement = adForm.querySelector('#timein');
const timeOutSelectElement = adForm.querySelector('#timeout');
const roomsFieldElement = adForm.querySelector('#room_number');
const guestsFieldElement = adForm.querySelector('#capacity');
const typeFieldElement = adForm.querySelector('#type');
const addressFieldElement = adForm.querySelector('#address');
const resetButtonElement = adForm.querySelector('.ad-form__reset');
const filterFormElement = document.querySelector('.map__filters');

const setAddressFieldValue = (value) => {
  addressFieldElement.value = value;
};

const RoomsValue = {
  ONE : '1',
  TWO: '2',
  THREE: '3',
  HUNDRED : '100'
};

const CapacityValue = {
  ONE : '1',
  TWO: '2',
  THREE: '3',
  UNAVAILABLE: '0'
};

const roomGuestCapacity = {
  [RoomsValue.ONE] : CapacityValue.ONE,
  [RoomsValue.TWO] : [CapacityValue.ONE, CapacityValue.TWO],
  [RoomsValue.THREE] : [CapacityValue.ONE, CapacityValue.TWO, CapacityValue.THREE],
  [RoomsValue.HUNDRED] : CapacityValue.UNAVAILABLE,
};

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
}, true);

const changePriceFromType = (type) => {
  switch (type) {
    case 'bungalow':
      priceFieldElement.min = MIN_VALUE_BUNGALOW;
      priceFieldElement.placeholder = MIN_VALUE_BUNGALOW;
      break;
    case 'flat':
      priceFieldElement.min = MIN_VALUE_FLAT;
      priceFieldElement.placeholder = MIN_VALUE_FLAT;
      break;
    case 'hotel':
      priceFieldElement.min = MIN_VALUE_HOTEL;
      priceFieldElement.placeholder = MIN_VALUE_HOTEL;
      break;
    case 'house':
      priceFieldElement.min = MIN_VALUE_HOUSE;
      priceFieldElement.placeholder = MIN_VALUE_HOUSE;
      break;
    case 'palace':
      priceFieldElement.min = MIN_VALUE_PALACE;
      priceFieldElement.placeholder = MIN_VALUE_PALACE;
      break;
  }
};

changePriceFromType(typeFieldElement.value);

const validateTitle = (value) => (
  value.length > MIN_LENGTH-1 && value.length < MAX_LENGTH+1
);

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'Длина строки должна быть от 30 до 100 символов'
);

const validatePrice = (value) => (
  value < MAX_PRICE+1 && value > Number(priceFieldElement.min)-1
);

pristine.addValidator(
  priceFieldElement,
  validatePrice,
  'Неподходящее значение цены'
);

const validateRooms = () => (
  roomGuestCapacity[roomsFieldElement.value].includes(guestsFieldElement.value)
);

const getRoomsErrorMessage = () =>  (
  Number(roomsFieldElement.value) === Number(RoomsValue.HUNDRED) ? 'Комнаты не для гостей' : 'Недостаточно места для размещения всех гостей'
);

pristine.addValidator(guestsFieldElement, validateRooms, getRoomsErrorMessage);

typeFieldElement.addEventListener('change', () =>{
  changePriceFromType(typeFieldElement.value);
});


timeInSelectElement.addEventListener('change', () => {
  timeOutSelectElement.value = timeInSelectElement.value;
});

timeOutSelectElement.addEventListener('change', () => {
  timeInSelectElement.value = timeOutSelectElement.value;
});

const onSubmitAdForm = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (pristine.validate()) {
      doRequest(
        () => onSuccess(),
        () => onFail(),
        'POST',
        new FormData(evt.target),
      );
    }
  });
};

const resetForm = () => {
  adForm.reset();
  changePriceFromType(typeFieldElement.value);
  resetAddress();
  previewAvatarContainerElement.src = PREVIEW_FIRST_STARTING;
  previewHousingPhotoChooserElement.innerHTML = '';
  filterFormElement.reset();
  sliderElement.noUiSlider.set(0);
};

resetForm();

resetButtonElement.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

onSubmitAdForm(() => {
  showSuccessMessage();
  resetForm();
}, ()=> showErrorMessage());

export {setAddressFieldValue};
