import { Spinner } from "react-bootstrap";
import { CSSTransition } from "react-transition-group";

import GoalProgress from "./GoalProgress";

import { SMALL_SCREEN_BREAKPOINT } from "../globals/constants";

import "../styles/GoalsContainer.scss";

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

const GoalsBar = ({
    isLoading,
    macrosEaten,
    goals,
}) => {
  return (
    <div className="goals-container mx-auto shadow">
      <CSSTransition classNames="fade" timeout={400} in={isLoading}>
        <div className="row mx-auto px-0 py-2 p-md-3 ">
          {isLoading ? (
            <Spinner animation="border" className="mx-auto my-auto" />
          ) : (
            Object.keys(MACROS).map((macro, i) => (
              <GoalProgress
                className="col-3 my-auto"
                label={MACROS[macro].label}
                eaten={macrosEaten[macro]}
                goal={goals[macro]}
                roundEaten={macro === "kcal"}
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

export default GoalsBar;
