import { Row, Col, Container } from "react-bootstrap";
import { Outlet, Link } from "react-router-dom";

import Logo from "../components/Logo";

import "../styles/layouts/NotLoggedInLayout.scss";

const NotLoggedInLayout = () => {
  return (
    <Container className="pt-5">
      <Row className="box-wrapper mx-auto">
        <Col xs={12} className="dynamic-content">
          <Link to="/logowanie">
            <Logo height="100" width="212" className="d-block mx-auto mb-3" />
          </Link>
          <Outlet />
        </Col>
      </Row>
    </Container>
  );
};

export default NotLoggedInLayout;
