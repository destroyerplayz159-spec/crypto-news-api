const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_KEY = "915c12b98c98c5eeca707360f18d50f86ab895f5";

app.get("/crypto-news", async (req, res) => {
  const filter = req.query.filter ?? "trending";
  try {
    const response = await axios.get(
      `https://cryptopanic.com/api/v1/posts/?auth_token=${API_KEY}&filter=${filter}`
    );
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch news", details: err.message });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});
