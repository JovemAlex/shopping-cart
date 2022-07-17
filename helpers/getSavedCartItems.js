const getSavedCartItems = () => {
  localStorage.getItem('cart_item');
};

if (typeof module !== 'undefined') {
  module.exports = getSavedCartItems;
}
