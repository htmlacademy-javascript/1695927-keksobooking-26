const adForm =  document.querySelector('.ad-form');
const maxPrice = 100000;

const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'div',
}, false);

const validateTitle = (value) => (
  value.length >= 30 && value.length <= 100
);

pristine.addValidator(
  adForm.querySelector('#title'),
  validateTitle,
  'Длина строки должна быть от 30 до 100 символов'
);

const validatePrice = (value) => (
  value <= maxPrice
);

pristine.addValidator(
  adForm.querySelector('#price'),
  validatePrice,
  'Цена за одну ночь не может быть больше 100000'
);

const roomsField = document.querySelector('#room_number');
const guestsField = document.querySelector('#capacity');

const validateRooms = () => (
  roomsField.value >= guestsField.value
);

const getRoomsErrorMessage = () =>  (
  `Несопоставимое количество комнат и гостей
`);

pristine.addValidator(guestsField, validateRooms, getRoomsErrorMessage);

adForm.addEventListener('submit', (evt)=>{
  evt.preventDefault();
  pristine.validate();
});
