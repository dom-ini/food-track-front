const SMALL_SCREEN_BREAKPOINT = 575;
const LARGE_SCREEN_BREAKPOINT = 991;

const MEALS = ["Śniadanie", "Lunch", "Obiad", "Podwieczorek", "Kolacja"];

const MACRO_TO_KCAL = {
  PROTEIN: 4,
  FAT: 9,
  CARB: 4,
};

const ENTRIES_BY_MEAL_TEMPLATE = {
  0: [],
  1: [],
  2: [],
  3: [],
  4: [],
};

const MACROS_BY_MEAL_TEMPLATE = {
  0: { kcal: 0, protein: 0, fat: 0, carb: 0 },
  1: { kcal: 0, protein: 0, fat: 0, carb: 0 },
  2: { kcal: 0, protein: 0, fat: 0, carb: 0 },
  3: { kcal: 0, protein: 0, fat: 0, carb: 0 },
  4: { kcal: 0, protein: 0, fat: 0, carb: 0 },
};

const MACROS_EATEN_TEMPLATE = { kcal: 0, protein: 0, fat: 0, carb: 0 };

export {
  SMALL_SCREEN_BREAKPOINT,
  LARGE_SCREEN_BREAKPOINT,
  MEALS,
  MACRO_TO_KCAL,
  ENTRIES_BY_MEAL_TEMPLATE,
  MACROS_BY_MEAL_TEMPLATE,
  MACROS_EATEN_TEMPLATE
};
