import { Form, InputGroup } from "react-bootstrap";

import ConditionalWrapper from "./ConditionalWrapper";

const FormField = ({
  type,
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
  className,
  customInput
}) => {
  const controlId = `form${name.charAt(0).toUpperCase() + name.slice(1)}`;

  return (
    <>
      <Form.Group controlId={controlId} className={className}>
        {label && <Form.Label>{label}</Form.Label>}
        <ConditionalWrapper
          condition={suffix}
          wrapper={(children) => <InputGroup>{children}</InputGroup>}
        >
          {customInput || (
            <Form.Control
              type={type}
              name={name}
              placeholder={placeholder}
              value={value}
              disabled={disabled}
              onChange={onChange}
              onBlur={onBlur}
              isInvalid={isInvalid}
            />
          )}
          {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
          <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
        </ConditionalWrapper>
      </Form.Group>
    </>
  );
};

export default FormField;
