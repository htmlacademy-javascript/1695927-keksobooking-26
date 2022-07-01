import {pageActivator} from './pageActivator.js';
import {getAddress} from './util.js';
import {setAddressFieldValue} from './userForm.js';
import {adsSimilar, getOffers} from './adGeneration.js';

const TOKYO = { lat: 35.65283, lng: 139.83948 };
const MAP_ZOOM = 12;

const map = L.map('map-canvas')
  .on('load', () => {
    pageActivator();
  })
  .setView({
    lat: TOKYO.lat,
    lng: TOKYO.lng,
  },MAP_ZOOM);

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

renderOffers(adsSimilar);

