const express = require("express");
const app = express();

// Middlewares base
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Karenflix funcionando 🚀" });
});

module.exports = app;