import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function ReminderForm() {
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:8000/today', { title, date, time });
      navigate('/');
    } catch (error) {
      console.error('Error adding reminder:', error);
    }
  };

  return (
    <div>
      <h1>Add Reminder</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Date:</label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label>Time:</label>
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <button type="submit">Add Reminder</button>
      </form>
    </div>
  );
}

export default ReminderForm;

