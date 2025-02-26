const express = require("express");
const router = express.Router();
const authController = require("../controllers/auth.controller");

// Ruta para registrar un usuario
router.post("/register", authController.registerUser);

// Ruta para iniciar sesión
router.post("/login", authController.loginUser);

module.exports = router;
