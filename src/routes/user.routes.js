const express = require("express");
const router = express.Router();
const userController = require("../controllers/user.controller");

// Ruta para asignar un rol a un usuario
router.post("/assign-role", userController.assignRole);

module.exports = router;
