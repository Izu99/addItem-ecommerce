const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the cors middleware
const router = require('./routes/route');

// Create Express application
const app = express();

// Middleware to enable CORS
app.use(cors());

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Use the router middleware
app.use('/', router); // This sets up the router to handle all routes

// Connect to MongoDB (assuming you have mongoose configured)
mongoose.connect('mongodb+srv://admin:vLw6y5aQEYjMkePp@cluster0.ghixis6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    // Start the server
    app.listen(5000, () => {
      console.log('Server is running on port 5000');
    });
  })
  .catch(err => console.error('Error connecting to MongoDB:', err));
