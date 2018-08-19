import { fetchCurrencyRates } from '../../../services/currencyService';

export const FETCH_CURRENCY_RATES = 'FETCH_CURRENCY_RATES';
export const SET_CONVERSION_RESULT = 'SET_CONVERSION_RESULT';

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
