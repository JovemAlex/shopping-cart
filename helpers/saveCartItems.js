const saveCartItems = (item) => {
  localStorage.setItem('cart_item', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
