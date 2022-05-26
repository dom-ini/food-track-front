import { Container } from "react-bootstrap";
import { Outlet, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import Footer from "./Footer";
import Header from "./Header";
import "../styles/LoggedInLayout.scss";

const LoggedInLayout = () => {
  const location = useLocation();

  return (
    <>
      <Header />
      <Container className="content-wrapper">
        <TransitionGroup>
          <CSSTransition
            key={location.pathname.split("/")[1] || "/"}
            timeout={300}
            classNames="slider"
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
