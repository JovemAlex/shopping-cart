const getSavedCartItems = (item) => {
  localStorage.getItem('cart_item', item);
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
