const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  // implemente seus testes aqui
  it ('testa se é uma função', () => {
    expect(typeof getSavedCartItems).toEqual('function');
  });
  it ('Testa se, ao executar getSavedCartItems, o método localStorage.getItem é chamado', () => {
    getSavedCartItems();
    expect(localStorage.getItem).toHaveBeenCalled();
  });
  it ('Teste se, ao executar getSavedCartItems, o método localStorage.getItem é chamado com o "cartItems" como parâmetro.', () => {
    getSavedCartItems()
    expect(localStorage.getItem).toHaveBeenCalled();
  })
  // fail('Teste vazio');
});
