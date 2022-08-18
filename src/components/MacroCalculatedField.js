import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useFormikContext } from "formik";

import { calculateMacro } from "../globals/utils";

const MacroCalculatedField = ({
  label,
  name,
  suffix,
  inputValue,
  baseValue,
  percentage,
  multiplier,
}) => {
  const { setFieldValue } = useFormikContext();
  multiplier = multiplier || 1;

  useEffect(() => {
    setFieldValue(
      name,
      calculateMacro(baseValue, percentage, multiplier).toFixed(1)
    );
  }, [baseValue, percentage, multiplier, name, setFieldValue]);

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control disabled name={name} value={inputValue} />
        <InputGroup.Text>{suffix}</InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default MacroCalculatedField;
