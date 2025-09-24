const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");

// Rutas CRUD
router.get("/", categoryController.getAllCategories);       // Obtener todas
router.get("/:id", categoryController.getCategoryById);     // Obtener por ID
router.post("/", categoryController.createCategory);        // Crear
router.put("/:id", categoryController.updateCategory);      // Actualizar
router.delete("/:id", categoryController.deleteCategory);   // Eliminar

module.exports = router;
