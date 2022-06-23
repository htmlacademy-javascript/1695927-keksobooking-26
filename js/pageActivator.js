const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const elementsForDisabling = document.querySelectorAll('fieldset , select.map__filter');

const elementDisable = () => {
  elementsForDisabling.forEach((elementForDisabling) => {
    elementForDisabling.disabled = !elementForDisabling.disabled;
  });
};

const pageDisable = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('.map__filters--disabled');
  elementDisable();
};

const pageActivate = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('.map__filters--disabled');
  elementDisable();
};

pageDisable();

pageActivate();
