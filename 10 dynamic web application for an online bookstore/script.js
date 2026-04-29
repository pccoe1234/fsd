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
      <div class="col-md-6">
        <div class="card">
          <img src="${book.img}" class="card-img-top" alt="${book.title}">
          <div class="card-body text-center">
            <h4 class="card-title">${book.title}</h4>
            <p class="card-text">₹${book.price}</p>
            <button class="btn btn-primary" onclick="addToCart(${book.id})">Add to Cart</button>
          </div>
        </div>
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

  if (cart.length > 0) {
    cartItems.innerHTML += `
      <button class="btn btn-success mt-3" onclick="checkout()">
        Checkout
      </button>
    `;
  }
}

function checkout() {
  alert("Order Successful!");

  cart = [];
  updateCart();
}

displayBooks(books);
