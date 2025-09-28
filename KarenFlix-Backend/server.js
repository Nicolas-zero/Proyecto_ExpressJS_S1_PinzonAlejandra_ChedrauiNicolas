// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const { connectDB } = require("./config/db");

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/karenflix";

// Middleware
app.use(cors());
app.use(express.json());

// Importar rutas
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviews");

// Conectar a la base de datos y levantar servidor
connectDB(MONGO_URI)
  .then(() => {
    console.log("✅ Base de datos conectada");

    // Usar rutas
    app.use("/api/movies", movieRoutes);
    app.use("/api/users", userRoutes);
    app.use("/api/categories", categoryRoutes);
    app.use("/api/reviews", reviewRoutes);

    // Ruta de prueba
    app.get("/", (req, res) => {
      res.send("Bienvenido a Karenflix API 🚀");
    });

    // Iniciar servidor
    app.listen(PORT, () => {
      console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Error conectando a MongoDB:", err.message);
    process.exit(1);
  });
