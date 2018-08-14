import React, { Fragment } from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { history, store } from './store-index';
import { App } from './components/App/App';

const target = document.querySelector('#root')

render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Fragment>
        <App />
      </Fragment>
    </ConnectedRouter>
  </Provider>,
  target
)
