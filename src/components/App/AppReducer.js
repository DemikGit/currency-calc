import { resolve, reject } from 'redux-simple-promise';
import { LOAD_CURRENCIES, SUBMIT_RESULT } from './AppActions';

const initialState = {
  currencies: [],
  results: [],
  loading: {
    isLoading: false,
    success: false,
  }
};

export const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOAD_CURRENCIES:
      return { ...state, loading: { isLoading: true, success: false } };
    case resolve(LOAD_CURRENCIES):
      return { ...state, currencies: action.payload.data, loading: { isLoading: false, success: true } };
    case reject(LOAD_CURRENCIES):
      return { ...state, currencies: [], loading: { isLoading: false, success: false } };
    case SUBMIT_RESULT:
      return { ...state, results: [ ...state.results, action.payload.result ] };
    default:
      return state
  }
}

