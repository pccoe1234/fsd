const movies = [
  {id:1, name:"Movie 1", price:200, img:"images/movie1.jpg"},
  {id:2, name:"Movie 2", price:250, img:"images/movie2.jpg"},
  {id:3, name:"Movie 3", price:180, img:"images/movie3.jpg"}
];

let selectedMovie = null;
let selectedSeats = [];

function displayMovies() {
  const movieDiv = document.getElementById("movies");
  movieDiv.innerHTML = "";

  movies.forEach(movie => {
    movieDiv.innerHTML += `
      <div class="col-md-6 col-lg-4">
        <div class="card">
          <img src="${movie.img}" class="card-img-top" alt="${movie.name}">
          <div class="card-body text-center">
            <h4 class="card-title">${movie.name}</h4>
            <p class="card-text">Price: Rs ${movie.price}</p>
            <button class="btn btn-primary" onclick="selectMovie(${movie.id})">Select</button>
          </div>
        </div>
      </div>
    `;
  });
}

function selectMovie(id) {
  selectedMovie = movies.find(m => m.id === id);
  alert("Movie Selected");
  createSeats();
}

function createSeats() {
  const seatDiv = document.getElementById("seats");
  seatDiv.innerHTML = "";
  selectedSeats = [];

  for (let i = 1; i <= 32; i++) {
    seatDiv.innerHTML += `<div class="seat" onclick="selectSeat(${i}, this)">${i}</div>`;
  }
}

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

function updateSummary() {
  document.getElementById("selectedSeats").innerText =
    selectedSeats.length ? selectedSeats.join(", ") : "None";

  let total = selectedSeats.length * (selectedMovie ? selectedMovie.price : 0);
  document.getElementById("total").innerText = total;
}

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

displayMovies();
