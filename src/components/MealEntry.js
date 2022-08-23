import { Col, Row } from "react-bootstrap";

const MealEntry = ({ name, data, variant, button, className }) => {
  const boxVariant = variant || "light";
  const boxClassName = className || "";

  return (
    <div className={`meal-box meal-box-${boxVariant} ${boxClassName}`}>
      <div className="meal-data-container">
        <h4 className="mb-1">{name}</h4>
        <div className="d-flex">
          <div className="meal-info">
            {data.weight && <div className="meal-weight">{data.weight} g</div>}
            <div className="meal-kcal">{data.kcal?.toFixed(0) || 0} kcal</div>
          </div>
          <Row className="meal-macros text-center d-flex align-items-end align-items-sm-center">
            <Col>
              <span>{data.protein?.toFixed(1) || 0} g</span>
            </Col>
            <Col>
              <span>{data.carb?.toFixed(1) || 0} g</span>
            </Col>
            <Col>
              <span>{data.fat?.toFixed(1) || 0} g</span>
            </Col>
          </Row>
        </div>
      </div>
      <div className="meal-btn">
        {button || null}
      </div>
    </div>
  );
};

export default MealEntry;
