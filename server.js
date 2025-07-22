const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config(); // Only if using .env file

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// ✅ Root route to avoid "Cannot GET /"
app.get('/', (req, res) => {
  res.send('✅ Crypto News Proxy is running.');
});

// ✅ Proxy route to CryptoPanic API
app.get('/crypto-news', async (req, res) => {
  const { filter = 'breaking' } = req.query;

  const apiKey = process.env.CRYPTOPANIC_API_KEY || 'YOUR_API_KEY_HERE';
  const url = `https://cryptopanic.com/api/v1/posts/?auth_token=${apiKey}&filter=${filter.toLowerCase()}&public=true`;

  try {
    const response = await axios.get(url);
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching news:', error.message);
    res.status(500).json({ error: 'Failed to fetch crypto news' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
