const adFormElement = document.querySelector('.ad-form');
const mapFilterElement = document.querySelector('.map__filters');
const elementsForDisabling = document.querySelectorAll('fieldset , select.map__filter');

const elementDisable = () => {
  elementsForDisabling.forEach((elementForDisabling) => {
    elementForDisabling.disabled = !elementForDisabling.disabled;
  });
};

const makeActivePage = () => {
  adFormElement.classList.toggle('ad-form--disabled');
  mapFilterElement.classList.toggle('.map__filters--disabled');
  elementDisable();
};

const filterActivator = () =>{
  elementDisable();
};

export {makeActivePage, filterActivator};
