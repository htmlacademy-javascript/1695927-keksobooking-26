const getRandomInteger = (from, until) => {
  if (from < 0 || until < 0) {
    return -1;
  }
  if (from > until) {
    [from, until] = [until, from];
  }
  return Math.floor(Math.random() * (until - from + 1)) + from;
};

const getRandom = (from, until, digits = 5) => {
  if (from < 0 || until < 0) {
    return -1;
  }
  if (from > until) {
    [from, until] = [until, from];
  }
  return parseFloat((Math.random() * (until - from) + from).toFixed(digits));
};

const getRandomArrayElement = (elements) => (
  elements[getRandomInteger(0, elements.length - 1)]
);

const getRandomArrayOfArray = (originalArray) => {
  const maxLength = originalArray.length;
  const lengthOfArray = getRandomInteger(1, maxLength);
  const newArray = [];
  while (newArray.length < lengthOfArray) {
    const indexOfElement =  getRandomInteger(0, maxLength - 1);
    const element = originalArray[indexOfElement];
    if (!newArray.includes(element)) {
      newArray.push(element);
    }
  }
  return newArray;
};

const switchingOfTypesHousing = (type) => {
  switch (type) {
    case 'hotel':
      return 'Отель';
    case 'palace':
      return 'Дворец';
    case 'house':
      return 'Дом';
    case 'bungalow':
      return 'Бунгало';
    case 'flat':
      return 'Квартира';
  }
};

const numDecline = (num, nominative, genitiveSingular, genitivePlural) => {
  switch (true) {
    case (num % 100 > 10 && num % 100 < 21) || (num % 10 > 4 && num % 10 < 10) || (num % 10 === 0):
      return genitivePlural;
    case num % 10 === 1:
      return nominative;
    case num % 10 > 1 && num % 10 < 5:
      return genitiveSingular;
  }
};

const getAddress = ({ lat, lng }) => (
  `${lat.toFixed(5)}, ${lng.toFixed(5)}`
);

export {getRandomInteger , getRandom , getRandomArrayElement , getRandomArrayOfArray, switchingOfTypesHousing,numDecline, getAddress};