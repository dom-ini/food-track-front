const calculateMacro = (value, percentage, multiplier = 1) => {
  return value * (percentage / 100) / multiplier;
}

const createObjectFromTemplate = (template) => {
  return JSON.parse(JSON.stringify(template));
};

export {
  calculateMacro,
  createObjectFromTemplate
};
