import {similarAdvertisement} from './data.js';
import {switchingOfTypesHousing} from './util.js';

const adList = document.querySelector('#map-canvas');

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const adsSimilar = similarAdvertisement();

const adFragment = document.createDocumentFragment();

const getOffers = (({offer,author} ) => {
  const adElement = adTemplate.cloneNode(true);

  if (!offer.title) {
    adElement.querySelector('.popup__title').classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__title').textContent = offer.title;

  if (!offer.address) {
    adElement.querySelector('.popup__text--address').classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__text--address').textContent = offer.address;

  if (!offer.price) {
    adElement.querySelector('.popup__text--price').classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__text--price').textContent =`${offer.price} ₽/ночь`;

  if (!offer.type) {
    adElement.querySelector('.popup__type').classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__type').textContent = switchingOfTypesHousing(offer.type);


  if (!offer.rooms || !offer.guests) {
    adElement.querySelector('.popup__text--capacity').classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__text--capacity').textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  if (!offer.checkin || !offer.checkout) {
    adElement.querySelector('.popup__text--time').classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (!offer.description) {
    adElement.querySelector('.popup__description').classList.add('visually-hidden');
  }

  adElement.querySelector('.popup__description').textContent = offer.description;

  if (!author.avatar) {
    adElement.querySelector('.popup__avatar').classList.add('visually-hidden');
  }

  adElement.querySelector('img').src = author.avatar;

  const featuresList = adElement.querySelector('.popup__features');

  if (!offer.features) {
    featuresList.classList.add('visually-hidden');
  } else {
    featuresList.innerHTML  = null;
    offer.features.forEach((feature) => {
      featuresList.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
    });
  }

  const photos = adElement.querySelector('.popup__photos');

  if (!offer.photos) {
    photos.classList.add('visually-hidden');
  } else {
    photos.innerHTML = null;
    offer.photos.forEach((photo) => {
      photos.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  }
  return(adElement);
});

const generateOffers = adsSimilar.map(getOffers);
adFragment.appendChild(generateOffers[0]);
adList.appendChild(adFragment);
