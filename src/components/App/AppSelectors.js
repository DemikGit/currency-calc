export const getCurrencyOptions = (state) => {
  const currencies = state.app.currencies;
  const currencyOptions = currencies.map(currency =>{
    const formatedCurrency = {};
    formatedCurrency['value'] = currency.id;
    formatedCurrency['label'] = currency.name;
    return formatedCurrency;
  });
  return currencyOptions;
}

export const getCurrencyById = (state, id) => {
  const currencies = state.app.currencies;
  return currencies.find((currency) => {
    return currency.id === Number(id);
  });
}

export const getLoadingState = (state) => state.app.loading;

export const getResults = (state) => state.app.results;
