import { promiseMiddleware, localStorageMiddleware } from './middleware';
import { applyMiddleware, createStore, combineReducers } from 'redux';
import common from './reducers/common';
import article from './reducers/article';
import articleList from './reducers/articleList';
import auth from './reducers/auth';
import home from './reducers/home';
import profile from './reducers/profile';
import settings from './reducers/settings';
import editor from './reducers/editor';


const reducer = combineReducers({
  article,
  articleList,
  auth,
  common,
  home,
  profile,
  settings,
  editor
})

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware)

const store = createStore(reducer, middleware);

export default store;