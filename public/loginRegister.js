document.addEventListener("DOMContentLoaded", () => {
  const container = document.querySelector(".container");
  const registerBtn = document.querySelector(".register-btn");
  const loginBtn = document.querySelector(".login-btn");
  const registro = document.getElementById("btn-register");
  const login = document.getElementById("btn-login");

  registerBtn.addEventListener("click", () => {
    document.getElementById("login-password").value = "";
    document.getElementById("login-username").value = "";

    container.classList.add("active");
  });

  loginBtn.addEventListener("click", () => {
    document.getElementById("register-username").value = "";
    document.getElementById("register-email").value = "";
    document.getElementById("register-password").value = "";
    container.classList.remove("active");
  });

  registro.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("register-username").value;
    const email = document.getElementById("register-email").value;
    const password = document.getElementById("register-password").value;

    if (!username || !email || !password) {
      return alert("Todos los campos son obligatorios.");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("¡Registro exitoso! Ahora puedes iniciar sesión.");
        document.getElementById("register-username").value = "";
        document.getElementById("register-email").value = "";
        document.getElementById("register-password").value = "";
        container.classList.remove("active");
      } else {
        alert(data.error || "Ocurrió un error en el registro.");
      }
    } catch (error) {
      console.error("Error en el registro:", error);
      alert("Ocurrió un error. Por favor, intenta de nuevo.");
    }
  });

  // Login de usuario
  login.addEventListener("click", async (e) => {
    e.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (!username || !password) {
      return alert("Por favor, completa todos los campos.");
    }

    try {
      const response = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        alert(`¡Bienvenido, ${data.user.username}!`);
        window.location.href = "/dashboard";
      } else {
        alert(data.error || "Credenciales inválidas");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Ocurrió un error. Por favor, intenta de nuevo.");
    }
  });
});
