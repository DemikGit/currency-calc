import React, { Fragment } from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

export const Loader = (props) => (
  <Fragment>
    <CircularProgress
      style={{
        display: 'block',
        position: 'relative',
        margin: 'auto',
      }}
      size={ 35 }
      thickness={ 5 }
    />
  </Fragment>
);
