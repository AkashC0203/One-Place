const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3010;


app.use(express.urlencoded(true));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log(email)
  console.log(password)

  // Connect to the MongoDB database
  MongoClient.connect('mongodb://localhost:27017', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      // Select the users collection from the database
      const db = client.db('users');
      const collection = db.collection('users');

      // Find the user with the specified email and password
      return collection.findOne({ email, password });
    })
    .then(user => {
      if (user) {
        // If the authentication is successful, return a JWT token
        const token = 'someJWTtoken';
        res.status(200).json({ token });
      } else {
        // If the authentication fails, return an error message
        res.status(401).json({ error: 'Invalid credentials' });
      }
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
