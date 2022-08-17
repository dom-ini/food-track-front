import { useEffect, useState } from "react";
import { ProgressBar } from "react-bootstrap";

import "../styles/GoalDisplayer.scss";

const GoalProgress = ({
  className,
  label,
  eaten,
  roundEaten,
  goal,
  suffix,
  barColor,
}) => {
  const [progress, setProgress] = useState(0);
  const [variant, setVariant] = useState(barColor);

  useEffect(() => {
    const calculateProgress = () => {
      let goalProgress = Math.round((eaten * 100) / goal);
      if (goalProgress > 100) {
        setVariant("danger");
        goalProgress = goalProgress % 100;
      } else {
        setVariant(barColor);
      }
      setProgress(goalProgress);
    };

    calculateProgress();
  }, [eaten, goal, barColor]);

  return (
    <div className={className}>
      <span className="macros-name">{label}</span>
      <div className={`macros-numbers ${goal === undefined ? "" : "goals-set"}`}>
        <span className="macros-eaten">
          {roundEaten ? eaten.toFixed(0) : eaten.toFixed(1)}
        </span>
        <span className="macros-goal">
          {goal && "/" + goal} {suffix}
        </span>
      </div>
      {goal && (
        <ProgressBar
          striped
          now={progress}
          variant={variant}
          className={
            variant === "danger" ? `progress-exceed-${barColor}` : null
          }
        />
      )}
    </div>
  );
};

export default GoalProgress;
