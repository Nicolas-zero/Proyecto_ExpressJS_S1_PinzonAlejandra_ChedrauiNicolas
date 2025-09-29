
const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Importar modelos para la nueva ruta
const Movie = require("../models/movieModel");
const Category = require("../models/categoryModel");

// Rutas CRUD
router.get("/", categoryController.getAllCategories);       // Obtener todas
router.get("/:id", categoryController.getCategoryById);     // Obtener por ID
router.post("/", categoryController.createCategory);        // Crear
router.put("/:id", categoryController.updateCategory);      // Actualizar
router.delete("/:id", categoryController.deleteCategory);   // Eliminar

//  Nueva ruta: obtener 5 películas aleatorias por categoría
router.get("/movies-by-category", async (req, res) => {
  try {
    const categories = await Category.find();
    const result = [];

    for (let cat of categories) {
      const movies = await Movie.aggregate([
        { $match: { categoryId: cat._id } },
        { $sample: { size: 5 } }  // ← 5 aleatorias
      ]);

      result.push({
        category: cat.name,
        movies
      });
    }

    res.json(result);
  } catch (error) {
    console.error("Error cargando películas por categoría:", error);
    res.status(500).json({ error: "Error al cargar películas por categoría" });
  }
});

module.exports = router;
