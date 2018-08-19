import { fetchCurrencies } from '../../services/currencyService';

export const LOAD_CURRENCIES = 'LOAD_CURRENCIES';
export const SUBMIT_RESULT = 'SUBMIT_RESULT';

export const loadCurrencies = () => {
  return {
    type: LOAD_CURRENCIES,
    payload: {
      promise: fetchCurrencies(),
    }
  };
};

export const submitResult = (result) => {
  return {
    type: SUBMIT_RESULT,
    payload: {
      result,
    }
  }
}
