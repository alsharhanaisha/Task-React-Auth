import { observer } from "mobx-react-lite";
import React from "react";
import { Container, Navbar, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import authStore from "../stores/AuthStore";
import SigninModal from "./SigninModal";
import SignoutButton from "./SignoutButton";
import SignupModal from "./SignupModal";

function NavBar() {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Link to="/products">
          <Navbar.Brand>Chicken Shop</Navbar.Brand>
        </Link>
        <Nav>
          {authStore.user ? (
            <>
              <p style={{ color: "white" }}>
                {`Hello ${authStore.user.username}`}
              </p>
              <SignoutButton />
            </>
          ) : (
            <>
              <SignupModal /> <SigninModal />
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default observer(NavBar);
