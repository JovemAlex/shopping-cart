const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');

const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  // coloque seu código aqui
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const showProducts = async () => {
  const data = await fetchProducts('computador');
  const { results } = await data;
  results.forEach(({ id, title, thumbnail }) => {
    const param = { sku: id, name: title, image: thumbnail };
    const addProduct = createProductItemElement(param);
    items.appendChild(addProduct);
  });
};

window.onload = async () => { 
  await showProducts();

  const btn = document.querySelectorAll('.item__add');
  btn.forEach((element) => {
    element.addEventListener('click', (event) => {
      const itemID = getSkuFromProductItem(event.path[1]);
      fetchItem(itemID)
        .then(({ id: sku, title: name, price: salePrice }) => {
          const param = { sku, name, salePrice };
          const addProductCart = createCartItemElement(param);
          cart.appendChild(addProductCart);
        });
    });
  });
};
