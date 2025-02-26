const pool = require("../../db");

const Role = {
  // Obtener todos los roles
  getRoles: async () => {
    const result = await pool.query("SELECT * FROM roles");
    return result.rows;
  },

  // Obtener un rol por su nombre
  getRoleByName: async (roleName) => {
    const result = await pool.query("SELECT * FROM roles WHERE nombre = $1", [
      roleName,
    ]);
    return result.rows[0];
  },

  // Asignar un rol a un usuario
  assignRoleToUser: async (userId, roleId) => {
    const result = await pool.query(
      "INSERT INTO usuarios_roles (usuario_id, rol_id) VALUES ($1, $2) RETURNING *",
      [userId, roleId]
    );
    return result.rows[0];
  },
};

module.exports = Role;
