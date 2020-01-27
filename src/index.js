import React from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import * as serviceWorker from './serviceWorker';
import store from './store';

import Home from './components/Home';
import Login from './components/Login';

import './index.css';
import App from './App';

import { hashHistory} from 'react-router-dom '

import {Router, Route} from 'react-router'

ReactDOM.render((
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route exact path="/" component={App} />
        <Route exact path="/" component={Home} />
        <Route path="login" component={Login} />      
      </Router>
  </Provider>
  ), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();


