const { MongoClient } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
const dbName = process.env.MONGO_DB;

let db;

const connectDB = async () => {
  if (db) return db; // Evitar múltiples conexiones

  try {
    const client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    console.log(`✅ Conectado a MongoDB: ${dbName}`);
    return db;
  } catch (err) {
    console.error("❌ Error al conectar con MongoDB:", err.message);
    process.exit(1); // Detener servidor si falla
  }
};

module.exports = connectDB;