import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

function ReminderDetails() {
  const { id } = useParams();
  const [reminder, setReminder] = useState({});

  useEffect(() => {
    axios.get(`http://localhost:8000/details/${id}`)
      .then(response => setReminder(response.data))
      .catch(error => console.error('Error fetching reminder details:', error));
  }, [id]);

  return (
    <div>
      <h1>Reminder Details</h1>
      <p>Title: {reminder.title}</p>
      <p>Date: {reminder.date}</p>
      <p>Time: {reminder.time}</p>
    </div>
  );
}

export default ReminderDetails;
