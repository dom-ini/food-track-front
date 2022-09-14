import { Row, Col } from "react-bootstrap";

import MealEntriesContainer from "./MealEntriesContainer";

import useDiary from "../hooks/useDiary";

import { MEALS } from "../globals/constants";

import "../styles/components/DiaryEntriesContainer.scss";

const DiaryEntriesContainer = ({ setIsModalVisible }) => {
  const { setSelectedMeal } = useDiary();

  const openModalAndSelectMeal = (mealId) => {
    setSelectedMeal(mealId);
    setIsModalVisible(true);
  };

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
          openModal={openModalAndSelectMeal}
        />
      ))}
    </div>
  );
};

export default DiaryEntriesContainer;
