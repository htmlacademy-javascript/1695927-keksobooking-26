const adForm = document.querySelector('.ad-form');
const mapFilter = document.querySelector('.map__filters');
const elementsForDisabling = document.querySelectorAll('fieldset , select.map__filter');

const elementDisable = () => {
  elementsForDisabling.forEach((elementForDisabling) => {
    elementForDisabling.disabled = !elementForDisabling.disabled;
  });
};

const pageActivator = () => {
  adForm.classList.toggle('ad-form--disabled');
  mapFilter.classList.toggle('.map__filters--disabled');
  elementDisable();
};

pageActivator();
pageActivator();
