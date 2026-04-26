import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState('All');
  const [formData, setFormData] = useState({
    itemName: '',
    description: '',
    location: '',
    contact: '',
    type: 'Lost'
  });

  const fetchItems = async () => {
    try {
      const response = await axios.get('http://localhost:5003/api/items');
      setItems(response.data);
    } catch (err) {
      console.error('Error fetching items:', err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5003/api/items', formData);
      setFormData({
        itemName: '',
        description: '',
        location: '',
        contact: '',
        type: 'Lost'
      });
      fetchItems();
    } catch (err) {
      console.error('Error adding item:', err);
    }
  };

  const filteredItems = filter === 'All' ? items : items.filter(item => item.type === filter);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Lost & Found Portal</h1>
        <p>Report lost items or post found items</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Report an Item</h2>
          <form onSubmit={handleSubmit} className="item-form">
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  value="Lost"
                  checked={formData.type === 'Lost'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                /> Lost
              </label>
              <label>
                <input
                  type="radio"
                  value="Found"
                  checked={formData.type === 'Found'}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                /> Found
              </label>
            </div>
            <input
              type="text"
              placeholder="Item Name (e.g., Blue Backpack)"
              value={formData.itemName}
              onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Location (Where it was lost/found)"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Contact Information"
              value={formData.contact}
              onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
              required
            />
            <textarea
              placeholder="Additional Details/Description..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
            <button type="submit" className="submit-btn">Submit Report</button>
          </form>
        </section>

        <section className="list-section">
          <div className="list-header">
            <h2>Items</h2>
            <div className="filter-buttons">
              <button className={filter === 'All' ? 'active' : ''} onClick={() => setFilter('All')}>All</button>
              <button className={filter === 'Lost' ? 'active' : ''} onClick={() => setFilter('Lost')}>Lost</button>
              <button className={filter === 'Found' ? 'active' : ''} onClick={() => setFilter('Found')}>Found</button>
            </div>
          </div>

          <div className="items-grid">
            {filteredItems.length === 0 ? (
              <p>No items found.</p>
            ) : (
              filteredItems.map(item => (
                <div key={item._id} className={`item-card ${item.type.toLowerCase()}`}>
                  <div className="card-badge">{item.type}</div>
                  <h3>{item.itemName}</h3>
                  <p className="description">{item.description}</p>
                  <div className="details">
                    <p><strong>Location:</strong> {item.location}</p>
                    <p><strong>Contact:</strong> {item.contact}</p>
                  </div>
                  <small className="date">Reported: {new Date(item.createdAt).toLocaleDateString()}</small>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
