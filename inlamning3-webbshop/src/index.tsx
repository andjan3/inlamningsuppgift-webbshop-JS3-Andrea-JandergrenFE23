import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Webbshop from "./Webbshop";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./redux/store";
import { Provider } from "react-redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Webbshop />
    </Provider>
  </React.StrictMode>
);
