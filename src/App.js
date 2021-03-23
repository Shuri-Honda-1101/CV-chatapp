import React from "react";

import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Room } from "./pages/Room";

export const App = () => {
  return (
    <>
      <Login />
      <SignUp />
      <Room />
    </>
  );
};
