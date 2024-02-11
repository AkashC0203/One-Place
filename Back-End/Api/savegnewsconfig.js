const { MongoClient } = require('mongodb');
const uri = "mongodb+srv://puthethu:NqzjnxD7Zb8GIp63@cluster0.p27ikdg.mongodb.net/?retryWrites=true&w=majority";
const express = require('express');

const app = express();
const dbName = "news";

app.use(express.urlencoded(true))

app.post('/api/saveinitialgnewsconfig', (req, res) => {
  const { category, lang, country, max, email} = req.body;
  const configObj = { category, lang, country, max, email};

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      const db = client.db(dbName);
      const collection = db.collection('config');
      collection.insertOne(configObj)
        .then(() => {
          res.json({ status: 'success', message: 'Configuration saved successfully' });
          client.close();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ status: 'error', message: 'Failed to save configuration' });
          client.close();
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Failed to connect to MongoDB' });
    });
});

app.post('/api/editgnewsconfig', (req, res) => {
  const { category, lang, country, max, email } = req.body;
  const configObj = { category, lang, country, max, email };

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      const db = client.db(dbName);
      const collection = db.collection('config');
      collection.updateOne({ email }, { $set: configObj })
        .then((result) => {
          if (result.matchedCount === 0) {
            res.status(404).json({ status: 'error', message: 'User not found' });
          } else {
            res.json({ status: 'success', message: 'Configuration updated successfully' });
          }
          client.close();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ status: 'error', message: 'Failed to update configuration' });
          client.close();
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Failed to connect to MongoDB' });
    });
});

app.get('/api/getgnewsconfig', async (req, res) => {
  const { email } = req.query;
  if (!email) {
    res.status(400).json({ status: 'error', message: 'Email is required' });
    return;
  }

  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      const db = client.db(dbName);
      const collection = db.collection('config');
      collection.findOne({ email })
        .then((config) => {
          if (!config) {
            res.status(404).json({ status: 'error', message: 'User not found' });
          } else {
            res.json(config);
          }
          client.close();
        })
        .catch((err) => {
          console.error(err);
          res.status(500).json({ status: 'error', message: 'Failed to fetch configuration' });
          client.close();
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ status: 'error', message: 'Failed to connect to MongoDB' });
    });
});

app.listen(3040, () => {
  console.log('Server started on port 3040');
});
