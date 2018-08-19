import React, { Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Calculator } from '../Pages/Calculator/Calculator';
import { Results } from '../Pages/Results/Results';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

export const App = () => {
  return (
    <Fragment>
      <Route exact path="/" component={ Calculator } />
      <Route path="/results" component={ Results } />
      <Fragment>
        <ul>
          <li>
            <Link to="/">Calculator</Link>
          </li>
          <li>
            <Link to="/results">Results</Link>
          </li>
        </ul>
      </Fragment>
    </Fragment>
  );
}
