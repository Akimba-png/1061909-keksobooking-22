'use strict';

const getRandom = function (min, max) {
  if (min >= 0 && max > min) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  throw new RangeError('Заданный параметр не входит в допустимый диапазон');
}

const getRandomPoint = function (min, max, fraction) {
  if (min >= 0 && max > min) {
    return +((Math.random() * (max - min)) + min).toFixed(fraction);
  }
  throw new RangeError('Заданный параметр не входит в допустимый диапазон');
};

getRandom(45, 120);
getRandomPoint(34, 175, 2);
