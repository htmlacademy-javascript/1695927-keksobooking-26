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

export {getRandomInteger , getRandom , getRandomArrayElement , getRandomArrayOfArray};
