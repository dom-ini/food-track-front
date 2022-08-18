import { Link } from "react-router-dom";
import { Button, Container, Row, Col, Image } from "react-bootstrap";

import useAuth from "../hooks/useAuth";

import missingImg from "../assets/img/404.png";
import "../styles/Missing404.scss";

const Missing404 = () => {
  const { isLoggedIn } = useAuth();

  return (
    <Container className="mt-5">
      <Row className="missing-wrapper mx-auto text-center">
        <Col>
          <Image src={missingImg} alt="404 - nie znaleziono" className="missing-img"/>
          <p className="mb-4">
            Nie znaleźliśmy strony o podanym adresie :(
          </p>
          {isLoggedIn() ? (
            <Link to="/">
              <Button>Przejdź na stronę główną</Button>
            </Link>
          ) : (
            <Link to="/logowanie">
              <Button>Przejdź na stronę logowania</Button>
            </Link>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default Missing404;
