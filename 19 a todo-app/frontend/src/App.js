import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');

  const fetchTasks = async () => {
    try {
      const response = await axios.get('http://localhost:5006/api/tasks');
      setTasks(response.data);
    } catch (err) {
      console.error('Error fetching tasks:', err);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5006/api/tasks', { title });
      setTitle('');
      fetchTasks();
    } catch (err) {
      console.error('Error adding task:', err);
    }
  };

  const handleToggle = async (id, currentStatus) => {
    try {
      await axios.patch(`http://localhost:5006/api/tasks/${id}`, { completed: !currentStatus });
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
    }
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>To-Do List</h1>
        <p>Manage your daily tasks</p>
      </header>

      <main className="main-content">
        <form onSubmit={handleAdd} className="task-form">
          <input type="text" placeholder="What needs to be done?" value={title} onChange={(e) => setTitle(e.target.value)} required />
          <button type="submit">Add Task</button>
        </form>

        <ul className="task-list">
          {tasks.map(task => (
            <li key={task._id} className={task.completed ? 'task completed' : 'task'}>
              <span className="task-title" onClick={() => handleToggle(task._id, task.completed)}>
                {task.title}
              </span>
              <button className="toggle-btn" onClick={() => handleToggle(task._id, task.completed)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
