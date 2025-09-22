// ===== home.js =====


// Función del botón "Agenda tu hora"
function agendar() {
  alert('Aquí podrías redirigir al formulario de reservas.');
  window.location.href = "../agendar-hora/agendar-hora.html";
}

// === Todo se ejecuta al cargar el DOM ===
document.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));

  // ===== 1. Cambiar texto y link del menú según usuario logueado =====
  const dynamicLink = document.getElementById("dynamicLink");
  if (currentUser) {
    // Usuario logueado
    dynamicLink.textContent = currentUser.name || "Usuario"; // Muestra nombre si existe
    dynamicLink.href = "../usuario/usuario.html"; // página del usuario

    // (Opcional) Agregar un botón de logout al menú si no existe
    const menuLinks = document.querySelector('.menu-links');
    if (menuLinks && !document.getElementById('logoutBtn')) {
      const logoutBtn = document.createElement('a');
      logoutBtn.href = "#";
      logoutBtn.textContent = "Cerrar Sesión";
      logoutBtn.id = "logoutBtn";
      logoutBtn.style.color = "#d6336c";
      logoutBtn.style.fontWeight = "600";
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        localStorage.removeItem("currentUser"); // borra sesión
        // vuelve a mostrar iniciar sesión
        dynamicLink.textContent = "Iniciar Sesión";
        dynamicLink.href = "../inicio-sesion/inicio-sesion.html";
        // quitar botón logout
        logoutBtn.remove();
        alert("Sesión cerrada correctamente");
      });
      menuLinks.appendChild(logoutBtn);
    }

  } else {
    // Usuario NO logueado
    dynamicLink.textContent = "Iniciar Sesión";
    dynamicLink.href = "../inicio-sesion/inicio-sesion.html";

    // Si existe botón logout (por recarga), lo quitamos
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) logoutBtn.remove();
  }

  // ===== 2. Renderizar dinámicamente los servicios =====
  const serviciosContainer = document.createElement('div');
  serviciosContainer.classList.add('servicios-list');

  servicios.forEach(servicio => {
    const servicioItem = document.createElement('div');
    servicioItem.classList.add('servicio-item');
    servicioItem.innerHTML = `
      <h3>${servicio.titulo}</h3>
      <p>${servicio.descripcion}</p>
    `;
    serviciosContainer.appendChild(servicioItem);
  });

  // Inserta la lista en el body o en un contenedor específico
  // (Si tienes <section id="servicios"></section> en el HTML, mejor usa eso)
  document.body.appendChild(serviciosContainer);

  console.log('Home cargado correctamente');
});
