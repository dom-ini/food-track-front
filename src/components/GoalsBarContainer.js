import { useEffect, useState } from "react";
import format from "date-fns/format";

import GoalsBar from "./GoalsBar";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";

import { calculateMacro } from "../globals/utils";
import { MACRO_TO_KCAL } from "../globals/constants";
import ENDPOINTS from "../globals/endpoints";

import "../styles/GoalsContainer.scss";

const GoalsBarContainer = ({ date, macrosEaten }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [goals, setGoals] = useState({});
  const axiosPrivate = useAxiosPrivate();
  const alert = useAlert();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getGoalsByDate = async (date) => {
      try {
        setIsLoading(true);
        const response = await axiosPrivate.get(ENDPOINTS.GOALS_URL, {
          signal: controller.signal,
          params: {
            from_date: format(date, "yyyy-MM-dd"),
          },
        });
        if (!isMounted || !response.data?.results.length) {
          setGoals({});
          return;
        }
        const goals = transformGoalsToAbsolute(response.data.results[0]);
        setGoals(goals);
      } catch (err) {
        if (err.name !== "CanceledError")
          alert.danger("Wystąpił błąd, spróbuj ponownie później");
      } finally {
        setIsLoading(false);
      }
    };

    getGoalsByDate(date);

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, date]);

  const transformGoalsToAbsolute = (data) => {
    const kcal = data.daily_kcal_goal;
    const protein = calculateMacro(
      kcal,
      data.daily_protein_goal,
      MACRO_TO_KCAL.PROTEIN
    ).toFixed(1);
    const fat = calculateMacro(
      kcal,
      data.daily_fat_goal,
      MACRO_TO_KCAL.FAT
    ).toFixed(1);
    const carb = calculateMacro(
      kcal,
      data.daily_carb_goal,
      MACRO_TO_KCAL.CARB
    ).toFixed(1);

    return {
      kcal,
      protein,
      fat,
      carb,
    };
  };

  return (
    <GoalsBar isLoading={isLoading} macrosEaten={macrosEaten} goals={goals} />
  );
};

export default GoalsBarContainer;
