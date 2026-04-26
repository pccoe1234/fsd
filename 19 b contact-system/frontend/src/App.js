import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [formData, setFormData] = useState({ name: '', phone: '', email: '' });

  const fetchContacts = async () => {
    try {
      const response = await axios.get('http://localhost:5007/api/contacts');
      setContacts(response.data);
    } catch (err) {
      console.error('Error fetching contacts:', err);
    }
  };

  useEffect(() => {
    fetchContacts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5007/api/contacts', formData);
      setFormData({ name: '', phone: '', email: '' });
      fetchContacts();
    } catch (err) {
      console.error('Error adding contact:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Contact Management</h1>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Add New Contact</h2>
          <form onSubmit={handleSubmit} className="contact-form">
            <input type="text" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="tel" placeholder="Phone Number" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} required />
            <input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} required />
            <button type="submit">Save Contact</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Your Contacts</h2>
          <div className="contacts-list">
            {contacts.length === 0 ? <p>No contacts found.</p> : contacts.map(contact => (
              <div key={contact._id} className="contact-card">
                <div className="avatar">{contact.name.charAt(0).toUpperCase()}</div>
                <div className="contact-info">
                  <h3>{contact.name}</h3>
                  <p>📞 {contact.phone}</p>
                  <p>✉️ {contact.email}</p>
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
