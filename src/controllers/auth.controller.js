const bcrypt = require("bcryptjs");
const User = require("../models/user.model");
const Role = require("../models/role.model");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Registrar un nuevo usuario
const registerUser = async (req, res) => {
  const { username, email, password, imagen_perfil } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await User.createUser(
      username,
      email,
      hashedPassword,
      imagen_perfil
    );
    // Obtener el rol "user"
    const role = await Role.getRoleByName("user");
    if (!role) {
      return res.status(404).json({ error: 'Rol "user" no encontrado' });
    }
    // Asignar el rol "user" al nuevo usuario
    await Role.assignRoleToUser(userId, role.id);
    res
      .status(201)
      .json({ userId, message: 'Usuario registrado y rol "user" asignado' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar el usuario" });
  }
};

// Iniciar sesión de usuario
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.getUserByUsername(username);
    const userRole = await User.getRoleByUsername(username);
    console.log(userRole);

    if (!user) {
      return res.status(400).json({ error: "Usuario no encontrado" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: "Contraseña incorrecta" });
    }

    // Generate JWT
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        profile: user.imagen_perfil,
        role: userRole,
      },
      process.env.JWT_SECRET,
      {
        // Replace with a strong secret!
        expiresIn: "720h", // Adjust as needed
      }
    );
    // Establecer la cookie con el token
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      maxAge: 720 * 60 * 60 * 1000, // 720 horas en milisegundos
      sameSite: "Lax", // Lax o Strict dependiendo de tu necesidad
    });

    // Send token and user info
    res.status(200).json({
      message: "Inicio de sesión exitoso",
      user: {
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
