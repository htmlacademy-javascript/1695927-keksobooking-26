import {getRandomInteger , getRandom , getRandomArrayElement , getRandomArrayOfArray} from './util.js';

const SIMILAR_ADVERTISEMENT_COUNT = 10;

const AVATARS = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
  'img/avatars/user09.png',
  'img/avatars/user10.png'
];

const TITLES = [
  'Симбиоз авангарда и классики',
  'Залог покоя и надежности',
  'Вам осталось занести только свои личные вещи',
  'Надежный приют',
  'Живите красиво уже сегодня',
  'Изысканный уют',
  'Вблизи у моря, вдали от суеты',
  'Жильё самой высшей пробы',
  'Респектабельность по-президентски',
  'Культ роскоши'
];

const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const CHECKINS = [
  '12:00',
  '13:00',
  '14:00'
];

const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00'
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator'
];

const DESCRIPTION = [
  'Прекрасно написанное описание жилища номер 1',
  'Прекрасно написанное описание жилища номер 2',
  'Прекрасно написанное описание жилища номер 3',
  'Прекрасно написанное описание жилища номер 4',
  'Прекрасно написанное описание жилища номер 5',
  'Прекрасно написанное описание жилища номер 6',
  'Прекрасно написанное описание жилища номер 7',
  'Прекрасно написанное описание жилища номер 8',
  'Прекрасно написанное описание жилища номер 9',
  'Прекрасно написанное описание жилища номер 10'
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const rooms = getRandomInteger(1, 112);

const guests = rooms*2;

const price = getRandomInteger(5, 15000);

const digit =5;

const Lat = {
  MIN : 35.65000,
  MAX : 35.70000
};

const Lng = {
  MIN : 139.70000,
  MAX : 139.80000
};

const createAdvertisement = () => (
  {
    author : {
      avatar : getRandomArrayElement(AVATARS)
    },
    offer : {
      title : getRandomArrayElement(TITLES),
      address : `${getRandom(Lat.MIN, Lat.MAX, digit)} , ${getRandom(Lng.MIN, Lng.MAX, digit)}`,
      price : price,
      type : getRandomArrayElement(TYPES),
      rooms : rooms,
      guests : guests,
      checkin : getRandomArrayElement(CHECKINS),
      checkout : getRandomArrayElement(CHECKOUTS),
      features : getRandomArrayOfArray(FEATURES),
      description : getRandomArrayElement(DESCRIPTION),
      photos : getRandomArrayOfArray(PHOTOS),
    },
    location : {
      lat : getRandom(Lat.MIN, Lat.MAX, digit),
      lng : getRandom(Lng.MIN, Lng.MAX, digit)
    }
  }
);

const similarAdvertisement = () => Array.from({length : SIMILAR_ADVERTISEMENT_COUNT}, createAdvertisement);

export {similarAdvertisement};
