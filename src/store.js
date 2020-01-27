import { promiseMiddleware } from './middleware';
import { applyMiddleware, createStore } from 'redux';

const defaultState = {
  appName:'conduit',
  articles: null
};

const reducer = function (state = defaultState, action) {
  switch (action.type) {
    case 'HOME_PAGE_LOADED':
      return {...state, articles:action.payload.articles}
    default:
      break;
  }
  return state;
}


const store = createStore(reducer, applyMiddleware(promiseMiddleware));

export default store;