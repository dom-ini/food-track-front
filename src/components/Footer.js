import { Container } from "react-bootstrap";
import { FaCopyright } from "react-icons/fa";

import "../styles/Footer.scss";

const Footer = () => {
  return (
    <footer className="pt-2">
      <Container>
        <div className="d-flex align-items-center">
          <FaCopyright />
          <span className="ms-1">{new Date().getFullYear()} Food Track</span>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
