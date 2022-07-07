import {sendData} from './api.js';
import {showSuccessMessage, showErrorMessage } from './util.js';
import {resetAddress} from './map.js';

const adForm =  document.querySelector('.ad-form');
const MAX_PRICE = 100000;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;
const MIN_VALUE_BUNGALOW = 0;
const MIN_VALUE_FLAT = 1000;
const MIN_VALUE_HOTEL = 3000;
const MIN_VALUE_HOUSE = 5000;
const MIN_VALUE_PALACE = 10000;
const priceField = adForm.querySelector('#price');
const timeInSelect = adForm.querySelector('#timein');
const timeOutSelect = adForm.querySelector('#timeout');
const roomsField = adForm.querySelector('#room_number');
const guestsField = adForm.querySelector('#capacity');
const typeField = adForm.querySelector('#type');
const addressField = adForm.querySelector('#address');
const resetButton = adForm.querySelector('.ad-form__reset');

const setAddressFieldValue = (value) => {
  addressField.value = value;
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

const ROOM_GUEST_CAPACITY = {
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
      priceField.min = MIN_VALUE_BUNGALOW;
      priceField.placeholder = MIN_VALUE_BUNGALOW;
      break;
    case 'flat':
      priceField.min = MIN_VALUE_FLAT;
      priceField.placeholder = MIN_VALUE_FLAT;
      break;
    case 'hotel':
      priceField.min = MIN_VALUE_HOTEL;
      priceField.placeholder = MIN_VALUE_HOTEL;
      break;
    case 'house':
      priceField.min = MIN_VALUE_HOUSE;
      priceField.placeholder = MIN_VALUE_HOUSE;
      break;
    case 'palace':
      priceField.min = MIN_VALUE_PALACE;
      priceField.placeholder = MIN_VALUE_PALACE;
      break;
  }
};

changePriceFromType(typeField.value);

const validateTitle = (value) => (
  value.length > MIN_LENGTH-1 && value.length < MAX_LENGTH+1
);

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'Длина строки должна быть от 30 до 100 символов'
);

const validatePrice = (value) => (
  value < MAX_PRICE+1 && value > Number(priceField.min)-1
);

pristine.addValidator(
  priceField,
  validatePrice,
  'Неподходящее значение цены'
);

const validateRooms = () => (
  ROOM_GUEST_CAPACITY[roomsField.value].includes(guestsField.value)
);

const getRoomsErrorMessage = () =>  (
  Number(roomsField.value) === Number(RoomsValue.HUNDRED) ? 'Комнаты не для гостей' : 'Недостаточно места для размещения всех гостей'
);

pristine.addValidator(guestsField, validateRooms, getRoomsErrorMessage);

typeField.addEventListener('change', () =>{
  changePriceFromType(typeField.value);
});


timeInSelect.addEventListener('change', () => {
  timeOutSelect.value = timeInSelect.value;
});

timeOutSelect.addEventListener('change', () => {
  timeInSelect.value = timeOutSelect.value;
});

adForm.addEventListener('submit', ()=>{
  pristine.validate();
});

const onSubmitAdForm = (onSuccess, onFail) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onFail(),
      new FormData(evt.target),
    );
  });
};

const resetForm = () => {
  adForm.reset();
  resetAddress();
};

resetForm();

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

onSubmitAdForm(() => {
  showSuccessMessage();
  resetForm();
}, showErrorMessage);

export {setAddressFieldValue, priceField};
