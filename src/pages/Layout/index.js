import React from "react";
import { Container } from "react-bootstrap";
import Navbar from "../../components/Navbar";
import SubHeader from "../../components/SubHeader";

const Layout = ({ children }) => {
  return (
    <Container fluid>
      <Navbar />
      <SubHeader />
      <div>{children}</div>
    </Container>
  );
};

export default Layout;
