const items = document.querySelector('.items');
const cart = document.querySelector('.cart__items');
const itemCart = document.querySelectorAll('.cart__items');
const emptyBtn = document.querySelector('.empty-cart');
const totalPriceElement = document.querySelector('.total-price');

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

function cartItemClickListener(event) {
  const { target } = event;
  const priceProduct = target.innerText.split('$')[1];
  target.remove();
  removePrice(priceProduct);
  saveCartItems(cart.innerHTML);
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

async function addPrice(param) {
  totalPriceElement.innerText = param;
}

async function priceTotal() {
  let FINAL_PRICE = 0;
  const PRICE = [];
  const itemsCart = document.querySelectorAll('li.cart__item');
  itemsCart.forEach((item) => {
    const price = item.innerText.split('$')[1];
    PRICE.push(parseFloat(price));
  });
  PRICE.reduce((item, acc) => {
    const soma = item + acc;
    FINAL_PRICE = soma;
    return FINAL_PRICE;
  }, 0);
  await addPrice(FINAL_PRICE);
}

async function createElementCart(param) {
  const item = await fetchItem(param);
  const { id, title, price } = await item;
  const addToCart = createCartItemElement({ sku: id, name: title, salePrice: price });
  cart.appendChild(addToCart);
  await priceTotal();
}

function cartAddProduct() {
  const btn = document.querySelectorAll('.item__add');
  
  btn.forEach((element) => {
    element.addEventListener('click', async (event) => {
      const itemID = getSkuFromProductItem(event.path[1]);
      await createElementCart(itemID);
      await subPrice();
    });
  });
}

emptyBtn.addEventListener('click', () => { 
  cart.innerHTML = ''; 
  totalPriceElement.innerText = 0;
});

function removePrice(param) {
  const actualPrice = totalPriceElement.innerText;
  const sub = actualPrice - param;
  totalPriceElement.innerText = sub;
}

window.onload = async () => { 
  await showProducts();
  cartAddProduct();
  cartItemClickListener();
  loading();
  removeload();
  // priceTotal();
  // cart.innerHTML = 
};
