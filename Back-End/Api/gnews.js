const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');
const app = express();
const apikey = 'c4423886d381833f33956fcc40ca47f0';
const uri = "mongodb+srv://puthethu:NqzjnxD7Zb8GIp63@cluster0.p27ikdg.mongodb.net/?retryWrites=true&w=majority";
const dbName = "news";

app.use(express.urlencoded(true));

async function fetchNews(config) {
  const url = `https://gnews.io/api/v4/top-headlines?category=${config.category}&lang=${config.lang}&country=${config.country}&max=${config.max}&apikey=${apikey}`;
  const response = await axios.get(url);
  let articles=response.data.articles;
  let documents = [];
  for (let art of articles) {
    documents.push({
      'title': art.title,
      'desc': art.description,
      'content': art.content,
      'publishedAt': new Date(art.publishedAt),
      'url': art.url,
      'image': art.image,
      'source': art.source.name
    });
  }
  return documents
}

async function getConfiguration(email) {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection = db.collection('config');
  const config = await collection.findOne({ email });
  await client.close();
  return config;
}

app.get('/api/gnews', async (req, res) => {
  const email = req.query.email;

  if (!email) {
    res.status(400).json({ status: 'error', message: 'Email is required' });
    return;
  }

  try {
    const config = await getConfiguration(email);

    if (!config) {
      res.status(404).json({ status: 'error', message: 'User not found' });
      return;
    }

    const articles = await fetchNews(config);
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ status: 'error', message: 'Failed to fetch news' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
