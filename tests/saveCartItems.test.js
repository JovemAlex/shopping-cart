const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('3 - Teste a função saveCartItems', () => {
  // implemente seus testes aqui
  it('testa se é uma func', () => {
    expect(typeof saveCartItems).toEqual('function');
  });
  it ('Teste se, ao executar saveCartItems com o argumento <ol><li>Item</li></ol>, o método localStorage.setItem é chamado', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalled();
  });
  it('testa se ao execuar o "saveCartItems" com o argumento "<ol><li>Item</li></ol>" o método localStorage.setItem é chamado com dois parâmetros, sendo o primeiro "cartItem" e o segundo sendo o valor passado como argumento para a função', () => {
    saveCartItems('<ol><li>Item</li></ol>');
    expect(localStorage.setItem).toHaveBeenCalledWith('cart_item', '<ol><li>Item</li></ol>');
  });
  // fail('Teste vazio');
});
