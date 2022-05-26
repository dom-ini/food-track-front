import { Form, InputGroup } from "react-bootstrap";

const ProductFormField = ({
  type,
  name,
  label,
  placeholder,
  suffix,
  value,
  disabled,
  onChange,
  onBlur,
  isInvalid,
  errors,
}) => {
  const controlId = `form${name.charAt(0).toUpperCase() + name.slice(1)}`;

  return (
    <Form.Group controlId={controlId} className="mb-2">
      <Form.Label>{label}</Form.Label>
      <InputGroup>
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
        {suffix && <InputGroup.Text>{suffix}</InputGroup.Text>}
        <Form.Control.Feedback type="invalid">{errors}</Form.Control.Feedback>
      </InputGroup>
    </Form.Group>
  );
};

export default ProductFormField;
