import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get('http://localhost:5004/api/events');
        setEvents(response.data);
      } catch (err) {
        console.error('Error fetching events:', err);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="app-container">
      <header className="header">
        <h1>Welcome to Springfield College</h1>
        <p>Excellence in Education Since 1950</p>
      </header>

      <main className="main-content">
        <section className="about-section">
          <h2>About Us</h2>
          <p>We provide world-class education in engineering, arts, and sciences. Our campus offers state-of-the-art facilities for students from around the globe.</p>
        </section>

        <section className="events-section">
          <h2>Upcoming Events & News</h2>
          <div className="events-list">
            {events.length === 0 ? (
              <p>No upcoming events.</p>
            ) : (
              events.map(event => (
                <div key={event._id} className="event-card">
                  <h3>{event.title}</h3>
                  <p className="event-date"><strong>Date:</strong> {event.date}</p>
                  <p className="event-location"><strong>Location:</strong> {event.location}</p>
                  <p className="event-description">{event.description}</p>
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
