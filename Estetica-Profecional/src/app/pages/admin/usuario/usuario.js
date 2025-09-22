function obtenerLS(key, defaultValue = null) {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : defaultValue;
}
function guardarLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// ====== CARGAR DATOS DEL USUARIO ======
function cargarUsuario() {
  const usuarioActivo = obtenerLS("usuarioActivo");

  if (!usuarioActivo) {
    window.location.href = "../inicio-sesion/inicio-sesion.html";
    return;
  }

  document.getElementById("nombre").value = usuarioActivo.nombre;
  document.getElementById("email").value = usuarioActivo.email;
  document.getElementById("password").value = usuarioActivo.password;
}

// ====== MOSTRAR / OCULTAR CONTRASEÑA ======
document.addEventListener("DOMContentLoaded", () => {
  const togglePass = document.getElementById("togglePassword");
  const passInput = document.getElementById("password");

  togglePass.addEventListener("click", () => {
    const type = passInput.type === "password" ? "text" : "password";
    passInput.type = type;
    togglePass.textContent = type === "password" ? "👁️ Mostrar" : "🙈 Ocultar";
  });
});

// ====== GUARDAR CAMBIOS ======
document.getElementById("usuarioForm").addEventListener("submit", (e) => {
  e.preventDefault();

  if (!confirm("⚠️ Estas seguro de realizar los cambios?")) {
    return; // Cancelado
  }

  let usuarios = obtenerLS("usuarios", []);
  let usuarioActivo = obtenerLS("usuarioActivo");

  const nuevoNombre = document.getElementById("nombre").value.trim();
  const nuevaPassword = document.getElementById("password").value.trim();

  // Actualizar usuario en la lista de usuarios
  usuarios = usuarios.map((u) =>
    u.email === usuarioActivo.email ? { ...u, nombre: nuevoNombre, password: nuevaPassword } : u
  );

  // Actualizar usuarioActivo
  const usuarioActualizado = { ...usuarioActivo, nombre: nuevoNombre, password: nuevaPassword };

  guardarLS("usuarios", usuarios);
  guardarLS("usuarioActivo", usuarioActualizado);

  alert("✅ Cambios guardados con éxito");
  window.location.href = "../home-admin/home-admin.html"; // Redirigir al home admin
});
