import { Button } from "react-bootstrap";
import { GoPlus, GoDash } from "react-icons/go";

import MealEntry from "./MealEntry";

import useDiary from "../hooks/useDiary";
import useAlert from "../hooks/useAlert";

import "../styles/components/MealEntriesContainer.scss";

const MealEntriesContainer = ({ mealName, mealId, openModal }) => {
  const { state, deleteEntry } = useDiary();
  const { alertDanger } = useAlert();

  const handleEntryDelete = async (entryId) => {
    try {
      await deleteEntry(entryId);
    } catch (err) {
      alertDanger("Wystąpił błąd, spróbuj ponownie później");
    }
  };

  return (
    <div className="meal-container">
      <MealEntry
        className="shadow-sm"
        name={mealName}
        data={state.macrosByMeal[mealId]}
        variant="light"
        button={
          <Button
            variant="primary"
            className="rounded-circle"
            onClick={() => openModal(mealId)}
            aria-label={`Dodaj wpis do posiłku: ${mealName}`}
          >
            <GoPlus />
          </Button>
        }
      />
      {state.entriesByMeal[mealId].map((entry, i) => (
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
              onClick={() => handleEntryDelete(entry.id)}
              aria-label={`Usuń wpis: ${entry.name}`}
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
