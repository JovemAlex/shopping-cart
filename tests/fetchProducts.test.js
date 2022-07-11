require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // implemente seus testes aqui
  it ('testa se "fetchProducts" é uma função', () => {
    expect.assertions(1);
    expect(typeof fetchProducts).toEqual('function');
  });

  it ('testa se o fetch é chamado', async () => {
    expect.assertions(1);
    const callFunction = await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  })

  it ('testa se o fetch retorna o endpoint', async () => {
    expect.assertions(1);
    const endpoint = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';

    await fetchProducts('computador');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it ('testa se ao chamar com o param computador retorna igual ao computadorSearch', async () => {
    expect.assertions(1);
    const func = await fetchProducts('computador');
    expect(func).toMatchObject(computadorSearch);
  });

  it ('testa se chama o erro', async () => {
    const callFunction = await fetchProducts();
    expect(callFunction).toEqual(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
