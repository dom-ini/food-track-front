import { useEffect, useState } from "react";
import { format } from "date-fns";

import DiaryDatePicker from "./DiaryDatePicker";
import DiaryEntriesContainer from "./DiaryEntriesContainer";
import GoalsContainer from "./GoalsContainer";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";
import ENDPOINTS from "../globals/endpoints";
import ProductEntryAddModal from "./ProductEntryAddModal";

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

// jedna funkcja do tworzenia obiektu z template

const getEmptyEntriesByMeal = () => {
  return JSON.parse(JSON.stringify(ENTRIES_BY_MEAL_TEMPLATE));
};

const getEmptyMacrosByMeal = () => {
  return JSON.parse(JSON.stringify(MACROS_BY_MEAL_TEMPLATE));
};

const getEmptyMacrosEaten = () => {
  return JSON.parse(JSON.stringify(MACROS_EATEN_TEMPLATE));
};

const DiaryContainer = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedDay, setSelectedDay] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [entriesByMeal, setEntriesByMeal] = useState(getEmptyEntriesByMeal());
  const [macrosByMeal, setMacrosByMeal] = useState(getEmptyMacrosByMeal());
  const [macrosEaten, setMacrosEaten] = useState(getEmptyMacrosEaten());
  const axiosPrivate = useAxiosPrivate();
  const alert = useAlert();

  useEffect(() => {
    setEntriesByMeal(getEmptyEntriesByMeal());
    setMacrosByMeal(getEmptyMacrosByMeal());
    setMacrosEaten(getEmptyMacrosEaten());

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
          setDiaryEntries([]);
          return;
        }
        setDiaryEntries(response.data.results);
      } catch (err) {
        if (err.name !== "CanceledError")
          alert.danger("Wystąpił błąd, spróbuj ponownie później");
      }
    };

    getDiaryEntriesByDate(selectedDay);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, selectedDay]);

  useEffect(() => {
    const transformEntriesData = () => {
      const entriesByMealTemp = getEmptyEntriesByMeal();
      const macrosByMealTemp = getEmptyMacrosByMeal();
      const macrosEatenTemp = getEmptyMacrosEaten();

      diaryEntries.forEach((item) => {
        const entryId = item.id;
        const entry = item.entry;
        const mealId = item.meal;
        const weight = parseFloat(entry.weight);
        const { kcal, protein, fat, carb } = calculateMacrosByWeight(
          weight,
          parseFloat(entry.product.kcal_for_100),
          parseFloat(entry.product.protein_for_100),
          parseFloat(entry.product.fat_for_100),
          parseFloat(entry.product.carbo_for_100)
        );

        const transformedEntry = {
          name: entry.product.name,
          weight,
          kcal,
          protein,
          fat,
          carb,
          id: entryId,
        };
        entriesByMealTemp[mealId].push(transformedEntry);

        macrosByMealTemp[mealId].kcal += kcal;
        macrosByMealTemp[mealId].protein += protein;
        macrosByMealTemp[mealId].fat += fat;
        macrosByMealTemp[mealId].carb += carb;

        macrosEatenTemp.kcal += kcal;
        macrosEatenTemp.protein += protein;
        macrosEatenTemp.fat += fat;
        macrosEatenTemp.carb += carb;
      });

      setEntriesByMeal(entriesByMealTemp);
      setMacrosByMeal(macrosByMealTemp);
      setMacrosEaten(macrosEatenTemp);
    };

    const calculateMacrosByWeight = (
      weight,
      kcal100,
      protein100,
      fat100,
      carb100
    ) => {
      return {
        kcal: (weight * kcal100) / 100,
        protein: (weight * protein100) / 100,
        fat: (weight * fat100) / 100,
        carb: (weight * carb100) / 100,
      };
    };

    transformEntriesData();
  }, [diaryEntries]);

  const handleEntryDelete = async (entryId) => {
    try {
      const response = await axiosPrivate.delete(
        ENDPOINTS.DIARY_ENTRIES_URL + entryId
      );
      if (response.status === 204) {
        const newDiaryEntries = diaryEntries.filter(
          (item) => item.id !== entryId
        );
        setDiaryEntries(newDiaryEntries);
      }
    } catch (err) {
      alert.danger("Wystąpił błąd, spróbuj ponownie później");
    }
  };

  const openModalAndSelectMeal = (mealId) => {
    setSelectedMeal(mealId);
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <div>
      <DiaryDatePicker
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <DiaryEntriesContainer
        selectedDay={selectedDay}
        entries={entriesByMeal}
        mealMacros={macrosByMeal}
        deleteEntry={handleEntryDelete}
        openModal={openModalAndSelectMeal}
      />
      <GoalsContainer date={selectedDay} macrosEaten={macrosEaten} />
      <ProductEntryAddModal
        isModalVisible={isModalVisible}
        date={selectedDay}
        meal={selectedMeal}
        closeModal={closeModal}
        setDiaryEntries={setDiaryEntries}
      />
    </div>
  );
};

export default DiaryContainer;
