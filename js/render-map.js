/* global L:readonly */
import {compileAd} from './compile-ad.js';

const AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
const FILTER_FORM_DISABLED_CLASS = 'map__filters--disabled';
const DEFAULT_MAP_SCALE = 10;
const COORDINATE_ACCURACY = 5;
const MAIN_PIN_ICON_SIZES = [50, 50];
const SIMPLE_ICON_SIZES = [30, 30];

const adForm = document.querySelector('.ad-form');
const adFormElements = Array.from(adForm.children);
const filterForm = document.querySelector('.map__filters');
const filterFormElements = Array.from(filterForm.children);
const defaultCoordinate = {
  lat: 35.68170,
  lng: 139.75388,
};


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


const getAnchorSize = (iconSize) => {
  return [iconSize[0] / 2, iconSize[1]];
};

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: MAIN_PIN_ICON_SIZES,
  iconAnchor: getAnchorSize(MAIN_PIN_ICON_SIZES),
});

const mainPinMarker = L.marker(
  defaultCoordinate,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);


const getCoordinateValue = (coordinate) =>
  `${coordinate.lat.toFixed(COORDINATE_ACCURACY)}, ${coordinate.lng.toFixed(COORDINATE_ACCURACY)}`;

const addressField = adForm.querySelector('#address');
addressField.setAttribute('readonly', 'readonly');
addressField.value = getCoordinateValue(defaultCoordinate);


mainPinMarker.on('moveend', (evt) => {
  const currentCoordinate = evt.target.getLatLng();
  addressField.value = getCoordinateValue(currentCoordinate)
});


const changeMainPinPosition = (newCoordinate = defaultCoordinate) => {
  mainPinMarker.setLatLng(newCoordinate);
  addressField.value =  getCoordinateValue(newCoordinate);
};


const renderAdIcons = (rentalAds) => {

  rentalAds.forEach((rentalAd) => {
    const simpleIcon = L.icon(
      {
        iconUrl: 'img/pin.svg',
        iconSize: SIMPLE_ICON_SIZES,
        iconAnchor: getAnchorSize(SIMPLE_ICON_SIZES),
      },
    );

    const marker = L.marker({
      lat: rentalAd.location.lat,
      lng: rentalAd.location.lng,
    },
    {
      icon: simpleIcon,
    },
    );

    marker
      .addTo(map)
      .bindPopup(
        compileAd(rentalAd),
        {
          keepInView: true,
        },
      );
  });
};

export {renderAdIcons, changeMainPinPosition};
