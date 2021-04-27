import * as React from "react";
import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

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
        <GlobalStyle />
        <Switch>
          <LoggedInRoute exact path="/" component={Room} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
        </Switch>
      </BrowserRouter>
    </AuthProvider>
  );
};

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Montserrat&display=swap');
@import url('https://fonts.googleapis.com/css2?family='Montserrat', sans-serif&display=swap');
${reset}
*, *:before, *:after {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
html{
  font-size: 62.5%;
}
`;
