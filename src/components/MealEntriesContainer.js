import { Button } from "react-bootstrap";
import { GoPlus, GoDash } from "react-icons/go";

import "../styles/MealContainer.scss";
import MealEntry from "./MealEntry";

const MealEntriesContainer = ({
  mealName,
  mealId,
  mealEntries,
  mealMacros,
  deleteEntry,
  openModal,
}) => {
  return (
    <div className="meal-container">
      <MealEntry
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
        <MealEntry
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

export default MealEntriesContainer;
