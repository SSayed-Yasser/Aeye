import {products} from '../db-js/products.js';

// Initialize cart count on page load
function updateCartCount() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const cartCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
  document.querySelector('#cart-count').textContent = cartCount;
}
updateCartCount();

// eye glasses
let menProducts = products.filter(product => 
  product.type === "men" || product.type === "chil" || product.type === "women"
);

let menproudctHTML = '';
menProducts.forEach((products) => {
    menproudctHTML += `
          <div class="contant-containar-all">
          <div class="sale-containar">
            <div class="sale-div">
              <h6 class="sale-h6">Sale</h6>
              <h6 class="sale-h6">${products.sale}%</h6>
              <h6 class="sale-h7" style="display: none;">${products.id}</h6>
            </div>
          </div>
          <img src="${products.img}" alt="sayed" class="img-all-cont">
          <div class="lens-type-dive">
            <h5>• Lens Type:&nbsp;</h5>
            <h5 id="lenstype-con">${products.lens}</h5>
          </div>
          <button class="quick-add-button-css btn liquid">QUICK ADD</button>
          <p class="name-all">${products.name}</p>
          <div class="price-div">
            <p class="prive-without-sele">${products.price} EG</p>
            <p class="prive-with-sele">${products.price-(products.price*products.sale/100)} EG</p>
          </div>
        </div>
    `; 
});
document.querySelector('.men-containar').innerHTML = menproudctHTML;
// eye glasses

// all sun
let sunProducts = products.filter(products => products.type === "sun");
let sunproudctHTML = '';
sunProducts.forEach((products) => {
    sunproudctHTML += `
          <div class="contant-containar-all">
          <div class="sale-containar">
            <div class="sale-div">
              <h6 class="sale-h6">Sale</h6>
              <h6 class="sale-h6">${products.sale}%</h6>
              <h6 class="sale-h7" style="display: none;">${products.id}</h6>
            </div>
          </div>
          <img src="${products.img}" alt="sayed" class="img-all-cont">
          <div class="lens-type-dive">
            <h5>• Lens Type:&nbsp;</h5>
            <h5 id="lenstype-con">${products.lens}</h5>
          </div>
          <button class="quick-add-button-css btn liquid">QUICK ADD</button>
          <p class="name-all">${products.name}</p>
          <div class="price-div">
            <p class="prive-without-sele">${products.price} EG</p>
            <p class="prive-with-sele">${products.price-(products.price*products.sale/100)} EG</p>
          </div>
        </div>
    `; 
});
document.querySelector('.sun-containar').innerHTML = sunproudctHTML;
// all sun block

function showToast() {
  Toastify({
      text: "Login to bay",
      duration: 3000
  }).showToast();
}

// Define function to add product to cart 11111
function addToCart3(button) {
    const productDiv = button.closest('.contant-containar-all');
    const productName = productDiv.querySelector('.name-all').textContent;
    const productImg = productDiv.querySelector('img').src;
    const productDiscr = productDiv.querySelector('.lens-type-dive').textContent;
    const productSale = productDiv.querySelectorAll('.sale-h6')[1].textContent.replace('%', '');
    const productPrice = productDiv.querySelector('.prive-with-sele').textContent.replace(' EG', '');
    const productId = productDiv.querySelector('.sale-h7').textContent;

    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Find if product is already in the cart
    const existingProductIndex = selectedProducts.findIndex(product => product.id === productId);
    if (existingProductIndex > -1) {
        // If product exists, increase the quantity
        selectedProducts[existingProductIndex].quantity += 1;
    } else {
        // If product does not exist, add it
        selectedProducts.push({
            id: productId,
            name: productName,
            img: productImg,
            discr: productDiscr,
            sale: productSale,
            price: productPrice,
            quantity: 1,
        });
    }

    localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));

    updateCartCount();
  }
// Apply event listeners to all 'quick-add-button-css' buttons
document.querySelectorAll('.quick-add-button-css').forEach(button => {
  button.addEventListener('click', function() {
      addToCart3(this);
  });
});

// accs
let accProducts = products.filter(products => products.mod === "acc");
let accsHTML = '';
accProducts.forEach((products) => {
    accsHTML += `
        <div class="div-accs" style=" background-image: url(${products.img});">
          <div class="back-filter">
            <h3 class="accs-h4">${products.name}</h3>
              <p class="discription">${products.discr}<p class="discription1">one year warranty</p></p>
              <div class="sale-div12">
                <h6 class="sale-h6">Sale</h6>
                <h6 class="sale-h6">${products.sale}%</h6>
              </div>
              <button class="button-acc button-animation2">Bay Now</button>
              <div class="price-div12">
                <p class="prive-without-sele2">${products.price} EG</p>
                <p class="prive-with-sele2">${products.price-(products.price*products.sale/100)} EG</p>
                <h6 class="sale-h7" style="display: none;">${products.id}</h6>
              </div>
          </div>
        </div>
    `; 
});
document.querySelector('.all-glasses-containar2233').innerHTML = accsHTML;

// off
let offersProducts = products.filter(products => products.mod === "off");
let proudct1HTML = '';
offersProducts.slice(0, 10).forEach((products) => {
    proudct1HTML += `
        <div class="div-accs" style=" background-image: url(${products.img});">
          <div class="back-filter">
            <h3 class="accs-h4">${products.name}</h3>
              <p class="discription">${products.discr}<p class="discription1">one year warranty</p></p>
              <div class="sale-div12">
                <h6 class="sale-h6">Sale</h6>
                <h6 class="sale-h6">${products.sale}%</h6>
              </div>
              <button id="sayed" class="button-acc button-animation2">Bay Now</button>
              <div class="price-div12">
                <p class="prive-without-sele2">${products.price} EG</p>
                <p class="prive-with-sele2">${products.price-(products.price*products.sale/100)} EG</p>
                <h6 class="sale-h7" style="display: none;">${products.id}</h6>
              </div>
          </div>
        </div>
    `; 
});
document.querySelector('.all-glasses-containar223344').innerHTML = proudct1HTML;

function addToCart(button) {
    const productDiv = button.closest('.div-accs');
    const productName = productDiv.querySelector('.accs-h4').textContent;
    const productImg = productDiv.style.backgroundImage.slice(5, -2); 
    const productDiscr = productDiv.querySelector('.discription').textContent.split("one year warranty")[0];
    const productSale = productDiv.querySelectorAll('.sale-h6')[1].textContent.replace('%', '');
    const productPrice = productDiv.querySelector('.prive-with-sele2').textContent.replace(' EG', '');
    const productId = productDiv.querySelector('.sale-h7').textContent;

    const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];

    // Find if product is already in the cart
    const existingProductIndex = selectedProducts.findIndex(product => product.id === productId);

    if (existingProductIndex > -1) {
        selectedProducts[existingProductIndex].quantity += 1;
    } else {
        selectedProducts.push({
            id: productId,
            name: productName,
            img: productImg,
            discr: productDiscr,
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
      addToCart(this);
  });
});

