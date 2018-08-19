import React, { Fragment, Component } from 'react';
import { push } from 'react-router-redux';
import { connect } from 'react-redux';
import * as get from 'lodash.get';
import * as isEqual from 'lodash.isequal';
import { BigNumber } from 'bignumber.js';
import { change } from 'redux-form';
import { ConvertorForm } from '../../ConvertorForm/ConvertorForm';

import { submitResult } from '../../App/AppActions';

import { Result } from '../Results/Results';

import {
  getActiveInput,
  getFormValues,
} from '../../ConvertorForm/ConvertorFormSelectors';

import {
  currencyRates,
  setConversionResult,
} from './ConvertorActions';

import {
  getCurrencyOptions,
  getCurrencyById,
  getLoadingState as getCurrenciesLoadingState,
} from '../../App/AppSelectors';

import {
  getLoadingState,
  getRate,
  getResult,
} from './ConvertorSelectors';

import Divider from '@material-ui/core/Divider';

class ConvertorComponent extends Component {

  formOnChange = () => {
    const {
      rateLoadingState,
      currencyById,
      activeInput,
      getCurrencyRates,
      formValues,
    } = this.props;

    const firstCurrencyId = get(
      formValues,
      [ 'firstCurrencyType'],
      null
    );

    const secondCurrencyId = get(
      formValues,
      [ 'secondCurrencyType'],
      null
    );

    const isFirstCurrencyChanged = ['firstCurrencyType', 'firstCurrency'].includes(activeInput);

    const convertedValueExist = isFirstCurrencyChanged ?
      get(formValues, ['firstCurrency'], false)
      :
      get(formValues, ['secondCurrency'], false)
    ;

    const isAboveCurrenciesTypeExists = firstCurrencyId && secondCurrencyId;

    if (isAboveCurrenciesTypeExists && convertedValueExist) {
      if ( isFirstCurrencyChanged && !rateLoadingState.isLoading) {
        getCurrencyRates(
          currencyById(firstCurrencyId),
          currencyById(secondCurrencyId)
        );
        this.props.dispatch(
          push(
            `/?from=${
              currencyById(firstCurrencyId).name
            }&to=${
              currencyById(secondCurrencyId).name
            }`
          )
        )
      } else {
        getCurrencyRates(
          currencyById(secondCurrencyId),
          currencyById(firstCurrencyId)
        );
        this.props.dispatch(
          push(
            `/?from=${
              currencyById(secondCurrencyId).name
            }&to=${
              currencyById(firstCurrencyId).name
            }`
          )
        )
      }
    }
  }

  formSubmit = () => {
    const { result, addResult } = this.props;
    addResult(result());
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      rateLoadingState,
      currencyById,
      activeInput,
      formValues,
      rate,
      changeFormFieldValue,
      setResult,
    } = this.props;

    const { rateLoadingState: prevRateLoadingState } = prevProps;

    if (prevRateLoadingState.isLoading && !rateLoadingState.isLoading && rateLoadingState.success) {

      const firstCurrencyId = get(
        formValues,
        [ 'firstCurrencyType'],
        null
      );

      const secondCurrencyId = get(
        formValues,
        [ 'secondCurrencyType'],
        null
      );

      const isAboveCurrenciesTypeExists = firstCurrencyId && secondCurrencyId;
      const isFirstCurrencyChanged = ['firstCurrencyType', 'firstCurrency'].includes(activeInput);
      const secondCurrency = currencyById(secondCurrencyId);
      const firstCurrency = currencyById(firstCurrencyId);

      let convertedValueExist = isFirstCurrencyChanged ?
        Boolean(formValues['firstCurrency'])
        :
        Boolean(formValues['secondCurrency'])
      ;

      const result = {
        from: {
          symbol: '',
          value: ''
        },
        to: {
          symbol: '',
          value: ''
        }
      };

      let currencyRate = null;
      let currencyValue = null;
      let changedField = '';

      if ( isAboveCurrenciesTypeExists && convertedValueExist) {
        if ( isFirstCurrencyChanged ) {
          currencyRate = String(rate().quotes[secondCurrency.symbol].price);
          currencyValue = String(get(formValues, ['firstCurrency'], null));
          changedField = 'secondCurrency';
          result.from.symbol = firstCurrency.symbol;
          result.from.value = currencyValue;
          result.to.symbol = secondCurrency.symbol;
        } else {
          currencyRate = String(rate().quotes[firstCurrency.symbol].price);
          currencyValue = String(get(formValues, ['secondCurrency'], null));
          changedField = 'firstCurrency';
          result.from.symbol = secondCurrency.symbol;
          result.from.value = currencyValue;
          result.to.symbol = firstCurrency.symbol;
        }

        const currencyRateNumber = new BigNumber(currencyRate);
        const currencyValueNumber = new BigNumber(currencyValue);
        result.to.value = String(currencyValueNumber.multipliedBy(currencyRateNumber));
        changeFormFieldValue('convertor', changedField, result.to.value);
        setResult(result);
      }
    }
  }

  render() {
    const {
      result,
      rateLoadingState,
      currenciesLoadingState,
      activeInput,
    } = this.props;
    const isFirstCurrencyChanged = ['firstCurrencyType', 'firstCurrency'].includes(activeInput);
    return (
      <Fragment>
        <ConvertorForm
          currencyOptions={ this.props.currencyOptions }
          onChange={ this.formOnChange }
          rateLoadingState={ rateLoadingState }
          currenciesLoadingState={ currenciesLoadingState }
          onSubmit={ this.formSubmit }
          isFirstCurrencyChanged={isFirstCurrencyChanged}
        />
        { !isEqual(result(), {}) && <Divider style={{ marginTop: '16px' }} /> }
        { !isEqual(result(), {}) && Result(result()) }
      </Fragment>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  getCurrencyRates: (from, to) => dispatch(currencyRates(from, to)),
  changeFormFieldValue: (form, field, value) => dispatch(change(form, field,value)),
  addResult: (result) => dispatch(submitResult(result)),
  setResult: (result) => dispatch(setConversionResult(result)),
  dispatch
});

const mapStateToProps = (state) => ({
  currencyOptions: getCurrencyOptions(state),
  activeInput: getActiveInput(state),
  currencyById: (id) => getCurrencyById(state, id),
  formValues: getFormValues(state),
  rateLoadingState: getLoadingState(state),
  currenciesLoadingState: getCurrenciesLoadingState(state),
  rate: () => getRate(state),
  result: () => getResult(state),
});

export const Convertor = connect(
  mapStateToProps,
  mapDispatchToProps
)(ConvertorComponent)
