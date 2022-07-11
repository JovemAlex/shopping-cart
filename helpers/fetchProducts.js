const fetchProducts = async (productName) => {
  if (productName === undefined) return new Error('You must provide an url');

  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?q=${productName}`);

  const data = await response.json();
  return data;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
