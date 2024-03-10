import React from 'react';
import { Link } from 'react-router-dom';

const ReminderItem = ({ reminder }) => {
  const { _id, title, date, time } = reminder;

  return (
    <div>
      <h3>{title}</h3>
      <p>Date: {date}</p>
      <p>Time: {time}</p>
      <Link to={`/details/${_id}`}>View Details</Link>
    </div>
  );
};

export default ReminderItem;
