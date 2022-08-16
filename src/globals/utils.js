const SMALL_SCREEN_BREAKPOINT = 575;

const MEALS = ["Śniadanie", "Lunch", "Obiad", "Podwieczorek", "Kolacja"];

const MACRO_TO_KCAL = {
  PROTEIN: 4,
  FAT: 9,
  CARB: 4,
};

const calculateAbsoluteMacro = (kcal, perc, multiplier) => {
  return Math.round((kcal * (perc / 100)) / multiplier, 2);
};

const calculateMacroFromWeight = (weight, macroIn100) => {
  const macroAmount = (weight / 100) * macroIn100;
  return parseFloat(macroAmount).toFixed(1);
};

const convertArrayOfObjectsPropsToFloat = (arr, keys) => {
  arr.forEach((item, i) => {
    arr[i] = convertObjectPropsToFloat(item, keys);
  });
  return arr;
};

const convertObjectPropsToFloat = (object, keys) => {
  keys.forEach((key) => {
    if (object[key]) object[key] = parseFloat(object[key]);
  });
  return object;
};

export {
  SMALL_SCREEN_BREAKPOINT,
  MEALS,
  MACRO_TO_KCAL,
  calculateAbsoluteMacro,
  calculateMacroFromWeight,
  convertObjectPropsToFloat,
  convertArrayOfObjectsPropsToFloat,
};
