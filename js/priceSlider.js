import {priceField} from './elementsOfDom.js';

const minSliderValue = 0;
const maxSliderValue = 100000;
const sliderElement = document.querySelector('.ad-form__slider');

noUiSlider.create(sliderElement,{
  range: {
    min: minSliderValue,
    max: maxSliderValue,
  },
  start: String(priceField.placeholder),
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

priceField.addEventListener('input',()=>{
  sliderElement.noUiSlider.set(priceField.value);
});

sliderElement.noUiSlider.on('change', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

export {sliderElement};
