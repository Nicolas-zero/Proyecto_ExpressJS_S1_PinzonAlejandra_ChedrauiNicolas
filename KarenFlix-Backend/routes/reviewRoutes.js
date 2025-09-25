const express = require("express");
const { ObjectId } = require("mongodb");

const router = express.Router();

module.exports = (db) => {
  const reviewsCollection = db.collection("reviews");
  const moviesCollection = db.collection("movies");

  // ================================
  // Crear una reseña
  // ================================
  router.post("/", async (req, res) => {
    try {
      const { movieId, user, comment, rating } = req.body;

      if (!movieId || !user || !comment || !rating) {
        return res.status(400).json({ error: "Faltan campos obligatorios" });
      }

      // Verificar que la película existe
      const movie = await moviesCollection.findOne({ _id: new ObjectId(movieId) });
      if (!movie) {
        return res.status(404).json({ error: "La película no existe" });
      }

      const newReview = {
        movieId: new ObjectId(movieId),
        user,
        comment,
        rating: Number(rating),
        createdAt: new Date()
      };

      const result = await reviewsCollection.insertOne(newReview);
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: "Error creando la reseña", details: error.message });
    }
  });

  // ================================
  // Listar todas las reseñas
  // ================================
  router.get("/", async (req, res) => {
    try {
      const reviews = await reviewsCollection.find().toArray();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Error listando reseñas", details: error.message });
    }
  });

  // ================================
  // Listar reseñas de una película
  // ================================
  router.get("/movie/:movieId", async (req, res) => {
    try {
      const { movieId } = req.params;
      const reviews = await reviewsCollection.find({ movieId: new ObjectId(movieId) }).toArray();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo reseñas", details: error.message });
    }
  });

  // ================================
  // Obtener reseña por ID
  // ================================
  router.get("/:id", async (req, res) => {
    try {
      const review = await reviewsCollection.findOne({ _id: new ObjectId(req.params.id) });
      if (!review) {
        return res.status(404).json({ error: "Reseña no encontrada" });
      }
      res.json(review);
    } catch (error) {
      res.status(500).json({ error: "Error obteniendo reseña", details: error.message });
    }
  });

  // ================================
  // Actualizar reseña
  // ================================
  router.put("/:id", async (req, res) => {
    try {
      const { user, comment, rating } = req.body;
      const result = await reviewsCollection.updateOne(
        { _id: new ObjectId(req.params.id) },
        { $set: { user, comment, rating: Number(rating) } }
      );

      if (result.matchedCount === 0) {
        return res.status(404).json({ error: "Reseña no encontrada" });
      }

      res.json({ message: "Reseña actualizada" });
    } catch (error) {
      res.status(500).json({ error: "Error actualizando reseña", details: error.message });
    }
  });

  // ================================
  // Eliminar reseña
  // ================================
  router.delete("/:id", async (req, res) => {
    try {
      const result = await reviewsCollection.deleteOne({ _id: new ObjectId(req.params.id) });
      if (result.deletedCount === 0) {
        return res.status(404).json({ error: "Reseña no encontrada" });
      }
      res.json({ message: "Reseña eliminada" });
    } catch (error) {
      res.status(500).json({ error: "Error eliminando reseña", details: error.message });
    }
  });

  return router;
};
