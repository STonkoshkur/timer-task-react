export const getRandomValue = (minVal, maxVal) => {
  return Math.floor(minVal + Math.random() * (maxVal + 1 - minVal));
};

export default {
  getRandomValue
};
