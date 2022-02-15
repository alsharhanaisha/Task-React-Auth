import React from "react";
import { Button } from "react-bootstrap";
import authStore from "../stores/AuthStore";

function SignoutButton() {
  return (
    <Button variant="outline-light mx-3" onClick={authStore.signOut}>
      Signout
    </Button>
  );
}

export default SignoutButton;
