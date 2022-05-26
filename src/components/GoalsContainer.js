import { useEffect, useState } from "react";
import format from "date-fns/format";

import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useAlert from "../hooks/useAlert";
import ENDPOINTS from "../globals/endpoints";
import { calculateAbsoluteMacro, MACRO_TO_KCAL } from "../globals/utils";
import { Spinner } from "react-bootstrap";
import GoalDisplayer from "./GoalDisplayer";
import "../styles/GoalsContainer.scss";
import { CSSTransition } from "react-transition-group";

const SMALL_SCREEN_BREAKPOINT = 575;

const MACROS = {
  kcal: { label: "kcal", color: "green" },
  protein: { label: "białko", color: "orange" },
  carb: {
    label:
      window.innerWidth < SMALL_SCREEN_BREAKPOINT ? "węgl." : "węglowodany",
    color: "blue",
  },
  fat: { label: "tłuszcze", color: "brown" },
};

const GoalsContainer = ({ date, macrosEaten }) => {
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
    const protein = calculateAbsoluteMacro(
      kcal,
      data.daily_protein_goal,
      MACRO_TO_KCAL.PROTEIN
    );
    const fat = calculateAbsoluteMacro(
      kcal,
      data.daily_fat_goal,
      MACRO_TO_KCAL.FAT
    );
    const carb = calculateAbsoluteMacro(
      kcal,
      data.daily_carb_goal,
      MACRO_TO_KCAL.CARB
    );

    return {
      kcal,
      protein,
      fat,
      carb,
    };
  };

  return (
    <div className="goals-container shadow">
      <CSSTransition classNames="fade" timeout={400} in={isLoading}>
        <div className="row mx-auto px-0 py-2 p-md-3 ">
          {isLoading ? (
            <Spinner animation="border" className="mx-auto my-auto" />
          ) : (
            Object.keys(MACROS).map((macro, i) => (
              <GoalDisplayer
                className="col-3 my-auto"
                label={MACROS[macro].label}
                eaten={macrosEaten[macro]}
                goal={goals[macro]}
                roundEaten={macro === "kcal" ? true : false}
                suffix={macro === "kcal" ? "" : "g"}
                barColor={MACROS[macro].color}
                key={i}
              />
            ))
          )}
        </div>
      </CSSTransition>
    </div>
  );
};

export default GoalsContainer;
