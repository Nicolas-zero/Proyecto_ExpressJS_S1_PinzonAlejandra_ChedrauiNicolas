const express = require("express");
const { body } = require("express-validator");
const { registerUser } = require("../controllers/userController");

const router = express.Router();

/**
 * @route   POST /api/v1/users/register
 * @desc    Registrar un nuevo usuario
 * @access  Público
 */
router.post(
  "/register",
  [
    body("username")
      .notEmpty()
      .withMessage("El nombre de usuario es obligatorio")
      .isLength({ min: 3 })
      .withMessage("El nombre debe tener al menos 3 caracteres"),
    body("email")
      .isEmail()
      .withMessage("Debe ser un email válido"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("La contraseña debe tener al menos 6 caracteres"),
  ],
  registerUser
);

module.exports = router;
