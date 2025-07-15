const express = require("express");
const cors = require("cors");
const getPanchang = require("mhah-panchang"); // 👈 Переименовал для ясности

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Разрешаем CORS

// Корневой маршрут
app.get("/", (req, res) => {
  res.send("✅ Panchang API работает. Используй /panchang");
});

// Основной маршрут
app.get("/panchang", async (req, res) => {
  try {
    const {
      date = "2025-07-15",
      latitude = "28.6139",
      longitude = "77.2090",
    } = req.query;

    // ✅ Вызов без new, напрямую
    const result = await getPanchang({
      date: new Date(date),
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
    });

    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(port, () => {
  console.log("✅ Server started on port " + port);
});
