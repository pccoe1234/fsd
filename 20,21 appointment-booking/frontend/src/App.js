import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const SERVICES = ['Doctor Consultation', 'Salon Haircut', 'Financial Consultant', 'Dentist', 'Spa Massage'];

function App() {
  const [bookings, setBookings] = useState([]);
  const [formData, setFormData] = useState({ name: '', date: '', time: '', service: SERVICES[0] });

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:5004/api/bookings');
      setBookings(response.data);
    } catch (err) {
      console.error('Error fetching bookings:', err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5004/api/bookings', formData);
      setFormData({ name: '', date: '', time: '', service: SERVICES[0] });
      fetchBookings();
    } catch (err) {
      console.error('Error booking:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>EasyBook Appointments</h1>
        <p>Book your services instantly</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Book an Appointment</h2>
          <form onSubmit={handleSubmit} className="booking-form">
            <input type="text" placeholder="Full Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <select value={formData.service} onChange={(e) => setFormData({...formData, service: e.target.value})} required>
              {SERVICES.map(service => (
                <option key={service} value={service}>{service}</option>
              ))}
            </select>
            <div className="date-time-group">
              <input type="date" value={formData.date} onChange={(e) => setFormData({...formData, date: e.target.value})} required />
              <input type="time" value={formData.time} onChange={(e) => setFormData({...formData, time: e.target.value})} required />
            </div>
            <button type="submit">Confirm Booking</button>
          </form>
        </section>

        <section className="list-section">
          <h2>All Bookings</h2>
          <div className="bookings-list">
            {bookings.length === 0 ? <p>No bookings yet.</p> : bookings.map(booking => (
              <div key={booking._id} className="booking-card">
                <h3>{booking.service}</h3>
                <p><strong>Name:</strong> {booking.name}</p>
                <p><strong>Date:</strong> {booking.date}</p>
                <p><strong>Time:</strong> {booking.time}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
