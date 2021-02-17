import {createRentalAds} from './create-ads.js'

const adBlock = document.querySelector('.map__canvas');
const adTemplate = document.querySelector('#card').content.querySelector('.popup');

const checkPropertyType = (property) => (property === 'flat') ? 'Квартира' :
  (property === 'bungalow') ? 'Бунгало' : (property === 'house') ? 'Дом' : 'Дворец';

const renderFeatureIcons = (possibleFeatureElements, availbaleFeatures) => {
  possibleFeatureElements.forEach((possibleFeatureElement) => {
    let isTrue = false;
    availbaleFeatures.forEach((availbaleFeature) => {
      if (possibleFeatureElement.classList.contains(`popup__feature--${availbaleFeature}`)) {
        isTrue = true;
      }
    });
    if (!isTrue) {
      possibleFeatureElement.style.display = 'none';
    }
  });
};

const randomAds = createRentalAds();
const adsListFragment = document.createDocumentFragment();

randomAds.forEach(({author: {avatar}, offer: {title, address, price, type, rooms, guests, checkin,
  checkout, features, description, photos}}) => {
  const adElement = adTemplate.cloneNode(true);

  const createFotoFragment = () => {
    const photoListFragment = document.createDocumentFragment();
    const photoTemplate = adElement.querySelector('.popup__photo');
    photos.forEach((photo) => {
      const photoElement = photoTemplate.cloneNode(true);
      photoElement.src = photo;
      photoListFragment.appendChild(photoElement);
    });
    photoTemplate.style.display = 'none';
    return photoListFragment;
  };

  adElement.querySelector('.popup__title').textContent = title;
  adElement.querySelector('.popup__text--address').textContent = address;
  adElement.querySelector('.popup__text--price').textContent = `${price} ₽/ночь`;
  adElement.querySelector('.popup__type').textContent = checkPropertyType(type);
  adElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests}`;
  adElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`;
  const featuresElementsList = adElement.querySelectorAll('.popup__feature');
  renderFeatureIcons(featuresElementsList, features);
  adElement.querySelector('.popup__description').textContent = description;
  adElement.querySelector('.popup__photos').appendChild(createFotoFragment());
  adElement.querySelector('.popup__avatar').src = avatar;

  adsListFragment.appendChild(adElement);
});

adBlock.appendChild(adsListFragment.firstChild);
