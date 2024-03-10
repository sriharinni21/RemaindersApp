import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RemindersList from './components/RemindersList';
import ReminderForm from './components/ReminderForm';
import ReminderDetails from './components/ReminderDetails';
import UpdateReminder from './components/UpdateReminder';
import CompletedReminders from './components/CompletedReminders';

function App() {
  return (
    <Router>
      <div className="container">
        <h1 className="header">Reminder App</h1>
        <Routes>
          <Route path="/" element={<RemindersList />} />
          <Route path="/add" element={<ReminderForm />} />
          <Route path="/details/:id" element={<ReminderDetails />} />
          <Route path="/update/:id" element={<UpdateReminder />} />
          <Route path="/completed" element={<CompletedReminders />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
