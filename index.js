const express = require("express");
const cors = require("cors");
const getPanchang = require("mhah-panchang"); // ← Это функция

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());

app.get("/", (req, res) => {
  res.send("✅ Panchang API работает. Используй /panchang");
});

app.get("/panchang", async (req, res) => {
  const {
    date = "2025-07-15",
    latitude = "28.6139",
    longitude = "77.2090",
  } = req.query;

  try {
    const result = await getPanchang({
      date: new Date(date),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log(`✅ Server started on port ${port}`);
});
