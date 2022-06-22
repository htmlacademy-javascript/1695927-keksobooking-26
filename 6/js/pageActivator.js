const adForm = document.querySelector('.ad-form');
const adFormHeader = document.querySelector('.ad-form-header');
const adFormElements = document.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeature = document.querySelector('.map__features');

const pageDisable = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('.map__filters--disabled');
  adFormHeader.setAttribute('disabled', 'disabled');
  adFormElements.forEach((adFormElement)=>{
    adFormElement.setAttribute('disabled', 'disabled');
  });
  mapFilters.forEach((mapFiltersElement)=>{
    mapFiltersElement.setAttribute('disabled', 'disabled');
  });
  mapFeature.setAttribute('disabled', 'disabled');
};

pageDisable();

const pageActivate = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('.map__filters--disabled');
  adFormHeader.removeAttribute('disabled');
  adFormElements.forEach((adFormElement)=>{
    adFormElement.removeAttribute('disabled');
  });
  mapFilters.forEach((mapFiltersElement)=>{
    mapFiltersElement.removeAttribute('disabled');
  });
  mapFeature.removeAttribute('disabled');
};

pageActivate();
