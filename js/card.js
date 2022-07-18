import {switchingOfTypesHousing} from './util.js';

const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const renderCard = (({offer,author} ) => {
  const adElement = adTemplate.cloneNode(true);
  const title = adElement.querySelector('.popup__title');
  const address = adElement.querySelector('.popup__text--address');
  const price = adElement.querySelector('.popup__text--price');
  const type = adElement.querySelector('.popup__type');
  const capacity = adElement.querySelector('.popup__text--capacity');
  const time = adElement.querySelector('.popup__text--time');
  const description = adElement.querySelector('.popup__description');
  if (!offer.title) {
    title.classList.add('visually-hidden');
  }

  title.textContent = offer.title;

  if (!offer.address) {
    address.classList.add('visually-hidden');
  }

  address.textContent = offer.address;

  if (!offer.price) {
    price.classList.add('visually-hidden');
  }

  price.textContent =`${offer.price} ₽/ночь`;

  if (!offer.type) {
    type.classList.add('visually-hidden');
  }

  type.textContent = switchingOfTypesHousing(offer.type);


  if (!offer.rooms || !offer.guests) {
    capacity.classList.add('visually-hidden');
  }

  capacity.textContent = `${offer.rooms} комнаты для ${offer.guests} гостей`;

  if (!offer.checkin || !offer.checkout) {
    time.classList.add('visually-hidden');
  }

  time.textContent = `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`;

  if (!offer.description) {
    description.classList.add('visually-hidden');
  }

  description.textContent = offer.description;

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

export {renderCard};
