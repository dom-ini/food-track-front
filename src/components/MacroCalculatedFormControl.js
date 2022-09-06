import { useEffect } from "react";
import { Form } from "react-bootstrap";
import { useFormikContext } from "formik";

import { calculateMacro } from "../utils/utils";

const MacroCalculatedFormControl = ({
  name,
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

  return <Form.Control disabled name={name} value={inputValue} />;
};

export default MacroCalculatedFormControl;
