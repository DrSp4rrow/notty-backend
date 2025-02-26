const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const getDataByCookie = async (req, res) => {
  const token = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token found" }); // Si no hay token, responder con error
  }

  try {
    //console.log(token);
    const decoded = jwt.verify(token.token, process.env.JWT_SECRET); // Verificar el token
    return res.json({
      username: decoded.username,
      email: decoded.email,
      rol: decoded.role,
      perfil: decoded.profile,
    });
    //res.status(200).json({ token, decoded }); // Enviar el token y su contenido decodificado
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" }); // Si el token no es válido, devolver error
  }
};

const logoutProfile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({ error: "No token found" });
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET);
    // Establecer la cookie con el token
    res.cookie("token", token, {
      httpOnly: true, // No accesible desde JavaScript
      secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
      maxAge: 0, // 720 horas en milisegundos
      sameSite: "Lax", // Lax o Strict dependiendo de tu necesidad
    });
    res.status(200).json("logout realizado");
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" }); // Si el token no es válido, devolver error
  }
};

module.exports = {
  getDataByCookie,
  logoutProfile,
};
