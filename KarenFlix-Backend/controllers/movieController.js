
const movieModel = require("../models/movieModel");

async function getMovies(req, res) {
  try {
    const movies = await movieModel.getAllMovies();
    res.json(movies);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener películas" });
  }
}

async function getMovie(req, res) {
  try {
    const movie = await movieModel.getMovieById(req.params.id);
    if (!movie) return res.status(404).json({ error: "Película no encontrada" });
    res.json(movie);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener película" });
  }
}

async function createMovie(req, res) {
  try {
    const result = await movieModel.createMovie(req.body);
    res.status(201).json({ message: "Película creada", id: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: "Error al crear película" });
  }
}

async function updateMovie(req, res) {
  try {
    const result = await movieModel.updateMovie(req.params.id, req.body);
    if (result.matchedCount === 0) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json({ message: "Película actualizada" });
  } catch (err) {
    res.status(500).json({ error: "Error al actualizar película" });
  }
}

async function deleteMovie(req, res) {
  try {
    const result = await movieModel.deleteMovie(req.params.id);
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Película no encontrada" });
    }
    res.json({ message: "Película eliminada" });
  } catch (err) {
    res.status(500).json({ error: "Error al eliminar película" });
  }
}

module.exports = { getMovies, getMovie, createMovie, updateMovie, deleteMovie };
