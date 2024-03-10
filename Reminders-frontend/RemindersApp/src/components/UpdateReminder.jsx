import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function UpdateReminder() {
  const { id } = useParams();
  const [reminder, setReminder] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    completed: false,
  });
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:8000/details/${id}`)
      .then(response => {
        setReminder(response.data);
      })
      .catch(error => console.error('Error fetching reminder details:', error));
  }, [id]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8000/details/${id}`, reminder);
      navigate(`/details/${id}`);
    } catch (error) {
      console.error('Error updating reminder:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setReminder(prevReminder => ({ ...prevReminder, [name]: value }));
  };

  return (
    <div className="update-reminder-container">
      <h1>Update Reminder</h1>
      <form>
        <label>Title:</label>
        <input type="text" name="title" value={reminder.title} onChange={handleChange} />
        <label>Description:</label>
        <input type="text" name="description" value={reminder.description} onChange={handleChange} />
        <label>Date:</label>
        <input type="date" name="date" value={reminder.date} onChange={handleChange} />
        <label>Time:</label>
        <input type="time" name="time" value={reminder.time} onChange={handleChange} />
        <label>Completed:</label>
        <input type="checkbox" name="completed" checked={reminder.completed} onChange={handleChange} />
        <button type="button" onClick={handleUpdate}>Update Reminder</button>
      </form>
    </div>
  );
}

export default UpdateReminder;