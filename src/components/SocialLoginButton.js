import { Button } from "react-bootstrap";

const SocialLoginButton = ({ onClick, className, variant, icon, text }) => {
  return (
    <Button
      onClick={onClick}
      variant={variant}
      className={`w-100 d-flex align-items-center justify-content-start ${className}`}
    >
      {icon}
      <span className="w-100">{text}</span>
    </Button>
  );
};

export default SocialLoginButton;
