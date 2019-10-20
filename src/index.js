import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "mobx-react";
import counterStore from "./store";
import App from "./App";

ReactDOM.render(
  <Provider counter={counterStore}>
    <App />
  </Provider>,
  document.querySelector("#root")
);
