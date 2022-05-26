import { Row, Col } from "react-bootstrap";

import "../styles/DiaryEntriesContainer.scss";
import MealContainer from "./MealContainer";
import { MEALS } from "../globals/utils";

const DiaryEntriesContainer = ({ date, entries, mealMacros, deleteEntry, openModal }) => {
  return (
    <div className="diary-entries-container">
      <Row className="macros-labels text-center">
        <Col>
          <span>B</span>
        </Col>
        <Col>
          <span>WW</span>
        </Col>
        <Col>
          <span>T</span>
        </Col>
      </Row>
      {MEALS.map((meal, i) => (
        <MealContainer
          key={i}
          mealName={meal}
          mealId={i}
          mealEntries={entries[i]}
          mealMacros={mealMacros[i]}
          deleteEntry={deleteEntry}
          openModal={openModal}
        />
      ))}
    </div>
  );
};

export default DiaryEntriesContainer;
