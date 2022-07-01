import {priceField} from './userForm.js';

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

sliderElement.noUiSlider.on('set', () => {
  priceField.value = sliderElement.noUiSlider.get();
});

