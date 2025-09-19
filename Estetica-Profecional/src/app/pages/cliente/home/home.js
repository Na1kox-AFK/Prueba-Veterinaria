// Función del botón "Agenda tu hora"
function agendar() {
  alert('Aquí podrías redirigir al formulario de reservas.');
}

// Ejemplo de datos de servicios (si en el futuro los quieres renderizar dinámicamente)
const servicios = [
  { titulo: 'Peluquería', descripcion: 'Cortes, coloración y peinados con estilo.' },
  { titulo: 'Masoterapia', descripcion: 'Masajes relajantes y terapéuticos para tu bienestar.' },
  { titulo: 'Uñas', descripcion: 'Manicure, pedicure y diseños modernos.' },
  { titulo: 'Cuidados Faciales', descripcion: 'Tratamientos faciales para una piel saludable y radiante.' }
];

document.addEventListener('DOMContentLoaded', () => {
  console.log('Home cargado correctamente');
  // Aquí puedes pintar los servicios dinámicamente si quieres
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

  document.body.appendChild(serviciosContainer);
});
