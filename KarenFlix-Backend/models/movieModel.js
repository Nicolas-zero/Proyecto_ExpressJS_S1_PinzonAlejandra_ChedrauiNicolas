
const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const collection = "movies";

async function getAllMovies() {
  const db = getDB();
  return await db.collection(collection).find().toArray();
}

async function getMovieById(id) {
  const db = getDB();
  return await db.collection(collection).findOne({ _id: new ObjectId(id) });
}

async function createMovie(movie) {
  const db = getDB();
  return await db.collection(collection).insertOne(movie);
}

async function updateMovie(id, movie) {
  const db = getDB();
  return await db
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, { $set: movie });
}

async function deleteMovie(id) {
  const db = getDB();
  return await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

// 👇 Nuevo: obtener N películas aleatorias de una categoría
async function getRandomMoviesByCategory(categoryId, limit = 5) {
  const db = getDB();
  return await db
    .collection(collection)
    .aggregate([
      { $match: { categoryId: categoryId.toString() } },
      { $sample: { size: limit } }
    ])
    .toArray();
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
  getRandomMoviesByCategory
};
