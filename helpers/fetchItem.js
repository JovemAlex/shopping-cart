const fetchItem = async (product) => {
  if (product === undefined) return new Error('You must provide an url');

  const response = await fetch(`https://api.mercadolibre.com/items/${product}`);
  
  const data = response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchItem,
  };
}
