const Category = require("../models/categoryModel");
const { getDb } = require("../config/db");
const { ObjectId } = require("mongodb");

// ... aquí tus otros exports

// 🚀 Obtener películas agrupadas por categoría (4 filas de 5 películas aleatorias)
exports.getMoviesByCategory = async (req, res) => {
  try {
    const db = getDb();

    // Traer todas las categorías
    const categories = await Category.findAll();

    // Para cada categoría, traemos 5 películas aleatorias
    const result = await Promise.all(
      categories.map(async (cat) => {
        const movies = await db
          .collection("movies")
          .aggregate([
            { $match: { categoryId: cat._id.toString() } }, // Filtrar por categoría
            { $sample: { size: 5 } }, // Tomar 5 aleatorias
          ])
          .toArray();

        return {
          category: cat.name,
          movies,
        };
      })
    );

    res.json(result);
  } catch (error) {
    console.error("❌ Error en getMoviesByCategory:", error);
    res.status(500).json({ message: "Error al obtener películas por categoría", error });
  }
};
