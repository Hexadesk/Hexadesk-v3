import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./styles/main.scss";
import * as serviceWorker from "./serviceWorker";
import axios from "axios";
// import { InfoProvider } from './context/globalContext';
if (process.env.API) axios.defaults.baseURL = process.env.API;
axios.defaults.baseURL = "Https://hexa-appp.herokuapp.com/api";
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
