import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const ITEMS = ['DSLR Camera', 'MacBook Pro', 'Mountain Bike', 'Camping Tent', 'Electric Scooter'];

function App() {
  const [rentals, setRentals] = useState([]);
  const [formData, setFormData] = useState({ name: '', item: ITEMS[0], duration: '', startDate: '' });

  const fetchRentals = async () => {
    try {
      const response = await axios.get('http://localhost:5010/api/rentals');
      setRentals(response.data);
    } catch (err) {
      console.error('Error fetching rentals:', err);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5010/api/rentals', formData);
      setFormData({ name: '', item: ITEMS[0], duration: '', startDate: '' });
      fetchRentals();
    } catch (err) {
      console.error('Error booking rental:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>RentItNow</h1>
        <p>Book equipment easily and affordably</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Create a Rental Booking</h2>
          <form onSubmit={handleSubmit} className="rental-form">
            <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <select value={formData.item} onChange={(e) => setFormData({...formData, item: e.target.value})} required>
              {ITEMS.map(item => <option key={item} value={item}>{item}</option>)}
            </select>
            <div className="form-row">
              <input type="number" placeholder="Duration (Days)" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} required />
              <input type="date" value={formData.startDate} onChange={(e) => setFormData({...formData, startDate: e.target.value})} required />
            </div>
            <button type="submit">Book Now</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Your Booking Records</h2>
          <div className="rentals-grid">
            {rentals.length === 0 ? <p>No bookings yet.</p> : rentals.map(rental => (
              <div key={rental._id} className="rental-card">
                <div className="card-header">
                  <h3>{rental.item}</h3>
                  <span className="duration">{rental.duration} Days</span>
                </div>
                <div className="card-body">
                  <p><strong>Booked By:</strong> {rental.name}</p>
                  <p><strong>Start Date:</strong> {rental.startDate}</p>
                  <p className="booking-date">Booked on {new Date(rental.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
