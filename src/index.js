import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import {BrowserRouter} from 'react-router-dom';
import {Provider} from "react-redux";
import {store,persistor} from '../src/redux/store'
import "./styles.css";


var mountNode = document.getElementById("app");
ReactDOM.render(
    <React.StrictMode>
    <Provider store={store}>
    <App/>
    </Provider>
    </React.StrictMode>
    , mountNode);