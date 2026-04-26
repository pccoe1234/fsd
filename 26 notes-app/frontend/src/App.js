import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [notes, setNotes] = useState([]);
  const [formData, setFormData] = useState({ subject: '', title: '', description: '' });

  const fetchNotes = async () => {
    try {
      const response = await axios.get('http://localhost:5002/api/notes');
      setNotes(response.data);
    } catch (err) {
      console.error('Error fetching notes:', err);
    }
  };

  useEffect(() => {
    fetchNotes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5002/api/notes', formData);
      setFormData({ subject: '', title: '', description: '' });
      fetchNotes();
    } catch (err) {
      console.error('Error submitting note:', err);
    }
  };

  // Group notes by subject
  const groupedNotes = notes.reduce((acc, note) => {
    if (!acc[note.subject]) {
      acc[note.subject] = [];
    }
    acc[note.subject].push(note);
    return acc;
  }, {});

  return (
    <div className="app-container">
      <header className="header">
        <h1>Notes Sharing Platform</h1>
        <p>Upload and browse study materials</p>
      </header>

      <main className="main-content">
        <section className="upload-section">
          <h2>Upload a Note</h2>
          <form onSubmit={handleSubmit} className="note-form">
            <input
              type="text"
              placeholder="Subject (e.g., Math, Science)"
              value={formData.subject}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              required
            />
            <input
              type="text"
              placeholder="Title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
            <textarea
              placeholder="Description or Link"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            ></textarea>
            <button type="submit" className="submit-btn">Upload Note</button>
          </form>
        </section>

        <section className="browse-section">
          <h2>Browse Notes by Subject</h2>
          {Object.keys(groupedNotes).length === 0 ? (
            <p>No notes available yet.</p>
          ) : (
            Object.keys(groupedNotes).map(subject => (
              <div key={subject} className="subject-group">
                <h3 className="subject-title">{subject}</h3>
                <div className="notes-grid">
                  {groupedNotes[subject].map(note => (
                    <div key={note._id} className="note-card">
                      <h4>{note.title}</h4>
                      <p>{note.description}</p>
                      <small className="date">{new Date(note.createdAt).toLocaleDateString()}</small>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
