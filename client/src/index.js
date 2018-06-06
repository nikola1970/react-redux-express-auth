import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import decode from "jwt-decode";

import { BrowserRouter } from "react-router-dom";
import { store } from "./store";
import { login_success } from "./actions/auth";

import './index.css';
import 'semantic-ui-css/semantic.min.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const token = localStorage.getItem("token");
if (token) {
    let decodedToken; 
    try {
        decodedToken = decode(token);
        store.dispatch(login_success(decodedToken.username));
    } catch(e) {}
}


ReactDOM.render(
    <BrowserRouter>
        <Provider store={store}>
            <App />
        </Provider>
    </BrowserRouter>
    , document.getElementById('root')
);

registerServiceWorker();
