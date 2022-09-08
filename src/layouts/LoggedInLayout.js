import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

import Header from "../layouts/Header";
import Footer from "../layouts/Footer";

import "../styles/layouts/LoggedInLayout.scss";

const LoggedInLayout = () => {
  return (
    <>
      <Header />
      <Container className="content-wrapper">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};

export default LoggedInLayout;
