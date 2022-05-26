import { Form, InputGroup } from "react-bootstrap";
import { useFormikContext } from "formik";
import { useEffect } from "react";

import { calculateAbsoluteMacro } from "../globals/utils";

const GoalCalculatedField = ({ label, name, basedOn, value, multiplier }) => {
  const {
    values,
    setFieldValue,
  } = useFormikContext();

  const basedOnValue = values[basedOn];

  useEffect(() => {
    setFieldValue(name, calculateAbsoluteMacro(values.daily_kcal_goal, basedOnValue, multiplier));
  }, [values.daily_kcal_goal, basedOnValue, multiplier, name, setFieldValue]);

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control disabled name={name} value={value} />
        <InputGroup.Text>g</InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default GoalCalculatedField;
