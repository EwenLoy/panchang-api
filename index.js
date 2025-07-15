const express = require("express");
const cors = require("cors");
const Panchang = require("mhah-panchang");

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Разрешаем CORS

// Корневой маршрут (не обязателен)
app.get("/", (req, res) => {
  res.send("✅ Panchang API работает. Используй /panchang");
});

// Основной маршрут /panchang
app.get("/panchang", async (req, res) => {
  try {
    const {
      date = "2025-07-15",
      latitude = "28.6139",
      longitude = "77.2090",
    } = req.query;

    const panchang = new Panchang({
      date: new Date(date),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    const result = await panchang.calculate();
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("✅ Server started on port " + port);
});
