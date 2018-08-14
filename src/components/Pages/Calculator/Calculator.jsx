import React from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

const CalculatorFunction = (props) => {
  return (
    <div>
      <h1>Home</h1>
      <p>Welcome home!</p>
      <button onClick={() => props.changePage('/results')}>
        Go to about page via redux
      </button>
    </div>
  );
};

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (path) => push(path),
}, dispatch);

export const Calculator = connect(
  null,
  mapDispatchToProps
)(CalculatorFunction)
