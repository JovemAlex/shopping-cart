require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // implemente seus testes aqui
  it ('testa se "fetchItem" é uma função', () => {
    expect(typeof fetchItem).toEqual('function');
  });

  it ('testa se o fetch é chamado', async () => {
    expect.assertions(1);
    const callFunction = await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it ('testa se o fetch retorna o endpoint', async () => {
    expect.assertions(1);
    const endpoint = 'https://api.mercadolibre.com/items/MLB1615760527';

    await fetchItem('MLB1615760527');

    expect(fetch).toHaveBeenCalledWith(endpoint);
  });

  it ('testa se ao chamar com o param "MLB1615760527" retorna igual ao item', async () => {
    expect.assertions(1);
    const func = await fetchItem('MLB1615760527');
    expect(func).toMatchObject(item);
  });

  it ('testa se chama o erro', async () => {
    const callFunction = await fetchItem();
    expect(callFunction).toEqual(new Error('You must provide an url'));
  });
  // fail('Teste vazio');
});
