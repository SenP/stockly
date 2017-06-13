import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/app/App";
import registerServiceWorker from "./registerServiceWorker";
import configureStore from "./store";

const Store = configureStore();

ReactDOM.render(
  <Provider store={Store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
