function updateCartCount() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const cartCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
  document.querySelector('#cart-count').textContent = cartCount;
}
updateCartCount();

//def
document.getElementById('createheader').style.color = '#000';
document.getElementById('createmain').style.display = 'none';
document.getElementById('loginheader').style.color = '#790000';
document.getElementById('loginmain').style.display = 'block';
document.getElementById('forgetheader').style.color = '#000';
document.getElementById('forgetmain').style.display = 'none';
