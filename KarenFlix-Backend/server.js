const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Bienvenido a Karenflix API 🚀");
});

// Arrancar servidor (sin DB por ahora)
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});