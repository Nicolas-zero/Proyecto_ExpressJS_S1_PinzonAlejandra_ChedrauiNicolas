
const { getDB } = require("../config/db");
const { ObjectId } = require("mongodb");

const collection = "categories";

async function findAll() {
  const db = getDB();
  return await db.collection(collection).find().toArray();
}

async function findById(id) {
  const db = getDB();
  return await db.collection(collection).findOne({ _id: new ObjectId(id) });
}

async function create(category) {
  const db = getDB();
  return await db.collection(collection).insertOne(category);
}

async function update(id, data) {
  const db = getDB();
  return await db.collection(collection).updateOne(
    { _id: new ObjectId(id) },
    { $set: data }
  );
}

async function remove(id) {
  const db = getDB();
  return await db.collection(collection).deleteOne({ _id: new ObjectId(id) });
}

module.exports = { findAll, findById, create, update, remove };
