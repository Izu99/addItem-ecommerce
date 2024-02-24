const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const router = require('./routes/route');

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:vLw6y5aQEYjMkePp@cluster0.ghixis6.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((error) => console.error('Could not connect to MongoDB:', error));

app.use('/api', router); // Mount all routes under the '/api' prefix

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));

module.exports = app;
