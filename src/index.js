// import React from "react";
import ReactDOM from "react-dom";
import { StylesProvider } from "@material-ui/styles";
import { App } from "./App";

ReactDOM.render(
  <StylesProvider injectFirst>
    <App />
  </StylesProvider>,
  document.getElementById("root")
);
