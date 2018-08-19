import * as React from 'react';
import { Route } from 'react-router';
import { App } from './components/App/App';

export const Routes = (
  <Route path="/">
    <Route path="/" component={ App } />
  </Route>
);
