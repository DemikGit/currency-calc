import {
  FETCH_CURRENCY_RATES,
  SET_CONVERSION_RESULT,
  SET_CONVERSION_DIRECTION,
  SET_INITIAL_LOADING_STATE
} from './ConvertorActions';
import { resolve, reject } from 'redux-simple-promise';

const initialState = {
  rate: {},
  result: {},
  loading: {
    isLoading: false,
    success: false,
  },
  direction: '',
};

export const convertorReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CURRENCY_RATES:
      return { ...state, loading: { isLoading: true, success: false } };
    case resolve(FETCH_CURRENCY_RATES):
      return { ...state, rate: action.payload.data, loading: { isLoading: false, success: true } };
    case reject(FETCH_CURRENCY_RATES):
      return { ...state, rate: {}, loading: { isLoading: false, success: false } };
    case SET_CONVERSION_RESULT:
      return { ...state, result: action.payload.result };
    case SET_CONVERSION_DIRECTION:
      return { ...state, direction: action.payload.direction };
    case SET_INITIAL_LOADING_STATE:
      return { ...state, loading: initialState.loading };
    default:
      return state
  }
}

