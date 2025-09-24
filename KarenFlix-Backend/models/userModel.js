const { getDB } = require("../config/db"); // importa la conexión a Mongo
const { ObjectId } = require("mongodb");

//Obtener colección
const getCollection = () => {
  const db = getDB();
  return db.collection("users");
};

//Crear usuario
async function createUser(userData) {
  const collection = getCollection();
  const result = await collection.insertOne({
    ...userData,
    createdAt: new Date(),
  });
  return result;
}

//Buscar usuario por email
async function findUserByEmail(email) {
  const collection = getCollection();
  return await collection.findOne({ email });
}

//Buscar usuario por ID
async function findUserById(id) {
  const collection = getCollection();
  return await collection.findOne({ _id: new ObjectId(id) });
}

module.exports = {
  createUser,
  findUserByEmail,
  findUserById,
};
