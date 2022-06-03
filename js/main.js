const getRandomInteger = (from, until) => {
  if (from > until) {
    [from, until] = [until, from];
  }
  if (from < 0 || until < 0) {
    return -1;
  }

  return Math.floor(Math.random() * (until - from + 1)) + from;
};

getRandomInteger(230, 20);

const getRandom = (from, until, digits) => {
  if (from > until) {
    [from, until] = [until, from];
  }
  if (from < 0 || until < 0) {
    return -1;
  }

  return parseFloat((Math.random() * (until - from) + from).toFixed(digits));
};

getRandom(9.1, 1.1, 6);
