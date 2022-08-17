import { useEffect } from "react";
import { Form, InputGroup } from "react-bootstrap";
import { useFormikContext } from "formik";

import { calculateMacroFromWeight } from "../globals/utils";

const ProductEntryAddFormCalculatedField = ({
  label,
  suffix,
  name,
  value,
  macroIn100,
}) => {
  const { values, setFieldValue } = useFormikContext();

  useEffect(() => {
    setFieldValue(name, calculateMacroFromWeight(values.weight, macroIn100));
  }, [values.weight, macroIn100, name, setFieldValue]);

  return (
    <>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control disabled name={name} value={value} />
        <InputGroup.Text>{suffix}</InputGroup.Text>
      </InputGroup>
    </>
  );
};

export default ProductEntryAddFormCalculatedField;
