import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { history, store } from './store-index';
import { Routes } from './routes';
import { ConnectedRouter as Router } from 'react-router-redux';

render(
  <Provider store={ store }>
    <Router history={ history } children={ Routes } />
  </Provider>
  ,
  document.querySelector('#root')
)
