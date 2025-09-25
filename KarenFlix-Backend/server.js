const express = require("express");
const dotenv = require("dotenv");
const { MongoClient } = require("mongodb");

// Cargar variables de entorno
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/karenflix";

// Middleware
app.use(express.json());

// Importar rutas
const movieRoutes = require("./routes/movieRoutes");
const userRoutes = require("./routes/userRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const reviewRoutes = require("./routes/reviews");

// Conexión a la base de datos
MongoClient.connect(MONGO_URI)
  .then((client) => {
    const db = client.db();

    console.log("✅ Conectado a MongoDB");

    // Usar rutas con la BD
    app.use("/api/movies", movieRoutes(db));
    app.use("/api/users", userRoutes(db));
    app.use("/api/categories", categoryRoutes(db));
    app.use("/api/reviews", reviewRoutes(db));

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
