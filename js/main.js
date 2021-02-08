'use strict';

const NUMBER_OF_ADS = 10;

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


const getRandom = (min, max) => {
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new RangeError('Заданный параметр не входит в допустимый диапазон');
}


const getRandomPoint = (min, max, fraction) => {
  if (min >= 0 && max > min) {
    return +((Math.random() * (max - min)) + min).toFixed(fraction);
  }
  throw new RangeError('Заданный параметр не входит в допустимый диапазон');
};


const getRandomArrayElement = (elements) =>
  elements[getRandom(0, elements.length - 1)];


const getRandomArray = (items) => {
  const RandomArray = [];
  for (let i = 0; i < items.length; i++) {
    const item = getRandomArrayElement(items);
    const isItemInclude = RandomArray.some(function (value) {
      return value === item;
    })
    if (!isItemInclude) {
      RandomArray.push(item);
    } else {
      i--;
    }
  }
  RandomArray.length = getRandom(1, items.length);
  return RandomArray;
};


const createRentalAd = () => {
  const locationX = getRandomPoint(35.65000, 35.70000, 6);
  const locationY = getRandomPoint(139.70000, 139.80000, 6);
  return {
    author: {
      avatar: 'img/avatars/user' + getRandomArrayElement(avatarPics) + '.png',
    },
    offer: {
      title: 'Недвижимость в центре города',
      address: locationX.toString() + ', ' + locationY.toString(),
      price: getRandom(3000, 150000),
      type: getRandomArrayElement(propertyTypes),
      rooms: getRandom(1, 15),
      guests: getRandom(1,10),
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
