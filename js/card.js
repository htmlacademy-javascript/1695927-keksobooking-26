import {changeOfTypesHousing} from './util.js';

const adTemplateElement = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (({offer,author} ) => {
  const adElement = adTemplateElement.cloneNode(true);
  const titleElement = adElement.querySelector('.popup__title');
  const addressElement = adElement.querySelector('.popup__text--address');
  const priceElement = adElement.querySelector('.popup__text--price');
  const typeElement = adElement.querySelector('.popup__type');
  const capacityElement = adElement.querySelector('.popup__text--capacity');
  const timeElement = adElement.querySelector('.popup__text--time');
  const descriptionElement = adElement.querySelector('.popup__description');
  if (!offer.title) {
    titleElement.classList.add('visually-hidden');
  }

  titleElement.textContent = offer.title;

  if (!offer.address) {
    addressElement.classList.add('visually-hidden');
  }

  addressElement.textContent = offer.address;

  if (!offer.price) {
    priceElement.classList.add('visually-hidden');
  }

  priceElement.textContent =`${offer.price} ₽/ночь`;

  if (!offer.type) {
    typeElement.classList.add('visually-hidden');
  }

  typeElement.textContent = changeOfTypesHousing(offer.type);


  if (!offer.rooms || !offer.guests) {
    capacityElement.classList.add('visually-hidden');
  }

  capacityElement.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  if (!offer.checkin || !offer.checkout) {
    timeElement.classList.add('visually-hidden');
  }

  timeElement.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (!offer.description) {
    descriptionElement.classList.add('visually-hidden');
  }

  descriptionElement.textContent = offer.description;

  if (!author.avatar) {
    adElement.querySelector('.popup__avatar').classList.add('visually-hidden');
  }

  adElement.querySelector('img').src = author.avatar;

  const featuresListElement = adElement.querySelector('.popup__features');

  if (!offer.features) {
    featuresListElement.classList.add('visually-hidden');
  } else {
    featuresListElement.innerHTML  = null;
    offer.features.forEach((feature) => {
      featuresListElement.insertAdjacentHTML('beforeend', `<li class="popup__feature popup__feature--${feature}"></li>`);
    });
  }

  const photosElement = adElement.querySelector('.popup__photos');

  if (!offer.photos) {
    photosElement.classList.add('visually-hidden');
  } else {
    photosElement.innerHTML = null;
    offer.photos.forEach((photo) => {
      photosElement.insertAdjacentHTML('beforeend', `<img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">`);
    });
  }
  return(adElement);
});

export {renderCard};
