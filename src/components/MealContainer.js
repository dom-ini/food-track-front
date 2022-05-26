import { Button } from "react-bootstrap";
import { GoPlus, GoDash } from "react-icons/go";

import "../styles/MealContainer.scss";
import MealBox from "./MealBox";

const MealContainer = ({
  mealName,
  mealId,
  mealEntries,
  mealMacros,
  deleteEntry,
  openModal,
}) => {
  return (
    <div className="meal-container">
      <MealBox
        className="shadow-sm"
        name={mealName}
        data={mealMacros}
        variant="light"
        button={
          <Button
            variant="primary"
            className="rounded-circle"
            onClick={() => openModal(mealId)}
          >
            <GoPlus />
          </Button>
        }
      />
      {mealEntries.map((entry, i) => (
        <MealBox
          key={i}
          className=""
          name={entry.name}
          data={entry}
          variant="dark"
          button={
            <Button
              variant="danger"
              className="rounded-circle"
              onClick={() => deleteEntry(entry.id)}
            >
              <GoDash />
            </Button>
          }
        />
      ))}
    </div>
  );
};

export default MealContainer;
