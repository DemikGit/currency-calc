import { FETCH_CURRENCY_RATES, SET_CONVERSION_RESULT } from './ConvertorActions';
import { resolve, reject } from 'redux-simple-promise';

const initialState = {
  rate: {},
  result: {},
  loading: {
    isLoading: false,
    success: false,
  }
};

export const convertorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENCY_RATES:
      return { ...state, loading: { isLoading: true, success: false } }
    case resolve(FETCH_CURRENCY_RATES):
      return { ...state, rate: action.payload.data, loading: { isLoading: false, success: true } }
    case reject(FETCH_CURRENCY_RATES):
      return { ...state, rate: {}, loading: { isLoading: false, success: false } }
    case SET_CONVERSION_RESULT:
      return { ...state, result: action.payload.result }
    default:
      return state
  }
}

