import { promiseMiddleware } from './middleware';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import common from './reducers/common';
import auth from './reducers/auth';
import home from './reducers/home';

const reducer = combineReducers({
  auth,
  common,
  home
})

const middleware = applyMiddleware(promiseMiddleware)

const store = createStore(reducer, middleware);

export default store;