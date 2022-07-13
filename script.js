const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const itemCart = document.querySelectorAll('.cart__items');
const emptyBtn = document.querySelector('.empty-cart');

function loading() {
  const p = document.createElement('p');
  p.className = 'loading';
  p.innerText = 'carregando...';
  items.appendChild(p);
}

function removeload() {
  const load = document.querySelector('.loading');
  items.removeChild(load);
}

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

function cartItemClickListener() {
  itemCart.forEach((element) => {
    element.addEventListener('click', ({ target }) => {
      target.remove();
    });
  });
}

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const showProducts = async () => {
  loading();
  const data = await fetchProducts('computador');
  removeload();
  const { results } = await data;
  results.forEach(({ id, title, thumbnail }) => {
    const param = { sku: id, name: title, image: thumbnail };
    const addProduct = createProductItemElement(param);
    items.appendChild(addProduct);
  });
};

function cartAddProduct() {
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
}

emptyBtn.addEventListener('click', () => { cart.innerHTML = ''; });

window.onload = async () => { 
  await showProducts();
  cartAddProduct();
  cartItemClickListener();
  clearCart();
  loading();
  removeload();
};
