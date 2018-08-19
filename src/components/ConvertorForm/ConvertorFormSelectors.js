import * as get from 'lodash.get';

export const getActiveInput = (state) => get(state, ['form', 'convertor', 'active'], null);

export const getFirstCurrencyId = (state) => get(
  state,
  ['form', 'convertor', 'values', 'firstCurrencyType', 'value'],
  null
);

export const getSecondCurrencyId = (state) => get(
  state,
  ['form', 'convertor', 'values', 'secondCurrencyType', 'value'],
  null
);

export const getFormErrors = (state) => get(
  state,
  ['form', 'convertor', 'syncErrors'],
  null
);

export const getFormValues = (state) => get(
  state,
  ['form', 'convertor', 'values'],
  null
);

