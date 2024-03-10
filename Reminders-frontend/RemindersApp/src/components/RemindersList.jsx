import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RemindersList = () => {
  const [todayReminders, setTodayReminders] = useState([]);
  const [allReminders, setAllReminders] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8000/today')
      .then(response => setTodayReminders(response.data))
      .catch(error => console.error('Error fetching today reminders:', error));

    axios.get('http://localhost:8000/all')
      .then(response => setAllReminders(response.data))
      .catch(error => console.error('Error fetching all reminders:', error));
  }, []);

  const handleComplete = async (id) => {
    try {
      await axios.put(`http://localhost:8000/complete/${id}`);
      setTodayReminders(prevReminders => prevReminders.filter(reminder => reminder._id !== id));
    } catch (error) {
      console.error('Error marking reminder as completed:', error);
    }
  };

  return (
    <div className="reminders-container">
      <h1 className="header-1">Reminders</h1>
      <p className="reminders-text">Checkout your reminders</p>
      <div className="reminder-list">
        {todayReminders.map(reminder => (
          <div key={reminder._id} className="reminder-item">
            <span>
              <input
                type="checkbox"
                onChange={() => handleComplete(reminder._id)}
                className="checkbox"
              />
              {reminder.title} - {reminder.date} - {reminder.time}
            </span>
            <Link to={`/details/${reminder._id}`} className="reminder-details">Details</Link>
          </div>
        ))}
      </div>
      <div className='button_container'>
      <Link to="/add" className="link-btn">Add Reminder</Link>
      <Link to="/update/:reminderId" className="link-btn">Update</Link>
      <Link to="/completed" className="link-btn">Completed</Link>
      </div>
    </div>
  );
}

export default RemindersList;
