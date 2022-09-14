const calculateMacro = (value, percentage, multiplier = 1) => {
  return (value * (percentage / 100)) / multiplier;
};

export { calculateMacro };
