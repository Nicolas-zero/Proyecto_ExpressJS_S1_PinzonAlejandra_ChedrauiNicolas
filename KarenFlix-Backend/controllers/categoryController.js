const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db");

// Obtener todas las categorías
exports.getAllCategories = async (req, res) => {
  try {
    const db = getDb();
    const categories = await db.collection("categories").find().toArray();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categorías" });
  }
};

// Obtener categoría por ID
exports.getCategoryById = async (req, res) => {
  try {
    const db = getDb();
    const category = await db.collection("categories").findOne({ _id: new ObjectId(req.params.id) });
    if (!category) return res.status(404).json({ error: "Categoría no encontrada" });
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener categoría" });
  }
};

// Crear categoría
exports.createCategory = async (req, res) => {
  try {
    const db = getDb();
    const { name, description } = req.body;

    const newCategory = { name, description };

    const result = await db.collection("categories").insertOne(newCategory);
    res.status(201).json({ message: "Categoría creada", id: result.insertedId });
  } catch (error) {
    res.status(500).json({ error: "Error al crear categoría" });
  }
};

// Actualizar categoría
exports.updateCategory = async (req, res) => {
  try {
    const db = getDb();
    const { name, description } = req.body;

    const result = await db.collection("categories").updateOne(
      { _id: new ObjectId(req.params.id) },
      { $set: { name, description } }
    );

    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría actualizada" });
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar categoría" });
  }
};

// Eliminar categoría
exports.deleteCategory = async (req, res) => {
  try {
    const db = getDb();
    const result = await db.collection("categories").deleteOne({ _id: new ObjectId(req.params.id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Categoría no encontrada" });
    }

    res.json({ message: "Categoría eliminada" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar categoría" });
  }
};
