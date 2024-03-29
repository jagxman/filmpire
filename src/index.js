import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import ToggleColorModeProvider  from "./utils/ToggleColorMode";

import store from "./app/store";
import "./index.css";


ReactDOM.render(
  <Provider store={store}>
    <ToggleColorModeProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ToggleColorModeProvider>,
  </Provider>,
  document.getElementById("root")
);
