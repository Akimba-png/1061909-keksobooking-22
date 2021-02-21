import {randomAds} from './render-ads.js';

const adForm = document.querySelector('.ad-form');
const adFormElements = Array.from(adForm.children);
const AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
const filterForm = document.querySelector('.map__filters');
const filterFormElements = Array.from(filterForm.children);
const FILTER_FORM_DISABLED_CLASS = 'map__filters--disabled';
const defaultCoordinate = {
  lat: 35.68170,
  lng: 139.75388,
};
const DEFAULT_MAP_SCALE = 10;



const switchDisabledMode = (form, formElements, formClass) => {
  if (form.classList.contains(formClass)) {
    form.classList.remove(formClass);
    formElements.forEach((formElement) => formElement.removeAttribute('disabled', 'disabled'));
  } else {
    form.classList.add(formClass);
    formElements.forEach((formElement) => formElement.setAttribute('disabled', 'disabled'));
  }
};

switchDisabledMode(adForm, adFormElements, AD_FORM_DISABLED_CLASS);
switchDisabledMode(filterForm, filterFormElements, FILTER_FORM_DISABLED_CLASS);


const map = L.map('map-canvas').
on('load', () => {
  switchDisabledMode(adForm, adFormElements, AD_FORM_DISABLED_CLASS);
  switchDisabledMode(filterForm, filterFormElements, FILTER_FORM_DISABLED_CLASS);
})
.setView(defaultCoordinate, DEFAULT_MAP_SCALE);


L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);


const mainPinIcon = L.icon({
  iconUrl: './../img/main-pin.svg',
  iconSize: [38, 95],
  iconAnchor: [19, 95],
});

const mainPinMarker = L.marker(
  defaultCoordinate,
{
  draggable: true,
  icon: mainPinIcon,
},
);

mainPinMarker.addTo(map);

const getCoordinateValue = (coordinate) => `${coordinate.lat.toFixed(5)}, ${coordinate.lng.toFixed(5)}`;
const addressField = adForm.querySelector('#address');
addressField.setAttribute('readonly', 'readonly');
addressField.value = getCoordinateValue(defaultCoordinate);

mainPinMarker.on('moveend', (evt) => {
  let currentCoordinate = evt.target.getLatLng();
  addressField.value = getCoordinateValue(currentCoordinate);
});

console.log(randomAds);



