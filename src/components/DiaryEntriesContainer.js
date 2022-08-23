import { Row, Col } from "react-bootstrap";

import MealEntriesContainer from "./MealEntriesContainer";

import { MEALS } from "../globals/constants";

import "../styles/components/DiaryEntriesContainer.scss";

const DiaryEntriesContainer = ({ entries, mealMacros, deleteEntry, openModal }) => {
  return (
    <div className="diary-entries-container mx-auto">
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
        <MealEntriesContainer
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
