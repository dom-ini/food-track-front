import { Form, InputGroup } from "react-bootstrap";

const GoalFormField = ({
  label,
  suffix,
  name,
  placeholder,
  value,
  disabled,
  onChange,
  onBlur,
  isInvalid,
  errors,
}) => {
  return (
    <>
      <Form.Label>{label}</Form.Label>
      <InputGroup>
        <Form.Control
          type="number"
          min="0"
          name={name}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={onChange}
          onBlur={onBlur}
          isInvalid={isInvalid}
        />
        <InputGroup.Text>{suffix}</InputGroup.Text>
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </InputGroup>
    </>
  );
};

export default GoalFormField;
