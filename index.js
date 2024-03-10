  const express = require('express')
  const mongoose = require('mongoose')
  const { Reminder } = require('./schema.js')
  const bodyParser = require('body-parser')
  const cors = require('cors')

  const app = express()
  app.use(bodyParser.json())
  app.use(cors())

  async function connectToDB(){
      try{
          await mongoose.connect('mongodb+srv://sriharinnije:reset123@cluster0.dqnlq0e.mongodb.net/ReminderApp?retryWrites=true&w=majority&appName=Cluster0')
          console.log('Database connection established')

          const port = process.env.PORT || 8000
          app.listen(port, function(){
              console.log(`Running on port ${port}...`);
          })
      }catch(error){
          console.log(error)
          console.log('Database connection failed:', error)
      }
  }
  connectToDB()

  app.post('/today', async(req, res)=>{
      try{
          const {title, description, date, time} = req.body;
          const newReminder = new Reminder({title, description, date, time})
          await newReminder.save()
          res.status(201).json({
              "message" : "Reminder added successfully",
              "reminder" : newReminder
          })
      }catch (error) {
          console.error('Error adding reminder:', error);
          res.status(500).json({ 
              "error": 'Cannot add reminder' 
          });
        }
  })

  app.get('/today', async (req, res) => {
      try {
        const todayReminders = await Reminder.find({ 
          date: { 
            $gte: new Date().setHours(0, 0, 0, 0) 
          } 
        });
        res.json(todayReminders);
      } catch (error) {
        console.error('Error fetching today reminders:', error);
        res.status(500).json({ 
          error: 'Cannot fetch your reminder' 
      });
      }
    });

  app.get('/all', async (req, res) => {
      try {
        const allReminders = await Reminder.find().sort({ 
          "date": 1, 
          "time": 1 
      });
      res.json(allReminders);
      } catch (error) {
        console.error('Error fetching all reminders:', error);
        res.status(500).json({ 
          error: 'Cannot fetch all your remindrs' 
      });
      }
    });

    app.get('/completed', async (req, res) => {
      try {
        const completedReminders = await Reminder.find({ completed: true }).sort({ date: 1, time: 1 });
        res.json(completedReminders);
      } catch (error) {
        console.error('Error fetching completed reminders:', error);
        res.status(500).json({ error: 'Cannot fetch your completed reminders' });
      }
    });

    app.patch('/details/:id', async (req, res) => {
      try {
        const reminder = await Reminder.findById(req.params.id);
    
        if (!reminder) {
          return res.status(404).json({ error: 'Reminder not found' });
        }
        if (req.body.title) {
          reminder.title = req.body.title;
        }
        if (req.body.description) {
          reminder.description = req.body.description;
        }
        if (req.body.date) {
          reminder.date = req.body.date;
        }
        if (req.body.time) {
          reminder.time = req.body.time;
        }
        if (req.body.completed !== undefined) {
          reminder.completed = req.body.completed;
        }
    
        await reminder.save();
    
        res.json({ message: 'Reminder updated successfully', reminder: reminder });
      } catch (error) {
        console.error('Error updating reminder details:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
    });
    
  
app.delete('/complete/:id', async (req, res) => {
      try {
    
        const deletedReminder = await Reminder.findOneAndDelete(req.params.id);
    
        if (!deletedReminder) {
          return res.status(404).json({ error: 'Reminder not found' });
        }
    
        res.json({ message: 'Reminder marked as completed and deleted', reminder: deletedReminder });
      } catch (error) {
        console.error('Error marking reminder as completed and deleting:', error);
        res.status(500).json({ error: 'Cannot delete your reminder' });
      }
    });