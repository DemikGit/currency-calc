import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import { Convertor } from '../Pages/Convertor/Convertor';
import { Results } from '../Pages/Results/Results';
import { withRouter } from 'react-router';
import { push } from 'react-router-redux';

import { connect } from 'react-redux';

import { loadCurrencies } from './AppActions';
import { getResults } from './AppSelectors';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class AppComponent extends Component {

  componentDidMount = () => {
    this.props.getCurrencies();
  }

  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
        style={{ padding: '64px' }}
      >
        <Grid item xs={8}>
          <Card style={{ minWidth: '480px' }}>
            <CardContent>
              <Typography variant="headline" component="h2">
                Currency Converter
              </Typography>
              <Switch>
                <Route
                  path="/results"
                  results={ this.props.results }
                  component={ Results }
                />
                <Route path="/:query?" component={ Convertor } />
              </Switch>
            </CardContent>
            <CardActions>
              <Switch>
                <Route
                  path="/results"
                  dispatch={this.props.dispatch}
                  render={ (props) => (
                    <Button
                      size="small"
                      onClick={ () => this.props.dispatch(push('/')) }
                    >
                      Back
                    </Button>
                  )}
                />
                <Route
                  path="/:query?"
                  dispatch={this.props.dispatch}
                  render={ (props) => (
                    <Button
                      size="small"
                      onClick={ () => this.props.dispatch(push('/results')) }
                    >
                      Results List
                    </Button>
                  )}
                />
              </Switch>
            </CardActions>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(loadCurrencies()),
  dispatch,
});

const mapStateToProps = (state) => ({
  results: getResults(state),
});

export const App = withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(AppComponent));
