const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares base
app.use(express.json());
app.use(cors());

// Importar rutas
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");

// Usar rutas
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);

// Ruta de prueba
app.get("/", (req, res) => {
  res.json({ message: "Karenflix funcionando 🚀" });
});

module.exports = app;
