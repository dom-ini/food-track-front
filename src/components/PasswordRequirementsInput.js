import { OverlayTrigger, Popover, Form } from "react-bootstrap";
import { FaTimes, FaCheck } from "react-icons/fa";

import REGEX from "../globals/regex";

const REQUIREMENTS_MESSAGES = [
  {
    REGEX: new RegExp(REGEX.PASSWORD.LENGTH),
    MESSAGE: "od 8 do 32 znaków",
  },
  {
    REGEX: new RegExp(REGEX.PASSWORD.LOWERCASE),
    MESSAGE: "co najmniej 1 małą literę",
  },
  {
    REGEX: new RegExp(REGEX.PASSWORD.UPPERCASE),
    MESSAGE: "co najmniej 1 wielką literę",
  },
  {
    REGEX: new RegExp(REGEX.PASSWORD.NUMBER),
    MESSAGE: "co najmniej 1 cyfrę",
  },
  {
    REGEX: new RegExp(REGEX.PASSWORD.SPECIAL_CHAR),
    MESSAGE: "co najmniej 1 znak specjalny",
  },
];

const PasswordRequirementsInput = ({
  name,
  placeholder,
  value,
  disabled,
  onChange,
  onBlur,
  isInvalid,
}) => {
  return (
    <OverlayTrigger
      trigger="focus"
      placement="top-end"
      overlay={
        <Popover>
          <Popover.Body>
            <strong>Hasło musi zawierać:</strong>
            {REQUIREMENTS_MESSAGES.map((req, i) => (
              <div key={i}>
                {req.REGEX.test(value) ? (
                  <FaCheck style={{ color: "green" }} />
                ) : (
                  <FaTimes style={{ color: "red" }} />
                )}
                <span className="ms-1">{req.MESSAGE}</span>
              </div>
            ))}
          </Popover.Body>
        </Popover>
      }
    >
      <Form.Control
        type="password"
        name={name}
        placeholder={placeholder}
        autoComplete="off"
        value={value}
        disabled={disabled}
        onChange={onChange}
        onBlur={onBlur}
        isInvalid={isInvalid}
      />
    </OverlayTrigger>
  );
};

export default PasswordRequirementsInput;
