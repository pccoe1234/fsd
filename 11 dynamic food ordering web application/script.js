let cart = [];

const foods = [
  { id: 1, name: "Burger", price: 120, category: "snacks", img: "images/burger.jpg" },
  { id: 2, name: "Pizza", price: 250, category: "meals", img: "images/pizza.jpg" },
  { id: 3, name: "Sandwich", price: 80, category: "snacks", img: "images/sandwich.jpg" },
  { id: 4, name: "Coffee", price: 60, category: "beverages", img: "images/coffee.jpg" },
  { id: 5, name: "Biryani", price: 180, category: "meals", img: "images/biryani.jpg" }
];

function displayFood(list) {
  let foodList = document.getElementById("foodList");
  foodList.innerHTML = "";

  list.forEach(item => {
    foodList.innerHTML += `
      <div class="card">
        <img src="${item.img}">
        <h3>${item.name}</h3>
        <p>Price: Rs ${item.price}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      </div>
    `;
  });
}

function addToCart(id) {
  let item = foods.find(f => f.id === id);
  cart.push(item);
  updateCart();
}

function removeItem(index) {
  cart.splice(index, 1);
  updateCart();
}

function updateCart() {
  document.getElementById("cartCount").innerText = cart.length;

  let cartItems = document.getElementById("cartItems");
  cartItems.innerHTML = "";

  let total = 0;

  cart.forEach((item, index) => {
    total = total + item.price;

    cartItems.innerHTML += `
      <div class="cart-item">
        <span>${item.name} - Rs ${item.price}</span>
        <button onclick="removeItem(${index})">Remove</button>
      </div>
    `;
  });

  document.getElementById("total").innerText = total;
}

function filterFood(category) {
  if (category === "all") {
    displayFood(foods);
  } else {
    let filtered = foods.filter(item => item.category === category);
    displayFood(filtered);
  }
}

function checkout() {
  if (cart.length === 0) {
    alert("Cart is empty");
    return;
  }

  alert("Order placed successfully");

  cart = [];
  updateCart();
}

displayFood(foods);