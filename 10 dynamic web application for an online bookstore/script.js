const books = [
  {id:1, title:"Harry Potter", category:"fiction", price:500, img:"images/book1.jpg"},
  {id:2, title:"Rich Dad Poor Dad", category:"nonfiction", price:400, img:"images/book2.jpg"},
  {id:3, title:"Engineering Math", category:"academic", price:700, img:"images/book3.jpg"},
  {id:4, title:"The Alchemist", category:"fiction", price:350, img:"images/book4.jpg"}
];

let cart = [];

function displayBooks(bookArray) {
  const bookList = document.getElementById("book-list");
  bookList.innerHTML = "";

  bookArray.forEach(book => {
    bookList.innerHTML += `
      <div class="card">
        <img src="${book.img}">
        <h4>${book.title}</h4>
        <p>₹${book.price}</p>
        <button onclick="addToCart(${book.id})">Add to Cart</button>
      </div>
    `;
  });
}

function filterBooks(category) {
  if (category === "all") {
    displayBooks(books);
  } else {
    const filtered = books.filter(b => b.category === category);
    displayBooks(filtered);
  }
}

function addToCart(id) {
  const book = books.find(b => b.id === id);
  cart.push(book);
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalEl = document.getElementById("total");

  cartItems.innerHTML = "";
  let total = 0;

  cart.forEach(item => {
    total += item.price;
    cartItems.innerHTML += `<li>${item.title} - ₹${item.price}</li>`;
  });

  totalEl.innerText = total;

  //  Checkout Button
  if (cart.length > 0) {
    cartItems.innerHTML += `
      <button onclick="checkout()" style="margin-top:10px; padding:5px 10px;">
        Checkout
      </button>
    `;
  }
}

// ✅ Checkout Function
function checkout() {
  alert("Order Successful!");

  cart = [];
  updateCart();
}

// Load books initially
displayBooks(books);