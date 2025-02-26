document.addEventListener("DOMContentLoaded", () => {
  //DASHBOARD
  const getprofile = document.getElementById("cookie");
  const dataDisplay = document.getElementById("data-display");
  const logoutButton = document.getElementById("logout"); // Nuevo botón de logout

  // Inicializa el contenido del div como vacío
  dataDisplay.textContent = "";
  //DASHBOARD
  getprofile.addEventListener("click", async () => {
    try {
      // Realizar la solicitud GET al backend para leer la cookie
      const response = await fetch("/api/show-cookie", {
        method: "GET",
        credentials: "include", // Esto asegura que las cookies se envíen con la solicitud
      });

      // Verificar si la respuesta fue exitosa
      if (!response.ok) {
        throw new Error("No se pudo obtener la cookie");
      }

      // Opcional: Puedes procesar la respuesta aquí si es necesario
      const data = await response.json();
      // Extrae los datos que necesitas
      const username = data.username;
      const rol = data.rol;
      const email = data.email;

      // Crea el string con la información
      const dataString = `Username: ${username}, Rol: ${rol}, Email: ${email}`;
      // Actualiza el contenido del div con la información
      dataDisplay.textContent = dataString;

      console.log("Respuesta del backend:", data); // Ver el mensaje del backend (opcional)
    } catch (error) {
      console.error("Error:", error);
      alert("No se pudo obtener la cookie del backend");
    }
  });

  logoutButton.addEventListener("click", async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST", // Importante: debe ser POST
        headers: {
          "Content-Type": "application/json", // Aunque no envíes datos, es buena práctica incluirlo
        },
        credentials: "include", // Para enviar las cookies
      });
      console.log(response);

      if (!response.ok) {
        throw new Error("No se pudo cerrar sesión");
      }

      // Redirigir a la página de inicio de sesión o recargar la página actual
      window.location.href = "/"; // O window.location.reload();
      // Opcional: Mostrar un mensaje de éxito
      console.log("Sesión cerrada correctamente");
      dataDisplay.textContent = ""; // Limpia el display
      alert("Sesión cerrada correctamente");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      alert("Error al cerrar sesión");
    }
  });
});
