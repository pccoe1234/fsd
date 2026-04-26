import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [vehicles, setVehicles] = useState([]);
  const [formData, setFormData] = useState({ make: '', model: '', year: '', price: '', details: '' });

  const fetchVehicles = async () => {
    try {
      const response = await axios.get('http://localhost:5009/api/vehicles');
      setVehicles(response.data);
    } catch (err) {
      console.error('Error fetching vehicles:', err);
    }
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5009/api/vehicles', formData);
      setFormData({ make: '', model: '', year: '', price: '', details: '' });
      fetchVehicles();
    } catch (err) {
      console.error('Error posting vehicle:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>AutoMart</h1>
        <p>Your portal for used cars and bikes</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Post a Vehicle for Sale</h2>
          <form onSubmit={handleSubmit} className="vehicle-form">
            <div className="form-row">
              <input type="text" placeholder="Make (e.g., Toyota, Honda)" value={formData.make} onChange={(e) => setFormData({...formData, make: e.target.value})} required />
              <input type="text" placeholder="Model (e.g., Corolla, CBR250)" value={formData.model} onChange={(e) => setFormData({...formData, model: e.target.value})} required />
            </div>
            <div className="form-row">
              <input type="number" placeholder="Year" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} required />
              <input type="number" placeholder="Price ($)" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required />
            </div>
            <textarea placeholder="Additional Details (Condition, Mileage, etc.)" value={formData.details} onChange={(e) => setFormData({...formData, details: e.target.value})} required></textarea>
            <button type="submit">Post Listing</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Available Vehicles</h2>
          <div className="vehicles-grid">
            {vehicles.length === 0 ? <p>No vehicles listed currently.</p> : vehicles.map(vehicle => (
              <div key={vehicle._id} className="vehicle-card">
                <div className="price-tag">${vehicle.price}</div>
                <h3>{vehicle.year} {vehicle.make} {vehicle.model}</h3>
                <p className="details">{vehicle.details}</p>
                <small className="date">Listed on {new Date(vehicle.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
