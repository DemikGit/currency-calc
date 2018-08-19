export const fetchCurrencies = () => {
  return (
    fetch(
      'https://api.coinmarketcap.com/v2/listings/',
      { cache: 'no-store' }
    ).then((response) => response.json())
  );
}

export const fetchCurrencyRates = ({from, to}) => {
  const url = `https://api.coinmarketcap.com/v2/ticker/${ from.id }/?convert=${ to.symbol }`
  return (
    fetch(
      url,
      { cache: 'no-store' }
    ).then((response) => response.json())
  );
}
