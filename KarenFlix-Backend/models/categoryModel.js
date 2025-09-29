const { ObjectId } = require("mongodb");
const { getDb } = require("../config/db"); // función que devuelve la conexión

const Category = {
  // Obtener todas las categorías
  async findAll() {
    const db = getDb();
    return await db.collection("categories").find().toArray();
  },

  // Buscar categoría por ID
  async findById(id) {
    const db = getDb();
    return await db.collection("categories").findOne({ _id: new ObjectId(id) });
  },

  // Crear categoría
  async create(data) {
    const db = getDb();
    const result = await db.collection("categories").insertOne(data);
    return result;
  },

  // Actualizar categoría
  async update(id, data) {
    const db = getDb();
    const result = await db.collection("categories").updateOne(
      { _id: new ObjectId(id) },
      { $set: data }
    );
    return result;
  },

  // Eliminar categoría
  async delete(id) {
    const db = getDb();
    const result = await db.collection("categories").deleteOne({
      _id: new ObjectId(id),
    });
    return result;
  },
};

module.exports = Category;
