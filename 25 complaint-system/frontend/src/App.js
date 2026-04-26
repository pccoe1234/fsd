import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [complaints, setComplaints] = useState([]);
  const [formData, setFormData] = useState({ name: '', issue: '', category: '' });

  const fetchComplaints = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/complaints');
      setComplaints(response.data);
    } catch (err) {
      console.error('Error fetching complaints:', err);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5001/api/complaints', formData);
      setFormData({ name: '', issue: '', category: '' });
      fetchComplaints();
    } catch (err) {
      console.error('Error submitting complaint:', err);
    }
  };

  const handleStatusUpdate = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Pending' ? 'Resolved' : 'Pending';
    try {
      await axios.patch(`http://localhost:5001/api/complaints/${id}/status`, { status: newStatus });
      fetchComplaints();
    } catch (err) {
      console.error('Error updating status:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>College Grievance Portal</h1>
        <p>Submit and track complaints</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Submit a Complaint</h2>
          <form onSubmit={handleSubmit} className="complaint-form">
            <input
              type="text"
              placeholder="Your Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Category (e.g., Infrastructure, Academics)"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              required
            />
            <textarea
              placeholder="Describe your issue..."
              value={formData.issue}
              onChange={(e) => setFormData({ ...formData, issue: e.target.value })}
              required
            ></textarea>
            <button type="submit" className="submit-btn">Submit</button>
          </form>
        </section>

        <section className="list-section">
          <h2>Recent Complaints</h2>
          <div className="complaints-list">
            {complaints.length === 0 ? (
              <p>No complaints found.</p>
            ) : (
              complaints.map(complaint => (
                <div key={complaint._id} className="complaint-card">
                  <div className="card-header">
                    <h3>{complaint.category}</h3>
                    <span className={`status-badge ${complaint.status.toLowerCase()}`}>
                      {complaint.status}
                    </span>
                  </div>
                  <p className="issue-text">{complaint.issue}</p>
                  <div className="card-footer">
                    <span className="author">By: {complaint.name}</span>
                    <button 
                      className="toggle-status-btn"
                      onClick={() => handleStatusUpdate(complaint._id, complaint.status)}
                    >
                      Mark as {complaint.status === 'Pending' ? 'Resolved' : 'Pending'}
                    </button>
                  </div>
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
