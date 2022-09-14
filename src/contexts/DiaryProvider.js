import { createContext, useState, useEffect, useReducer } from "react";
import { format } from "date-fns";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";

import { calculateMacro } from "../utils/utils";
import ENDPOINTS from "../globals/endpoints";
import {
  ENTRIES_BY_MEAL_TEMPLATE,
  MACROS_BY_MEAL_TEMPLATE,
  MACROS_EATEN_TEMPLATE,
  MACROS,
} from "../globals/constants";

const DiaryContext = createContext();

const initialState = {
  selectedMeal: null,
  selectedDay: new Date(new Date().setHours(0, 0, 0, 0)),
  diaryEntries: [],
  entriesByMeal: structuredClone(ENTRIES_BY_MEAL_TEMPLATE),
  macrosByMeal: structuredClone(MACROS_BY_MEAL_TEMPLATE),
  macrosEaten: structuredClone(MACROS_EATEN_TEMPLATE),
};

const reducer = (state, action) => {
  switch (action.type) {
    case "set-day": {
      return { ...state, selectedDay: action.payload };
    }
    case "set-meal": {
      return { ...state, selectedMeal: action.payload };
    }
    case "set-entries": {
      const detailedEntries = transformEntriesData(action.payload);
      return { ...state, ...detailedEntries, diaryEntries: action.payload };
    }
    case "delete-entry": {
      const newDiaryEntries = state.diaryEntries.filter(
        (item) => item.id !== action.payload
      );
      const detailedEntries = transformEntriesData(newDiaryEntries);
      return { ...state, ...detailedEntries, diaryEntries: newDiaryEntries };
    }
    case "add-entry": {
      const newDiaryEntries = [...state.diaryEntries, action.payload];
      const detailedEntries = transformEntriesData(newDiaryEntries);
      return { ...state, ...detailedEntries, diaryEntries: newDiaryEntries };
    }
    case "reset-entries": {
      return {
        ...state,
        diaryEntries: initialState.diaryEntries,
        entriesByMeal: initialState.entriesByMeal,
        macrosByMeal: initialState.macrosByMeal,
        macrosEaten: initialState.macrosEaten,
      };
    }
    default:
      return state;
  }
};

const transformEntriesData = (diaryEntries) => {
  const entriesByMeal = structuredClone(initialState.entriesByMeal);
  const macrosByMeal = structuredClone(initialState.macrosByMeal);
  const macrosEaten = structuredClone(initialState.macrosEaten);

  for (let item of diaryEntries) {
    const product = item.entry.product;
    const mealId = item.meal;
    const weight = item.entry.weight;
    const macros = calculateMacrosByWeight(weight, product, MACROS);

    const transformedEntry = {
      name: product.name,
      id: item.id,
      weight,
      ...macros,
    };
    entriesByMeal[mealId].push(transformedEntry);

    for (let macro of MACROS) {
      macrosByMeal[mealId][macro] += macros[macro];
      macrosEaten[macro] += macros[macro];
    }
  }

  return { entriesByMeal, macrosByMeal, macrosEaten };
};

const calculateMacrosByWeight = (weight, product, macroNames) => {
  return macroNames.reduce(
    (prev, curr) => ({
      ...prev,
      [curr]: calculateMacro(weight, product[curr]),
    }),
    {}
  );
};

export const DiaryProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const axiosPrivate = useAxiosPrivate();
  const { alertDanger } = useAlert();

  useEffect(() => {
    dispatch({ type: "reset-entries" });
    let isMounted = true;
    const controller = new AbortController();

    const getDiaryEntriesByDate = async (date) => {
      try {
        const response = await axiosPrivate.get(ENDPOINTS.DIARY_ENTRIES_URL, {
          signal: controller.signal,
          params: {
            date: format(date, "yyyy-MM-dd"),
          },
        });
        if (!isMounted || !response.data?.results.length) {
          dispatch({ type: "reset-entries" });
          return;
        }
        dispatch({ type: "set-entries", payload: response.data.results });
      } catch (err) {
        if (err.name !== "CanceledError")
          alertDanger("Wystąpił błąd, spróbuj ponownie później");
      }
    };

    getDiaryEntriesByDate(state.selectedDay);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, state.selectedDay, alertDanger]);

  const deleteEntry = async (entryId) => {
    const response = await axiosPrivate.delete(
      ENDPOINTS.DIARY_ENTRIES_URL + entryId
    );
    if (response.status !== 204) return;
    dispatch({ type: "delete-entry", payload: entryId });
  };

  const addEntry = async (payload) => {
    const response = await axiosPrivate.post(
      ENDPOINTS.DIARY_ENTRIES_URL,
      payload
    );
    const newEntry = response?.data;
    if (!newEntry) return;
    dispatch({ type: "add-entry", payload: newEntry });
  };

  return (
    <DiaryContext.Provider
      value={{
        state,
        dispatch,
        deleteEntry,
        addEntry,
      }}
    >
      {children}
    </DiaryContext.Provider>
  );
};

export default DiaryContext;
