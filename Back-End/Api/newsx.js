const express = require('express');
const axios = require('axios');
const { MongoClient } = require('mongodb');

const apikey = '27169cc5e1a249c8980b9431f3ff70ad';
const sources = ['bbc-news','abc-news','cnn','al-jazeera-english',
'ars-technica','ary-news','associated-press','axios',
'bloomberg','business-insider','espn','entertainment-weekly'];
const uri = "mongodb+srv://puthethu:NqzjnxD7Zb8GIp63@cluster0.p27ikdg.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'news';
const app = express();

// Function to fetch and store news articles
async function fetchAndStoreNews() {
  try{
    const client= await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    const collectionName = 'articles';
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const url = `http://newsapi.org/v2/top-headlines?sources=${sources}&apiKey=${apikey}`;
        const response = await axios.get(url);
        let articles = response.data.articles;
        let documents = [];
        for (let art of articles) {
          documents.push({
            'title': art.title,
            'desc': art.description,
            'content': art.content,
            'publishedAt': new Date(art.publishedAt),
            'url': art.url,
            'image': art.urlToImage,
            'source': art.source.name
          });
        }
        //Insert
        await collection.insertMany(documents);
        console.log('News articles inserted successfully');
        await client.close()
        console.log('Disconnected from MongoDB');
      } catch (err) {
        console.error(err);
      }
    }

    // Fetch articles every 5 minutes (300000 ms)
    setInterval(fetchAndStoreNews, 300000);

    // Define the API endpoint to retrieve news articles data
  app.get('/api/newsx', (req, res) => {
  MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(client => {
      const db = client.db(dbName);
      const collection = db.collection('articles');
      collection.find().toArray()
        .then((data) => {
          res.json(data);
          client.close();
        })
        .catch((err) => console.error(err));
    })
    .catch((err) => console.error(err));
});

  app.listen(3020, () => {
    console.log('Server started on port 3020');
    // Fetch articles when the server starts
    fetchAndStoreNews();
  });
