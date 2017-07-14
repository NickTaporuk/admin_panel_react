import React, { Component } from 'react';
import { render } from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import logger from 'redux-logger'

import reducer from './reducers'
import './public/scss/basic/global.scss';
// import App from './components/App';
import LoginForm from './components/login/basic/LoginForm';
import Dashboard from './components/layouts/basic/Dashboard';
import PageNotFound from './components/pages/basic/PageNotFound';
import PageLogout from './components/pages/basic/PageLogout';
import PageIndex from './components/pages/basic/PageIndex';
import PageUsers from './components/pages/basic/PageUsers';

import './public/scss/AdminLTE.css'
import './public/scss/font-awesome.css'
import './public/scss/skins/_all-skins.css'
import './public/scss/basic/global.scss'
const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk, logger))
);

render(
    <Provider store={ store }>
        <Router>
            <div className="wrapper">
                <Switch>
                    <Route exact path="/" component={Dashboard(PageIndex)}/>
                    <Route path="/users" component={Dashboard(PageUsers)}/>
                    <Route path="/login" component={LoginForm}/>
                    <Route path="/logout" component={PageLogout}/>
                    <Route path="*" component={PageNotFound}/>
                </Switch>
            </div>
        </Router>
    </Provider>,

    document.getElementById('root')
);