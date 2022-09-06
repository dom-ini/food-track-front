import { Button } from "react-bootstrap";
import { FaFacebookF } from "react-icons/fa";

const FacebookLoginButton = ({ onClick, className }) => {
  return (
    <Button
      onClick={onClick}
      variant="facebook"
      className={`w-100 d-flex align-items-center justify-content-start ${className}`}
    >
      <FaFacebookF className="me-3" />
      <span className="w-100">Zaloguj przez Facebooka</span>
    </Button>
  );
};

export default FacebookLoginButton;
