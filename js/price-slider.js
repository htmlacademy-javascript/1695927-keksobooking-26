import {priceFieldElement} from './elements-of-dom.js';

const MIN_SLIDER_VALUE = 0;
const MAX_SLIDER_VALUE = 100000;
const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement,{
  range: {
    min: MIN_SLIDER_VALUE,
    max: MAX_SLIDER_VALUE,
  },
  start: String(priceFieldElement.placeholder),
  step: 1,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

priceFieldElement.addEventListener('input',()=>{
  sliderElement.noUiSlider.set(priceFieldElement.value);
});

sliderElement.noUiSlider.on('change', () => {
  priceFieldElement.value = sliderElement.noUiSlider.get();
});

export {sliderElement};
