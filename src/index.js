import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { loadLocalStorage, saveStateToLocalStorage } from './storages/localStorage';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import PrivateRoute from './components/routes/PrivateRoute';

import reducer from './reducers'
import './public/scss/basic/global.scss';
import App from './components/App';
import LoginForm from './components/login/basic/LoginForm';
import Header from './components/layouts/basic/Header';
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
    console.log('store.getState():',store.getState())
});

render(
    <Provider store={ store }>
        <Router>
            <div>
                <Header/>
                <PrivateRoute path="/" component={App} authed/>
                <Route path="/login" component={LoginForm}/>
            </div>
        </Router>
    </Provider>,

    document.getElementById('root')
);