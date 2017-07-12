import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import reducer from './reducers'
import './public/scss/basic/global.scss';
import App from './components/App';
import LoginForm from './components/login/basic/LoginForm';
import Header from './components/layouts/basic/Header';
import PageNotFound from './components/pages/basic/PageNotFound';
import PageLogout from './components/pages/basic/PageLogout';
import requireAuthentication from './components/routes/PrivateRoute'
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
);

store.subscribe(() => {
    console.log('store.getState():', store.getState())
});

render(
    <Provider store={ store }>
        <Router>
            <div>
                <Header/>
                <Switch>
                    <Route exact path="/" component={App}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/logout" component={PageLogout}/>
                    <Route path="*" component={PageNotFound}/>
                </Switch>
            </div>
        </Router>
    </Provider>,

    document.getElementById('root')
);