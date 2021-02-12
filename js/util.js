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
  const randomArray = [];
  for (let i = 0; i < items.length; i++) {
    const item = getRandomArrayElement(items);
    const isItemInclude = randomArray.some(function (value) {
      return value === item;
    })
    if (!isItemInclude) {
      randomArray.push(item);
    } else {
      i--;
    }
  }
  randomArray.length = getRandom(1, items.length);
  return randomArray;
};

export {getRandom, getRandomPoint, getRandomArrayElement, getRandomArray};
