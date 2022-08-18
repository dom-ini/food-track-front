const SMALL_SCREEN_BREAKPOINT = 575;
const LARGE_SCREEN_BREAKPOINT = 991;

const MEALS = ["Śniadanie", "Lunch", "Obiad", "Podwieczorek", "Kolacja"];
const MACROS = ["kcal", "protein", "fat", "carb"];

const getEmptyMacros = () =>
  MACROS.reduce((prev, curr) => ({ ...prev, [curr]: 0 }), {});

const MACRO_TO_KCAL = {
  PROTEIN: 4,
  FAT: 9,
  CARB: 4,
};

const ENTRIES_BY_MEAL_TEMPLATE = MEALS.reduce(
  (prev, curr, i) => ({ ...prev, [i]: [] }),
  {}
);

const MACROS_BY_MEAL_TEMPLATE = MEALS.reduce(
  (prev, curr, i) => ({ ...prev, [i]: getEmptyMacros() }),
  {}
);

const MACROS_EATEN_TEMPLATE = getEmptyMacros();

export {
  SMALL_SCREEN_BREAKPOINT,
  LARGE_SCREEN_BREAKPOINT,
  MEALS,
  MACROS,
  MACRO_TO_KCAL,
  ENTRIES_BY_MEAL_TEMPLATE,
  MACROS_BY_MEAL_TEMPLATE,
  MACROS_EATEN_TEMPLATE,
};
