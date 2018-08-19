import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-simple-promise';
import thunk from 'redux-thunk';
import { rootReducer } from './modules/rootReducer';
import { createBrowserHistory } from 'history';

const enhancers = [];
export const history = createBrowserHistory();

const middleware = [
  routerMiddleware(history),
  promiseMiddleware(),
  thunk,
];

if (process.env.NODE_ENV === 'development') {
  const devToolsExtension = window.__REDUX_DEVTOOLS_EXTENSION__;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers
);

export const store = createStore(
  rootReducer,
  composedEnhancers
);
