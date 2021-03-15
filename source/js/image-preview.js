const AVAILABLE_FORMATS = ['.jpeg', 'jpg', '.png'];
const DEFAULT_IMAGE_SRC = 'img/muffin-grey.svg';

const adForm = document.querySelector('.ad-form');
const avatarChooser = adForm.querySelector('#avatar');
const avatarPic = adForm.querySelector('.ad-form-header__preview-image');
const propertyPhotoChooser = adForm.querySelector('#images');
const propertyPhotoBlock = adForm.querySelector('.ad-form__photo');
const defaultImageSize = {
  width: '70px',
  height: '70px',
};


const previewUploadImage = (input, image, formats) => {
  input.addEventListener('change', () => {
    const providedFile = input.files[0];
    const providedFileName = providedFile.name.toLowerCase();

    const isFormatCorrect = formats.some((format) => {
      return providedFileName.endsWith(format);
    });

    if (isFormatCorrect) {
      const reader = new FileReader();

      reader.addEventListener('load', () => {
        image.src = reader.result;
      });

      reader.readAsDataURL(providedFile);
    }
  });
};

previewUploadImage(avatarChooser, avatarPic, AVAILABLE_FORMATS);

const propertyPic = document.createElement('img');
propertyPic.style.width = defaultImageSize.width;
propertyPic.style.height = defaultImageSize.height;
propertyPic.alt = 'Изображение жилья';
propertyPic.src = DEFAULT_IMAGE_SRC;
propertyPhotoBlock.appendChild(propertyPic);

previewUploadImage(propertyPhotoChooser, propertyPic, AVAILABLE_FORMATS);

const resetPicToDefault = () => {
  avatarPic.src = DEFAULT_IMAGE_SRC;
  propertyPic.src = DEFAULT_IMAGE_SRC;
};

export {resetPicToDefault};
