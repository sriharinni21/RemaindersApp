import React, { useState, useEffect } from 'react';
import axios from 'axios';

function CompletedReminders() {
  const [completedReminders, setCompletedReminders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/completed')
      .then(response => setCompletedReminders(response.data))
      .catch(error => console.error('Error fetching completed reminders:', error));
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/complete/${id}`);
      setCompletedReminders(prevReminders => prevReminders.filter(reminder => reminder._id !== id));
    } catch (error) {
      console.error('Error deleting reminder:', error);
    }
  };

  return (
    <div>
      <h1>Completed Reminders</h1>
      <ul>
        {completedReminders.map(reminder => (
          <li key={reminder._id}>
            {reminder.title} - {reminder.date} - {reminder.time}
            <button type="button" onClick={() => handleDelete(reminder._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CompletedReminders;
