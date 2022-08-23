import { useEffect, useState } from "react";
import { format } from "date-fns";

import DiaryDatePickerContainer from "../components/DiaryDatePickerContainer";
import DiaryEntriesContainer from "../components/DiaryEntriesContainer";
import ProductEntryAddModal from "../components/ProductEntryAddModal";
import GoalsBarContainer from "../components/GoalsBarContainer";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";

import { createObjectFromTemplate, calculateMacro } from "../globals/utils";
import ENDPOINTS from "../globals/endpoints";
import {
  ENTRIES_BY_MEAL_TEMPLATE,
  MACROS_BY_MEAL_TEMPLATE,
  MACROS_EATEN_TEMPLATE,
  MACROS,
} from "../globals/constants";

const Diary = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [selectedDay, setSelectedDay] = useState(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [entriesByMeal, setEntriesByMeal] = useState(
    createObjectFromTemplate(ENTRIES_BY_MEAL_TEMPLATE)
  );
  const [macrosByMeal, setMacrosByMeal] = useState(
    createObjectFromTemplate(MACROS_BY_MEAL_TEMPLATE)
  );
  const [macrosEaten, setMacrosEaten] = useState(
    createObjectFromTemplate(MACROS_EATEN_TEMPLATE)
  );
  const axiosPrivate = useAxiosPrivate();
  const alert = useAlert();

  useEffect(() => {
    setEntriesByMeal(createObjectFromTemplate(ENTRIES_BY_MEAL_TEMPLATE));
    setMacrosByMeal(createObjectFromTemplate(MACROS_BY_MEAL_TEMPLATE));
    setMacrosEaten(createObjectFromTemplate(MACROS_EATEN_TEMPLATE));

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
      const entriesByMealTemp = createObjectFromTemplate(
        ENTRIES_BY_MEAL_TEMPLATE
      );
      const macrosByMealTemp = createObjectFromTemplate(
        MACROS_BY_MEAL_TEMPLATE
      );
      const macrosEatenTemp = createObjectFromTemplate(MACROS_EATEN_TEMPLATE);

      diaryEntries.forEach((item) => {
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
        entriesByMealTemp[mealId].push(transformedEntry);

        MACROS.forEach((macro) => {
          macrosByMealTemp[mealId][macro] += macros[macro];
          macrosEatenTemp[macro] += macros[macro];
        });
      });

      setEntriesByMeal(entriesByMealTemp);
      setMacrosByMeal(macrosByMealTemp);
      setMacrosEaten(macrosEatenTemp);
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
      <DiaryDatePickerContainer
        selectedDay={selectedDay}
        setSelectedDay={setSelectedDay}
      />
      <DiaryEntriesContainer
        entries={entriesByMeal}
        mealMacros={macrosByMeal}
        deleteEntry={handleEntryDelete}
        openModal={openModalAndSelectMeal}
      />
      <GoalsBarContainer date={selectedDay} macrosEaten={macrosEaten} />
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

export default Diary;
