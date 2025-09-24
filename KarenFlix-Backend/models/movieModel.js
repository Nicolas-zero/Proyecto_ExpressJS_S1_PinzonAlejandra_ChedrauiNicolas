const { getDB } = require("../config/db");

const collection = "movies";

async function getAllMovies() {
  const db = getDB();
  return await db.collection(collection).find().toArray();
}

async function getMovieById(id) {
  const db = getDB();
  const { ObjectId } = require("mongodb");
  return await db.collection(collection).findOne({ _id: new ObjectId(id) });
}

async function createMovie(movie) {
  const db = getDB();
  return await db.collection(collection).insertOne(movie);
}

async function updateMovie(id, movie) {
  const db = getDB();
  const { ObjectId } = require("mongodb");
  return await db
    .collection(collection)
    .updateOne({ _id: new ObjectId(id) }, { $set: movie });
}

async function deleteMovie(id) {
  const db = getDB();
  const { ObjectId } = require("mongodb");
  return await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

module.exports = {
  getAllMovies,
  getMovieById,
  createMovie,
  updateMovie,
  deleteMovie,
};