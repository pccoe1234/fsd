import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [reviews, setReviews] = useState([]);
  const [formData, setFormData] = useState({ name: '', course: '', rating: '5', comments: '' });

  const fetchReviews = async () => {
    try {
      const response = await axios.get('http://localhost:5011/api/reviews');
      setReviews(response.data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5011/api/reviews', formData);
      setFormData({ name: '', course: '', rating: '5', comments: '' });
      fetchReviews();
    } catch (err) {
      console.error('Error submitting review:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Course Review Portal</h1>
        <p>Share your learning experience</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Write a Review</h2>
          <form onSubmit={handleSubmit} className="review-form">
            <input type="text" placeholder="Student Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} required />
            <div className="form-row">
              <input type="text" placeholder="Course Name" value={formData.course} onChange={(e) => setFormData({...formData, course: e.target.value})} required />
              <select value={formData.rating} onChange={(e) => setFormData({...formData, rating: e.target.value})} required>
                <option value="5">5 Stars - Excellent</option>
                <option value="4">4 Stars - Good</option>
                <option value="3">3 Stars - Average</option>
                <option value="2">2 Stars - Poor</option>
                <option value="1">1 Star - Terrible</option>
              </select>
            </div>
            <textarea placeholder="Your Comments..." value={formData.comments} onChange={(e) => setFormData({...formData, comments: e.target.value})} required></textarea>
            <button type="submit">Submit Review</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Student Reviews</h2>
          <div className="reviews-list">
            {reviews.length === 0 ? <p>No reviews yet.</p> : reviews.map(review => (
              <div key={review._id} className="review-card">
                <div className="card-top">
                  <h3>{review.course}</h3>
                  <div className="rating">{'★'.repeat(review.rating)}{'☆'.repeat(5-review.rating)}</div>
                </div>
                <p className="comments">"{review.comments}"</p>
                <div className="card-bottom">
                  <span className="author">- {review.name}</span>
                  <span className="date">{new Date(review.createdAt).toLocaleDateString()}</span>
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
