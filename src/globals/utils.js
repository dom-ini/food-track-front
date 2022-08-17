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
  calculateAbsoluteMacro,
  calculateMacroFromWeight,
  convertObjectPropsToFloat,
  convertArrayOfObjectsPropsToFloat,
};
