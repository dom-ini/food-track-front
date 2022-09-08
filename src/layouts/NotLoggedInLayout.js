import { Row, Col, Container } from "react-bootstrap";
import { Outlet, Link, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Logo from "../components/Logo";

import "../styles/layouts/NotLoggedInLayout.scss";

const NotLoggedInLayout = () => {
  const location = useLocation();

  return (
    <Container className="pt-5">
      <Row className="box-wrapper mx-auto">
        <Col xs={12} className="dynamic-content">
          <Link to="/logowanie">
            <Logo height="100" width="212" className="d-block mx-auto mb-3" />
          </Link>
          <TransitionGroup>
            <CSSTransition
              key={location.pathname.split("/")[1] || "/"}
              timeout={300}
              classNames="slider"
            >
              <Outlet />
            </CSSTransition>
          </TransitionGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default NotLoggedInLayout;
