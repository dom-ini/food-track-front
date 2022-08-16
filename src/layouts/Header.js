import { useEffect, useState } from "react";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPowerOff, FaWrench, FaBullseye, FaPlus } from "react-icons/fa";

import useWindowSize from "../hooks/useWindowSize";
import useAuth from "../hooks/useAuth";
import Logo from "../components/Logo";
import "../styles/Header.scss";

const Header = () => {
  const [show, setShow] = useState(false);
  const { logout } = useAuth();
  const { isScreenLarge } = useWindowSize();

  useEffect(() => {
    setShow(!isScreenLarge);
  }, [isScreenLarge]);

  return (
    <Navbar expand="lg" bg="white" className="shadow-sm">
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <Logo className="navbar-logo" />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav" className="justify-content-end">
          <Nav>
            <NavDropdown
              title="Moje konto"
              show={show}
              onClick={() => setShow((prev) => !prev)}
              align="end"
            >
              <NavDropdown.Item as={Link} to="/konto">
                <FaWrench className="d-none d-lg-block" />
                <span className="ms-2">Ustawienia konta</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/cele">
                <FaBullseye className="d-none d-lg-block" />
                <span className="ms-2">Ustaw cele</span>
              </NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/dodaj-produkt">
                <FaPlus className="d-none d-lg-block" />
                <span className="ms-2">Dodaj produkt</span>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={() => logout()}>
                <FaPowerOff className="d-none d-lg-block" />
                <span className="ms-2">Wyloguj się</span>
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
