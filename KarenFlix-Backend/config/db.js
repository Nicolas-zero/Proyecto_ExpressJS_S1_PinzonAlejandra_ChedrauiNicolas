// config/db.js
const { MongoClient } = require("mongodb");

let db;

/**
 * Conecta a MongoDB y guarda la instancia global
 * @param {string} uri - cadena de conexión de MongoDB
 */
async function connectDB(uri) {
  if (db) return db; // Si ya está conectada, devuelve la misma instancia

  const client = await MongoClient.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // 👇 Nombre de tu base de datos (ajústalo si es otro)
  db = client.db("karenflix");

  console.log("✅ Conectado a MongoDB (config/db.js)");
  return db;
}

/**
 * Devuelve la instancia actual de la BD
 */
function getDB() {
  if (!db) {
    throw new Error("❌ No hay conexión a la BD. Llama a connectDB primero.");
  }
  return db;
}

module.exports = { connectDB, getDB };
