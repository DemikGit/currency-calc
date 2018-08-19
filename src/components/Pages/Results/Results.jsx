import React, { Component, Fragment } from 'react';
import { getResults } from '../../App/AppSelectors';
import { connect } from 'react-redux';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';

export const Result = (result, index) => (
  <ListItem key={ index }>
    <ListItemText
      primary={
        `${result.from.symbol} ${result.from.value} === ${result.to.symbol} ${result.to.value}`
      }
    />
  </ListItem>
);

class ResultsComponent extends Component {
  render() {
    return (
      <Fragment>
        <List subheader={ <li />}>
          <ListSubheader> Saved Results List</ListSubheader>
          {
            this.props.results.map((result, index) => Result(result, index))
          }
        </List>
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({

});

const mapStateToProps = (state) => ({
  results: getResults(state),
});

export const Results = connect(
  mapStateToProps,
  mapDispatchToProps
)(ResultsComponent)

