let cart = JSON.parse(localStorage.getItem("cart")) || [];

const cartList = document.getElementById("cartList");

function displayCart() {
  cartList.innerHTML = "";

  cart.forEach((item, index) => {
    cartList.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>₹${item.price}</p>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });
}

function removeItem(index) {
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

function checkout() {
  if(cart.length === 0) {
    alert("Cart is empty!");
    return;
  }

  alert("Order placed successfully! 🎉 Thank you for shopping.");
  cart = [];
  localStorage.setItem("cart", JSON.stringify(cart));
  displayCart();
}

displayCart();