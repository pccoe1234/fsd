const movies = [
  {id:1, name:"Movie 1", price:200, img:"images/movie1.jpg"},
  {id:2, name:"Movie 2", price:250, img:"images/movie2.jpg"},
  {id:3, name:"Movie 3", price:180, img:"images/movie3.jpg"}
];

let selectedMovie = null;
let selectedSeats = [];

// Display Movies
function displayMovies() {
  const movieDiv = document.getElementById("movies");
  movieDiv.innerHTML = "";

  movies.forEach(movie => {
    movieDiv.innerHTML += `
      <div class="card">
        <img src="${movie.img}">
        <h4>${movie.name}</h4>
        <p>Price: Rs ${movie.price}</p>
        <button onclick="selectMovie(${movie.id})">Select</button>
      </div>
    `;
  });
}

// Select Movie
function selectMovie(id) {
  selectedMovie = movies.find(m => m.id === id);
  alert("Movie Selected");
  createSeats();
}

// Create Seats
function createSeats() {
  const seatDiv = document.getElementById("seats");
  seatDiv.innerHTML = "";
  selectedSeats = [];

  for (let i = 1; i <= 32; i++) {
    seatDiv.innerHTML += `<div class="seat" onclick="selectSeat(${i}, this)">${i}</div>`;
  }
}

// Select Seat
function selectSeat(num, element) {
  if (!selectedMovie) {
    alert("Select a movie first");
    return;
  }

  if (selectedSeats.includes(num)) {
    selectedSeats = selectedSeats.filter(s => s !== num);
    element.classList.remove("selected");
  } else {
    selectedSeats.push(num);
    element.classList.add("selected");
  }

  updateSummary();
}

// Update Summary
function updateSummary() {
  document.getElementById("selectedSeats").innerText =
    selectedSeats.length ? selectedSeats.join(", ") : "None";

  let total = selectedSeats.length * (selectedMovie ? selectedMovie.price : 0);
  document.getElementById("total").innerText = total;
}

// Booking
function book() {
  if (!selectedMovie || selectedSeats.length === 0) {
    alert("Select movie and seats");
    return;
  }

  alert("Booking Successful");

  selectedSeats = [];
  createSeats();
  updateSummary();
}

// Load movies
displayMovies();