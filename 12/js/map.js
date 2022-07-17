import {pageActivator} from './pageActivator.js';
import {getAddress, onError, debounce} from './util.js';
import {setAddressFieldValue} from './userForm.js';
import {getOffers} from './adGeneration.js';
import {doRequest} from './api.js';
import {filterOffers} from './filter.js';

let offersData;
const TOKYO = { lat: 35.65283, lng: 139.83948 };
const MAP_ZOOM = 12;
const MAX_OFFERS = 10;
const RENDER_DELAY = 500;
const filterForm = document.querySelector('.map__filters');

const map = L.map('map-canvas');

const layerGroup = L.layerGroup().addTo(map);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
  popupAnchor: [0, -10],
});

const marker = L.marker(
  {
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },
  {
    draggable: true,
    autoPan: true,
    icon: mainPinIcon,
  },
).addTo(map);

marker.on('moveend', (evt) => {
  setAddressFieldValue(getAddress(evt.target.getLatLng()));
});

const resetAddress = () => {
  marker.setLatLng(TOKYO);
  map.setView(TOKYO, MAP_ZOOM);
};

const renderOffers = (offers) => {
  offers.forEach((offer)=>{
    L.marker({
      lat: offer.location.lat,
      lng: offer.location.lng
    },{
      icon: pinIcon,
    }).addTo(layerGroup)
      .bindPopup(getOffers(offer));
  });
};

const removeMapPin = () => {
  layerGroup.clearLayers();
};

const onFilterChange = debounce(() => {
  removeMapPin();
  renderOffers(filterOffers(offersData));
}, RENDER_DELAY);

const onFilterReset = () => {
  onFilterChange();
};

const onSuccess = (data) => {
  offersData = data.slice();
  renderOffers(offersData.slice(0, MAX_OFFERS));
  filterForm.addEventListener('change', onFilterChange);
  filterForm.addEventListener('reset', onFilterReset);
};

map.on('load', () => {
  pageActivator();
  doRequest(onSuccess, onError, 'GET');
})
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },MAP_ZOOM);

export {resetAddress, MAX_OFFERS};
