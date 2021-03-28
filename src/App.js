import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import { Login } from "./pages/Login";
import { SignUp } from "./pages/SignUp";
import { Room } from "./pages/Room";
import { AuthProvider } from "./AuthServise";
import { LoggedInRoute } from "./LoggedInRoute";

export const App = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Switch>
          <LoggedInRoute exact path="/" component={Room} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};
