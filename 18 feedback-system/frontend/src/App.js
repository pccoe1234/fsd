import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [formData, setFormData] = useState({ name: '', subject: '', feedback: '' });

  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get('http://localhost:5005/api/feedbacks');
      setFeedbacks(response.data);
    } catch (err) {
      console.error('Error fetching feedbacks:', err);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5005/api/feedbacks', formData);
      setFormData({ name: '', subject: '', feedback: '' });
      fetchFeedbacks();
    } catch (err) {
      console.error('Error submitting feedback:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Student Feedback System</h1>
        <p>We value your opinion!</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Submit Feedback</h2>
          <form onSubmit={handleSubmit} className="feedback-form">
            <input type="text" placeholder="Your Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <input type="text" placeholder="Subject / Course" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} required />
            <textarea placeholder="Your Feedback..." value={formData.feedback} onChange={(e) => setFormData({...formData, feedback: e.target.value})} required></textarea>
            <button type="submit">Submit Feedback</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Recent Feedbacks</h2>
          <div className="feedback-grid">
            {feedbacks.length === 0 ? <p>No feedback yet.</p> : feedbacks.map(fb => (
              <div key={fb._id} className="feedback-card">
                <div className="fb-header">
                  <h3>{fb.subject}</h3>
                  <span className="fb-name">{fb.name}</span>
                </div>
                <p className="fb-text">"{fb.feedback}"</p>
                <small className="fb-date">{new Date(fb.createdAt).toLocaleDateString()}</small>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
