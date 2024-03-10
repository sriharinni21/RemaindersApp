const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String 
  },
  completed: { 
    type: Boolean,
    default: false 
  },
});

const Reminder = mongoose.model('reminderdetails', reminderSchema);

module.exports = { Reminder };