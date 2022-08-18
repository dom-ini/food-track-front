const calculateAbsoluteMacro = (kcal, perc, multiplier) => {
  return Math.round((kcal * (perc / 100)) / multiplier, 2);
};

const calculateMacroFromWeight = (weight, macroIn100) => {
  const macroAmount = (weight / 100) * macroIn100;
  return parseFloat(macroAmount).toFixed(1);
};

const createObjectFromTemplate = (template) => {
  return JSON.parse(JSON.stringify(template));
};

export {
  calculateAbsoluteMacro,
  calculateMacroFromWeight,
  createObjectFromTemplate
};
