const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooserElement  =  document.querySelector('.ad-form-header__input');
const previewAvatarContainerElement = document.querySelector('.avatar__preview');
const housingPhotoChooserElement = document.querySelector('.ad-form__input');
const previewHousingPhotoChooserElement = document.querySelector('.ad-form__photo');

avatarChooserElement.addEventListener('change', () => {
  const file = avatarChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    previewAvatarContainerElement.src = URL.createObjectURL(file);
  }
});

housingPhotoChooserElement.addEventListener('change', () => {
  const file = housingPhotoChooserElement.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    const previewHousingImage = URL.createObjectURL(file);
    const photoPreview = document.createElement('img');
    photoPreview.src = previewHousingImage;
    photoPreview.alt = 'Фотография жилья';
    photoPreview.style.width = '40px';
    photoPreview.style.height = '44px';
    photoPreview.style.display = 'block';
    photoPreview.style.margin = '13px auto';
    previewHousingPhotoChooserElement.append(photoPreview);
  }
});

export {previewAvatarContainerElement, previewHousingPhotoChooserElement};
