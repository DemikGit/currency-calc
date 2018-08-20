import { fetchCurrencyRates } from '../../../services/currencyService';

export const FETCH_CURRENCY_RATES = 'FETCH_CURRENCY_RATES';
export const SET_CONVERSION_RESULT = 'SET_CONVERSION_RESULT';
export const SET_CONVERSION_DIRECTION = 'SET_CONVERSION_DIRECTION';
export const SET_INITIAL_LOADING_STATE = 'SET_INITIAL_LOADING_STATE';

export const currencyRates = (from, to) => {
  return {
    type: FETCH_CURRENCY_RATES,
    payload: {
      promise: fetchCurrencyRates({ from, to }),
      from,
      to
    }
  };
};

export const setConversionResult = (result) => {
  return {
    type: SET_CONVERSION_RESULT,
    payload: {
      result
    }
  };
};

export const setConversionDirection = (direction) => {
  return {
    type: SET_CONVERSION_DIRECTION,
    payload: {
      direction
    }
  };
};

export const setInitialLoadingState = () => {
  return {
    type: SET_INITIAL_LOADING_STATE,
  }
}
