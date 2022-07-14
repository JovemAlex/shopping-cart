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

function cartItemClickListener({ target }) {
  target.remove();
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

function sum(total, num) {
  return total + num;
}

// const subPriceTotal = () => {
//   const preco = [];
//   cartItems.forEach((element) => {
//     element.addEventListener('click', (event) => {

//       fetchItem(id)
//         .then(({ price }) => {
//           preco.push(price);
//           totalPriceElement.innerText = preco.reduce(sum);
//         });
//     });
//   });
// };

function cartAddProduct() {
  const btn = document.querySelectorAll('.item__add');
  
  btn.forEach((element) => {
    element.addEventListener('click', (event) => {
      // 
      const itemID = getSkuFromProductItem(event.path[1]);
      
      fetchItem(itemID)
        .then(({ id: sku, title: name, price: salePrice }) => {
          const addProductCart = createCartItemElement({ sku, name, salePrice });
          cart.appendChild(addProductCart);
        });
    });
  });
  saveCartItems(cart.innerHTML);
}

const priceTotal = () => {
  const preco = [];
  const cartItems = document.querySelectorAll('.cart__item');
  console.log(cartItems);
};

emptyBtn.addEventListener('click', () => { cart.innerHTML = ''; });

window.onload = async () => { 
  await showProducts();
  cartAddProduct();
  cartItemClickListener();
  loading();
  removeload();
  priceTotal();
};
