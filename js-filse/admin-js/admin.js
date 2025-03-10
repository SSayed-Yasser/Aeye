// Import Firebase modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-app.js";
import { getFirestore, collection, getDocs, updateDoc, doc } from "https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA2Yl1VfdSjLfa3WGEszCOs4uA9vLAJVN0",
  authDomain: "aeye-52e5c.firebaseapp.com",
  projectId: "aeye-52e5c",
  storageBucket: "aeye-52e5c.firebasestorage.app",
  messagingSenderId: "721877823117",
  appId: "1:721877823117:web:5e789ac89e2baf9abffcc4",
  measurementId: "G-4NGC51320Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Update cart count
function updateCartCount() {
  const selectedProducts = JSON.parse(localStorage.getItem('selectedProducts')) || [];
  const cartCount = selectedProducts.reduce((total, product) => total + product.quantity, 0);
  document.querySelector('#cart-count').textContent = cartCount;
}
updateCartCount();

// Admin credentials
const adminEmail = "sayedyassersy1@gmail.com";

function checkAdminAccess() {
  const userData = JSON.parse(localStorage.getItem('userData'));

  
  if (!userData || !userData.email) {
    showErrorMessage("No user is logged in. Please log in first.");
    return;
  }

  if (userData.email === adminEmail) {
    document.getElementById("error-message").classList.add("hidden");
    document.getElementById("admin-container").classList.remove("hidden");
    loadOrders(); 
  } else {
    showErrorMessage("You are not an admin.");
  }
}

function showErrorMessage(message) {
  const errorContainer = document.getElementById("error-message");
  errorContainer.classList.remove("hidden");
  errorContainer.querySelector("h1").textContent = message;
}

async function loadOrders() {
  const ordersList = document.getElementById("orders-list");
  ordersList.innerHTML = '<p>Loading orders...</p>';

  try {
    const querySnapshot = await getDocs(collection(db, "orders"));
    ordersList.innerHTML = '';

    querySnapshot.forEach((docSnap) => {
      const order = docSnap.data();

      const productsHTML = order.products.map(product => `
        <div class="product-item">
          <span class="product-name">${product.name}</span>
          <span>Qty: ${product.quantity} | Price: ${product.price} EG</span>
        </div>
      `).join('');

      const trackingHTML = `
        <div class="tracking-container">
          <p class="section-title">Order Tracking</p>
          <button class="tracking-step ${order.trackingStatus === 1 ? 'current' : ''}" onclick="updateDeliveryOption('${docSnap.id}', 1)">Manufacturing</button>
          <button class="tracking-step ${order.trackingStatus === 2 ? 'current' : ''}" onclick="updateDeliveryOption('${docSnap.id}', 2)">Packing</button>
          <button class="tracking-step ${order.trackingStatus === 3 ? 'current' : ''}" onclick="updateDeliveryOption('${docSnap.id}', 3)">Shipping</button>
        </div>
      `;

      const orderHTML = `
        <div class="order-card">
          <h3>Order from ${order.user.name}</h3>
          <p><strong>Order ID:</strong> ${docSnap.id}</p>
          <p><strong>Order Date:</strong> ${new Date(order.timestamp).toLocaleString()}</p>
          <p><strong>Total Items:</strong> ${order.products.length}</p>
          <p><strong>Total Price:</strong> ${order.totalPrice} EG</p>
          <div class="product-list">${productsHTML}</div>
          <p class="section-title">Customer Details</p>
          <p><strong>Name:</strong> ${order.user.name}</p>
          <p><strong>Email:</strong> ${order.user.email}</p>
          <p><strong>Phone:</strong> ${order.user.phone}</p>
          <p><strong>Address:</strong> ${order.user.address}</p>
          ${trackingHTML}
        </div>
      `;

      ordersList.insertAdjacentHTML('beforeend', orderHTML);
    });
  } catch (error) {
    console.error("Error loading orders:", error);
    ordersList.innerHTML = '<p>Failed to load orders.</p>';
  }
}


window.updateDeliveryOption = async function updateTracking(orderId, newStatus) {
  try {
    const orderDoc = doc(db, "orders", orderId);
    await updateDoc(orderDoc, { trackingStatus: newStatus });
    alert('Order tracking updated successfully!');
    loadOrders(); 
  } catch (error) {
    console.error("Error updating tracking status:", error);
    alert('Failed to update tracking status.');
  }
};

document.addEventListener("DOMContentLoaded", checkAdminAccess);
