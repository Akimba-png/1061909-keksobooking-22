import {getRandom, getRandomPoint, getRandomArrayElement, getRandomArray} from './util.js';

const NUMBER_OF_ADS = 10;
const COORDINATE_ACCURACY = 5;
const MIN_LATITUDE = 35.65000;
const MAX_LATITUDE = 35.70000;
const MIN_LONGITUDE = 139.70000;
const MAX_LONGITUDE = 139.80000;
const MIN_PRICE = 3000;
const MAX_PRICE = 150000;
const MIN_ROOM_NUMBER = 1;
const MAX_ROOM_NUMBER = 15;
const MIN_GUESTS_NUMBER = 1;
const MAX_GUESTS_NUMBER = 10;

const avatarPics = [
  '01',
  '02',
  '03',
  '04',
  '05',
  '06',
  '07',
  '08',
];

const propertyTypes = [
  'palace',
  'flat',
  'house',
  'bungalow',
];

const checkinCheckoutTimes = [
  '12:00',
  '13:00',
  '14:00',
];

const featuresList = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const placesImages = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

const createRentalAd = () => {
  const locationX = getRandomPoint(MIN_LATITUDE, MAX_LATITUDE, COORDINATE_ACCURACY);
  const locationY = getRandomPoint(MIN_LONGITUDE, MAX_LONGITUDE, COORDINATE_ACCURACY);
  return {
    author: {
      avatar: 'img/avatars/user' + getRandomArrayElement(avatarPics) + '.png',
    },
    offer: {
      title: 'Недвижимость в центре города',
      address: locationX.toString() + ', ' + locationY.toString(),
      price: getRandom(MIN_PRICE, MAX_PRICE),
      type: getRandomArrayElement(propertyTypes),
      rooms: getRandom(MIN_ROOM_NUMBER, MAX_ROOM_NUMBER),
      guests: getRandom(MIN_GUESTS_NUMBER, MAX_GUESTS_NUMBER),
      checkin: getRandomArrayElement(checkinCheckoutTimes),
      checkout: getRandomArrayElement(checkinCheckoutTimes),
      features: getRandomArray(featuresList),
      description: 'Уютное помещение за неумеренную плату',
      photos: getRandomArray(placesImages),
    },
    location: {
      x: locationX,
      y: locationY,
    },
  }
};

const stackOfAds = new Array(NUMBER_OF_ADS).fill(null).map(() => createRentalAd());

const startBooking = () => stackOfAds;
startBooking();
