function updateCartCount() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const cartCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
  document.querySelector('#cart-count').textContent = cartCount;
  document.querySelector('#cart-count1').textContent = "Items" + " " + "(" + cartCount + ")";
}
updateCartCount();

function updateTotalPrice() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  let totalPrice = selectedProducts.reduce((total, product) => total + (parseInt(product.price) * product.quantity), 0);

  // حساب deliveryCost بناءً على الخيارات المحفوظة في localStorage
  let deliveryCost = selectedProducts.reduce((total, product, index) => {
    const savedDeliveryOption = localStorage.getItem(`delivery-${index}`) || '0';
    return total + parseInt(savedDeliveryOption);
  }, 0);

  let tax = Math.round(totalPrice * 0.14);
  let finalPrice = totalPrice + tax + deliveryCost;

  document.querySelector('#items-price').textContent = totalPrice + " $";
  document.querySelector('#shipping-price').textContent = deliveryCost + " $";
  document.querySelector('#total-before-tax').textContent = (totalPrice + deliveryCost) + " $";
  document.querySelector('#tax').textContent = tax + " $";
  document.querySelector('#final-price').textContent = finalPrice + " $";
}

function updateShippingCost() {
  const deliveryOptions = document.querySelectorAll('.delivery-options input[type="radio"]');
  deliveryOptions.forEach(option => {
      option.addEventListener('change', (event) => {
          const selectedOption = event.target.value;
          const productIndex = event.target.name.split('-')[1];
          localStorage.setItem(`delivery-${productIndex}`, selectedOption); // حفظ الخيار المحدد
          updateTotalPrice();  // تحديث السعر الكلي
      });
  });
}

function loadCheckoutProducts() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const checkoutProductsDiv = document.getElementById('checkout-products');

  checkoutProductsDiv.innerHTML = '';
  selectedProducts.forEach((product, index) => {
      const savedDeliveryOption = localStorage.getItem(`delivery-${index}`) || '0';
      const productDiv = document.createElement('div');
      productDiv.className = 'product';
      productDiv.innerHTML = `
              <div class="broduct-con">
                <div class="img-con">
                <img src="${product.img}" alt="" class="img-edit">
                </div>
                <div class="product-con2">
                    <div class="part1"></div>
                    <div class="part2">
                        <h3 class="proudct-name">${product.name}</h3>
                        <p class="disc">${product.discr}</p>
                        <div class="qoun" style="display: flex;">
                            <p>Price: ${product.price}</p>
                        </div>
                        <div class="qoun" style="display: flex;">
                            <p>Quantity: ${product.quantity}</p>
                        </div>
                        <button class="button-ss" onclick="removeProduct(${index})">Remove</button>
                    </div>
                    <div class="part3">
                        <div class="free">
                            <input type="radio" name="delivery-${index}" value="0" ${savedDeliveryOption === '0' ? 'checked' : ''}>
                            <h5>One week (Free)</h5>
                        </div>
                        <div class="free">
                            <input type="radio" name="delivery-${index}" value="50" ${savedDeliveryOption === '50' ? 'checked' : ''}>
                            <h5> Two days (50 EG)</h5>
                        </div>
                        <div class="free">
                            <input type="radio" name="delivery-${index}" value="100" ${savedDeliveryOption === '100' ? 'checked' : ''}>
                            <h5>Same day (100 EG)</h5>
                        </div>
                    </div>
                </div>
              </div>
      `;
      checkoutProductsDiv.appendChild(productDiv);
  });

  updateTotalPrice();
  updateShippingCost();
}

function removeProduct(index) {
  let selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  selectedProducts.splice(index, 1);
  localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
  localStorage.removeItem(`delivery-${index}`);
  loadCheckoutProducts();
}

function confirmOrder() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const orders = JSON.parse(localStorage.getItem('orders')) || [];
  orders.push(selectedProducts);
  localStorage.setItem('orders', JSON.stringify(orders));
  localStorage.removeItem('selectedProducts');
  selectedProducts.forEach((product, index) => {
      localStorage.removeItem(`delivery-${index}`);
  });
  alert('Order confirmed!');
  window.location.href = 'index.html';
}

loadCheckoutProducts();