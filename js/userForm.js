const adForm =  document.querySelector('.ad-form');
const MAX_PRICE = 100000;
const MIN_LENGTH = 30;
const MAX_LENGTH = 100;

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

const validateTitle = (value) => (
  value.length >= MIN_LENGTH && value.length <= MAX_LENGTH
);

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'Длина строки должна быть от 30 до 100 символов'
);

const validatePrice = (value) => (
  value <= MAX_PRICE
);

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'Цена за одну ночь не может быть больше 100000 руб.'
);

const roomsField = document.querySelector('#room_number');
const guestsField = document.querySelector('#capacity');

const validateRooms = () => (
  ROOM_GUEST_CAPACITY[roomsField.value].includes(guestsField.value)
);

const getRoomsErrorMessage = () =>  (
  Number(roomsField.value) === Number(RoomsValue.HUNDRED) ? 'Комнаты не для гостей' : 'Недостаточно места для размещения всех гостей'
);

pristine.addValidator(guestsField, validateRooms, getRoomsErrorMessage);

adForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  pristine.validate();
});
