export const randomInt = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const randomArrayElement = (array) => array[randomInt(0, array.length)];
