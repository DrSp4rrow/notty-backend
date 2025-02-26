const pool = require("../../db");

const User = {
  // Crear un nuevo usuario
  createUser: async (username, email, password) => {
    const result = await pool.query(
      "INSERT INTO usuarios (username, email, password) VALUES ($1, $2, $3) RETURNING id",
      [username, email, password]
    );
    return result.rows[0].id;
  },

  // Obtener un usuario por nombre de usuario
  getUserByUsername: async (username) => {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE username = $1",
      [username]
    );
    return result.rows[0];
  },
  // Obtener el rol de un usuario por su username
  getRoleByUsername: async (username) => {
    const result = await pool.query(
      `SELECT roles.nombre
     FROM roles
     JOIN usuarios_roles ON roles.id = usuarios_roles.rol_id
     JOIN usuarios ON usuarios.id = usuarios_roles.usuario_id
     WHERE usuarios.username = $1`, // Usamos username en lugar de userId
      [username]
    );

    // Si hay un resultado, devuelve el nombre del rol, si no, retorna null
    return result.rows.length > 0 ? result.rows[0].nombre : null;
  },
};

module.exports = User;
