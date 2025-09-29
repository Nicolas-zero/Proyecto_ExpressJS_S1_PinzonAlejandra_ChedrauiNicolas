
const express = require("express");
const router = express.Router();
const Category = require("../models/categoryModel");
const Movie = require("../models/movieModel");

// Obtener todas las categorías
router.get("/", async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.json(categories);
  } catch (error) {
    console.error("❌ Error al obtener categorías:", error);
    res.status(500).json({ error: "Error al obtener categorías" });
  }
});

// Obtener una categoría por ID
router.get("/:id", async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(category);
  } catch (error) {
    console.error("❌ Error al obtener categoría:", error);
    res.status(500).json({ error: "Error al obtener categoría" });
  }
});

// Crear categoría
router.post("/", async (req, res) => {
  try {
    const result = await Category.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error("❌ Error al crear categoría:", error);
    res.status(500).json({ error: "Error al crear categoría" });
  }
});

// Actualizar categoría
router.put("/:id", async (req, res) => {
  try {
    const result = await Category.update(req.params.id, req.body);
    res.json(result);
  } catch (error) {
    console.error("❌ Error al actualizar categoría:", error);
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
});

// Eliminar categoría
router.delete("/:id", async (req, res) => {
  try {
    const result = await Category.remove(req.params.id);
    res.json(result);
  } catch (error) {
    console.error("❌ Error al eliminar categoría:", error);
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
});

// Obtener 5 películas aleatorias por categoría
router.get("/movies-by-category/all", async (req, res) => {
  try {
    const categories = await Category.findAll();
    const result = [];

    for (let cat of categories) {
      const movies = await Movie.getRandomMoviesByCategory(cat._id, 5);
      result.push({ category: cat.name, movies });
    }

    res.json(result);
  } catch (error) {
    console.error("❌ Error cargando películas por categoría:", error);
    res.status(500).json({ error: "Error al cargar películas por categoría" });
  }
});

module.exports = router;
