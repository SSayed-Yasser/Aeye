import {products} from '../db-js/products.js';
function updateCartCount() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const cartCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
  document.querySelector('#cart-count').textContent = cartCount;
}
updateCartCount();

// new
let allProducts = products.filter(products => products.mod === "glass");
let proudctHTML = '';
allProducts.slice(0, 10).forEach((products) => {
    proudctHTML += `
        <div class="div-new2">
            <div class="sale-div sale-div1">
              <h6 class="sale-h6">Sale</h6>
              <h6 class="sale-h6">${products.sale}%</h6>
              <h6 class="sale-h7" style="display: none;">${products.id}</h6>
            </div>
          <div class="img-new-hiddeimg">
            <img src="${products.img}" alt="" class="img-new-products">
          </div>
          <div class="lens-div">
            <h5 class="left9 left55">Lens Typ:</h5>
            <h5 class="left10 left55">${products.lens}</h5>
          </div>
          <button class="quick-add-button-css-1 button-animation">QUICK ADD</button>
          <h4 class="new-name-h4">${products.name}</h4>
          <div class="price-div1">
            <p class="prive-without-sele">${products.price} EG</p>
            <p class="prive-with-sele">${products.price-(products.price*products.sale/100)} EG</p>
          </div>
        </div>
    `; 
});
document.querySelector('.scroll-content').innerHTML = proudctHTML;

function showToast() {
  Toastify({
      text: "Login to bay",
      duration: 3000
  }).showToast();
}
// Define function to add product to cart 11111
function addToCart04(button) {
    const productDiv = button.closest('.div-new2');
    const productName = productDiv.querySelector('.new-name-h4').textContent;
    const productImg = productDiv.querySelector('img').src;
    const productDiscr = productDiv.querySelector('.lens-div').textContent;
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
document.querySelectorAll('.quick-add-button-css-1').forEach(button => {
  button.addEventListener('click', function() {
      addToCart04(this);
  });
});