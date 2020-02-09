import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux";
import {loadState, saveState} from "./localStorage";
import {createStore, applyMiddleware} from "redux";
import throttle from "lodash/throttle"
import {rootReducer} from "./store/rootReducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly";

const persistedState = loadState();

const store = createStore(
    rootReducer,
    persistedState,
    composeWithDevTools(
        applyMiddleware(thunk),
        // other store enhancers if any
    )
);

store.subscribe(throttle(() => {
    saveState({
        registration: store.getState().registration,
        categories: store.getState().categories,
        shared: store.getState().shared,
    });
}, 1000));

const app = (
    <Provider store={store}>
        <App/>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));
