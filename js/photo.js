const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const avatarChooser  =  document.querySelector('.ad-form-header__input');
const previewAvatarContainer = document.querySelector('.avatar__preview');
const housingPhotoChooser = document.querySelector('.ad-form__input');
const previewHousingPhotoChooser = document.querySelector('.ad-form__photo');

avatarChooser.addEventListener('change', () => {
  const file = avatarChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    previewAvatarContainer.src = URL.createObjectURL(file);
  }
});

housingPhotoChooser.addEventListener('change', () => {
  const file = housingPhotoChooser.files[0];
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
    previewHousingPhotoChooser.append(photoPreview);
  }
});

export {previewAvatarContainer, previewHousingPhotoChooser};
