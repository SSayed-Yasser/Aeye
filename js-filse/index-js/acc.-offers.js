import {products} from '../db-js/products.js';
function updateCartCount() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const cartCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
  document.querySelector('#cart-count').textContent = cartCount;
}
updateCartCount();

// accs
let accProducts = products.filter(products => products.mod === "acc");
let accsHTML = '';
accProducts.slice(0, 10).forEach((products) => {
    accsHTML += `
        <div class="div-accs" style=" background-image: url(${products.img});">
          <div class="back-filter">
            <h3 class="accs-h4 name-edit-123">${products.name}</h3>
              <p class="discription">${products.discr}<p class="discription1">one year warranty</p></p>
              <div class="sale-div12">
                <h6 class="sale-h6">Sale</h6>
                <h6 class="sale-h6">${products.sale}%</h6>
                <h6 class="sale-h7" style="display: none;">${products.id}</h6>
              </div>
              <button class="button-acc button-animation2">Bay Now</button>
              <div class="price-div12">
                <p class="prive-without-sele2">${products.price} EG</p>
                <p class="prive-with-sele2">${products.price-(products.price*products.sale/100)} EG</p>
              </div>
          </div>
        </div>
    `; 
});
document.querySelector('.scroll-content2').innerHTML = accsHTML;


// new
let offersProducts = products.filter(products => products.mod === "off");
let proudct1HTML = '';
offersProducts.slice(0, 10).forEach((products) => {
    proudct1HTML += `
        <div class="div-accs" style=" background-image: url(${products.img});">
          <div class="back-filter">
            <h3 class="accs-h4 name-edit-123">${products.name}</h3>
              <p class="discription">${products.discr}<p class="discription1">one year warranty</p></p>
              <div class="sale-div12">
                <h6 class="sale-h6">Sale</h6>
                <h6 class="sale-h6">${products.sale}%</h6>
                <h6 class="sale-h7" style="display: none;">${products.id}</h6>
              </div>
              <button class="button-acc button-animation2">Bay Now</button>
              <div class="price-div12">
                <p class="prive-without-sele2">${products.price} EG</p>
                <p class="prive-with-sele2">${products.price-(products.price*products.sale/100)} EG</p>
              </div>
          </div>
        </div>
    `; 
});
document.querySelector('.scroll-content23').innerHTML = proudct1HTML;

function addToCart05(button) {
  const productDiv1 = button.closest('.div-accs');
  const productName1 = productDiv1.querySelector('.name-edit-123').textContent;
  const productImg = productDiv1.style.backgroundImage.slice(5, -2); 
  const productDiscr1 = productDiv1.querySelector('.discription').textContent;
  const productSale = productDiv1.querySelector('.sale-h6').textContent;
  const productPrice = productDiv1.querySelector('.prive-with-sele2').textContent;
  const productId = productDiv1.querySelector('.sale-h7').textContent;
  console.log(productDiscr1);

  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

  // Find if product is already in the cart
  const existingProductIndex = selectedProducts.findIndex(product => product.id === productId);

  if (existingProductIndex > -1) {
      selectedProducts[existingProductIndex].quantity += 1;
  } else {
      selectedProducts.push({
          id: productId,
          name: productName1,
          img: productImg,
          discr: productDiscr1,
          sale: productSale,
          price: productPrice,
          quantity: 1,
      });
  }

  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

  updateCartCount();
  }
document.querySelectorAll('.button-acc').forEach(button => {
  button.addEventListener('click', function() {
      addToCart05(this);
  });
});
