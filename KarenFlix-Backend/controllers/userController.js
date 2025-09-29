const bcrypt = require("bcrypt");
const { validationResult } = require("express-validator");
const { createUser, findUserByEmail } = require("../models/userModel");

// Registro de usuario
async function registerUser(req, res) {
  try {
    // 1. Validaciones del request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { username, email, password } = req.body;

    // 2. Verificar si el email ya existe
    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: "El email ya está registrado" });
    }

    // 3. Hashear la contraseña
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // 4. Crear usuario en la DB
    const newUser = {
      username,
      email,
      password: hashedPassword,
      role: "user", // por defecto
    };

    const result = await createUser(newUser);

    // 5. Responder sin devolver el password
    res.status(201).json({
      msg: "Usuario registrado con éxito",
      user: {
        id: result.insertedId,
        username,
        email,
        role: "user",
      },
    });
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    res.status(500).json({ msg: "Error en el servidor" });
  }
}

module.exports = {
  registerUser,
};
