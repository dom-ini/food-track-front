import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import { TransitionGroup } from "react-transition-group";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

import "../styles/layouts/LoggedInLayout.scss";

const LoggedInLayout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Container className="content-wrapper">
        <TransitionGroup>
          <CSSTransition
            key={location.pathname}
            classNames="appear-from-left"
            timeout={300}
            exit={false}
          >
            <Outlet />
          </CSSTransition>
        </TransitionGroup>
      </Container>
      <Footer />
    </>
  );
};

export default LoggedInLayout;
