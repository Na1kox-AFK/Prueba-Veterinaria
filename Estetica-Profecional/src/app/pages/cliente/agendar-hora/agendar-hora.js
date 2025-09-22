// === Agendar Hora ===
document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("agendarForm");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("nombre").value.trim();
    const email = document.getElementById("email").value.trim();
    const telefono = document.getElementById("telefono").value.trim();
    const servicio = document.getElementById("servicio").value;
    const fecha = document.getElementById("fecha").value;
    const hora = document.getElementById("hora").value;

    // Validaciones simples
    if (!nombre || !email || !telefono || !servicio || !fecha || !hora) {
      alert("⚠️ Por favor completa todos los campos.");
      return;
    }

    // Validación básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      alert("⚠️ Ingresa un correo electrónico válido.");
      return;
    }

    // Validación de teléfono (ejemplo Chile)
    const phoneRegex = /^\+569\d{8}$/;
    if (!phoneRegex.test(telefono)) {
      alert("⚠️ El teléfono debe tener el formato +569XXXXXXXX.");
      return;
    }
    
    // Resetear formulario y redirigir
    form.reset();
    setTimeout(() => {
      window.location.href = "../home/home.html";
    }, 1500); // espera 1.5s antes de redirigir
    // Mensaje con los datos


    alert(
      `✅ Reserva confirmada\n\n` +
      `👤 Nombre: ${nombre}\n` +
      `📧 Correo: ${email}\n` +
      `📞 Teléfono: ${telefono}\n` +
      `💆‍♀️ Servicio: ${servicio}\n` +
      `📅 Fecha: ${fecha}\n` +
      `⏰ Hora: ${hora}\n\n` +
      `Pronto nos pondremos en contacto contigo.`
    );


    form.reset();
    window.location.href = "../home/home.html";
  });
});
