import {compileAd} from './compile-ad.js';
import {getData} from './api.js';
import {debounce} from './util.js';
import {checkPropertyCost} from './user-form.js';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const AD_FORM_DISABLED_CLASS = 'ad-form--disabled';
const FILTER_FORM_DISABLED_CLASS = 'map__filters--disabled';
const DEFAULT_MAP_SCALE = 10;
const COORDINATE_ACCURACY = 5;
const MAIN_PIN_ICON_SIZES = [50, 50];
const SIMPLE_ICON_SIZES = [30, 30];
const DEFAULT_INPUT_VALUE = 'any';
const RERENDER_DELAY = 500;
const NUMBER_OF_RENDER_ADS = 10;

const PriceSegment = {
  ECONOM: 'low',
  STANDART : 'middle',
  LUX: 'high',
};

const PriceLevel = {
  BASE: 10000,
  TOP: 50000,
};

const adForm = document.querySelector('.ad-form');
const adFormElements = Array.from(adForm.children);
const filterForm = document.querySelector('.map__filters');
const filterFormElements = Array.from(filterForm.children);
const defaultCoordinate = {
  lat: 35.68170,
  lng: 139.75388,
};

const typeFilter = filterForm.querySelector('#housing-type');
const priceFilter = filterForm.querySelector('#housing-price');
const roomFilter = filterForm.querySelector('#housing-rooms');
const guestFilter = filterForm.querySelector('#housing-guests');
const wifiFilter = filterForm.querySelector('#filter-wifi');
const dishFilter = filterForm.querySelector('#filter-dishwasher');
const parkingFilter = filterForm.querySelector('#filter-parking');
const washerFilter = filterForm.querySelector('#filter-washer');
const elevatorFilter = filterForm.querySelector('#filter-elevator');
const conditionerFilter = filterForm.querySelector('#filter-conditioner');


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


const getPriceSegment = (price) => {
  return (price < PriceLevel.BASE) ? PriceSegment.ECONOM : (price >= PriceLevel.BASE && price <= PriceLevel.TOP) ? PriceSegment.STANDART : PriceSegment.LUX;
}

const getFilterStatus = (filter, adItem) => {
  if (filter !== priceFilter) {
    return filter.value === (adItem.toString() || DEFAULT_INPUT_VALUE) || filter.value === DEFAULT_INPUT_VALUE;
  }
  return filter.value === (getPriceSegment(adItem) || DEFAULT_INPUT_VALUE) || filter.value === DEFAULT_INPUT_VALUE;
};

const getCheckboxStatus = (checkBox, adItem) => (adItem.offer.features.includes(checkBox.value) || !checkBox.checked);


const checkFilter = (adItem) => {
  return getFilterStatus(typeFilter, adItem.offer.type) &&
  getFilterStatus(priceFilter, adItem.offer.price) &&
  getFilterStatus(roomFilter, adItem.offer.rooms) &&
  getFilterStatus(guestFilter, adItem.offer.guests) &&
  getCheckboxStatus(wifiFilter, adItem) &&
  getCheckboxStatus(dishFilter, adItem) &&
  getCheckboxStatus(parkingFilter, adItem) &&
  getCheckboxStatus(washerFilter, adItem) &&
  getCheckboxStatus(elevatorFilter, adItem) &&
  getCheckboxStatus(conditionerFilter, adItem);
};

const setFilter = (filterInput, callback) => {
  filterInput.addEventListener('change', debounce(() => {
    callback();
  }, RERENDER_DELAY));
};


const markers = L.layerGroup();

const renderAdIcons = (rentalAds) => {
  markers.clearLayers();
  rentalAds.filter(checkFilter).slice(0, NUMBER_OF_RENDER_ADS).forEach((rentalAd) => {

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
      .bindPopup(
        compileAd(rentalAd),
        {
          keepInView: true,
        },
      );

    markers.addLayer(marker);
  });
  markers.addTo(map);
};


const map = L.map('map-canvas').
  on('load', () => {
    getData((rentalAds) => {
      renderAdIcons(rentalAds);
      setFilter(typeFilter, () => renderAdIcons(rentalAds));
      setFilter(priceFilter, () => renderAdIcons(rentalAds));
      setFilter(roomFilter, () => renderAdIcons(rentalAds));
      setFilter(guestFilter, () => renderAdIcons(rentalAds));
      setFilter(wifiFilter, () => renderAdIcons(rentalAds));
      setFilter(dishFilter, () => renderAdIcons(rentalAds));
      setFilter(parkingFilter, () => renderAdIcons(rentalAds));
      setFilter(washerFilter, () => renderAdIcons(rentalAds));
      setFilter(elevatorFilter, () => renderAdIcons(rentalAds));
      setFilter(conditionerFilter, () => renderAdIcons(rentalAds));
      switchDisabledMode(filterForm, filterFormElements, FILTER_FORM_DISABLED_CLASS);
      filterForm.addEventListener('reset', () => {
        setTimeout(() => (renderAdIcons(rentalAds)));
      })
      checkPropertyCost();
    });
    switchDisabledMode(adForm, adFormElements, AD_FORM_DISABLED_CLASS);
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

export {changeMainPinPosition};
