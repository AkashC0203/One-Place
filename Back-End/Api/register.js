const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3030;

// Enable JSON request body parsing
app.use(express.urlencoded(true));

// Define the route for the user registration API
app.post('/register', (req, res) => {
  // Extract the user information from the request body
  const { firstName, lastName, email, password } = req.body;

  // Connect to the MongoDB database
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      // Select the users collection from the database
      const db = client.db('users');
      const collection = db.collection('users');

      // Insert the user document into the database
      const user = { firstName, lastName, email, password };
      return collection.insertOne(user);
    })
    .then(result => {
      res.status(201).json({ message: 'User created successfully' });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: err.message });
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
