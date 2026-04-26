let cart = JSON.parse(localStorage.getItem("cart")) || [];

const products = [
  { id: 1, name: "T-Shirt", price: 499, img: "images/tshirt.jpg" },
  { id: 2, name: "Jeans", price: 1299, img: "images/jeans.jpg" },
  { id: 3, name: "Jacket", price: 1999, img: "images/jacket.jpg" },
  { id: 4, name: "Shoes", price: 1499, img: "images/shoes.jpg" }
];

const productList = document.getElementById("productList");

function displayProducts() {
  products.forEach(p => {
    productList.innerHTML += `
      <div class="card">
        <img src="${p.img}">
        <h3>${p.name}</h3>
        <p>₹${p.price}</p>
        <button onclick="addToCart(${p.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  let item = products.find(p => p.id === id);
  cart.push(item);
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cartCount").innerText = cart.length;
}

updateCartCount();
displayProducts();