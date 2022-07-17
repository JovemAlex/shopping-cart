const saveCartItems = (item) => {
  localStorage.setItem('itemCart', item);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
