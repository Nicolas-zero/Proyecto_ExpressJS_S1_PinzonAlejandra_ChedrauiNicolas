const jwt = require("jsonwebtoken");

const JWT_SECRET = "supersecreto"; // ⚠️ pásalo a tu archivo .env en producción

function authMiddleware(req, res, next) {
  const authHeader = req.headers["authorization"];

  // Verificar si viene en formato "Bearer <token>"
  if (!authHeader) {
    return res.status(401).json({ error: "Acceso denegado. Token requerido" });
  }

  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Token inválido o ausente" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Guarda los datos del usuario en la request
    next();
  } catch (err) {
    return res.status(403).json({ error: "Token inválido o expirado" });
  }
}

module.exports = authMiddleware;