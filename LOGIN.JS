document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.querySelector("#loginForm");
  const API_URL = "http://localhost:3000/api";

  if (!loginForm) {
    console.error("No se encontró el formulario de login");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const emailElement = document.getElementById("email");
    const passwordElement = document.getElementById("password");

    if (!emailElement || !passwordElement) {
      console.error("No se encontraron los campos de email o password");
      alert("Error: No se pudieron encontrar los campos del formulario");
      return;
    }

    const correo = emailElement.value.trim();
    const contraseña = passwordElement.value.trim();

    if (!correo || !contraseña) {
      alert("Por favor, completa todos los campos");
      return;
    }

    try {
      console.log("Enviando datos de login...");

      const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo,
          contraseña,
        }),
      });

      console.log("Respuesta recibida:", response.status);

      if (response.ok) {
        const data = await response.json();
        const nombreUsuario = data.nombre || "Usuario";

        localStorage.setItem("nombreUsuario", nombreUsuario);
        localStorage.setItem("justLoggedIn", "true");

        alert("Usuario ingresado correctamente");
        loginForm.reset();
        window.location.replace("INICIO.HTML");
      } else {
        const errorText = await response.text();
        console.log("Error del servidor:", errorText);
        alert(`Error: ${errorText}`);
        loginForm.reset();
      }
    } catch (error) {
      console.log("Error al hacer login:", error);
      alert("Error de conexión. Verifica que el servidor esté funcionando.");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const abrirModalBtn = document.getElementById("abrirModalRecuperar");
  const cerrarModalBtn = document.getElementById("cerrarModalRecuperar");
  const modal = document.getElementById("modalRecuperar");
  const formRecuperar = document.getElementById("formRecuperar");

  // Abrir modal
  if (abrirModalBtn && modal) {
    abrirModalBtn.onclick = function (e) {
      e.preventDefault();
      modal.style.display = "flex";
    };
  }

  // Cerrar modal
  if (cerrarModalBtn && modal) {
    cerrarModalBtn.onclick = function () {
      modal.style.display = "none";
    };
  }

  window.onclick = function (event) {
    if (modal && event.target === modal) {
      modal.style.display = "none";
    }
  };

  if (formRecuperar) {
    const API_URL = "http://localhost:3000/api";

    formRecuperar.addEventListener("submit", async function (e) {
      e.preventDefault();

      const emailInput = document.getElementById("recuperarCorreo");
      if (!emailInput) {
        console.error("No se encontró el campo de recuperación de correo");
        return;
      }

      const email = emailInput.value.trim();

      if (!email) {
        alert("Por favor, ingresa tu correo electrónico");
        return;
      }

      try {
        const response = await fetch(`${API_URL}/forgot-password`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ correo: email }),
        });

        if (response.ok) {
          alert("Se ha enviado un enlace de recuperación a tu correo.");
          if (modal) modal.style.display = "none";
          this.reset();
        } else {
          const errorText = await response.text();
          alert(`Error: ${errorText}`);
        }
      } catch (error) {
        alert("Error al intentar enviar el correo de recuperación.");
        console.log(error);
      }
    });
  }
});
