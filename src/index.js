import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'

import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import thunk from "redux-thunk";

import { reducer } from './redux/reducers'

const store = createStore(
    reducer,
    {
        location: { latitude: "8.5830", longitude: "72.4933" },
        error: null,
        weather: {},
        searchByPlace: false
    },
    compose(
        applyMiddleware(thunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)