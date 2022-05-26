import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaPowerOff, FaWrench, FaBullseye, FaPlus } from "react-icons/fa";

import useAuth from "../hooks/useAuth";
import Logo from "./Logo";
import "../styles/Header.scss";

const Header = () => {
  const { logout } = useAuth();

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
            <NavDropdown title="Moje konto">
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
