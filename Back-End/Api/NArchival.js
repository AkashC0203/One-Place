const { MongoClient } = require('mongodb');
const express = require('express');
const app = express();

const uri = "mongodb+srv://puthethu:NqzjnxD7Zb8GIp63@cluster0.p27ikdg.mongodb.net/?retryWrites=true&w=majority";
const dbName = 'news';
const collectionName = 'articles';

app.use(express.urlencoded(true));

async function findArticlesByKeyword(keyword) {
  const client = await MongoClient.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
  const db = client.db(dbName);
  const collection = db.collection(collectionName);

  const regex = new RegExp(keyword, 'i');
  const articles = await collection.find({
    $or: [
      { title: regex },
      { desc: regex },
      { content: regex }
    ]
  }).toArray();

  await client.close();
  return articles;
}

app.get('/api/getsearcharticles', async (req, res) => {
  const keyword = req.query.keyword;

  if (!keyword) {
    return res.status(400).json({ message: 'Keyword is required' });
  }

  try {
    const articles = await findArticlesByKeyword(keyword);
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error fetching articles' });
  }
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
