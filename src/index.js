import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from 'react-router-dom';
import "./styles.css";


var mountNode = document.getElementById("app");
ReactDOM.render(
    <App/>
    , mountNode);