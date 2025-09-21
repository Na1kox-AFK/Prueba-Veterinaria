document.addEventListener('DOMContentLoaded', () => {
    const servicioForm = document.getElementById('servicioForm');
    const servicioTablaBody = document.querySelector('#servicioTabla tbody');
    const nombreInput = document.getElementById('nombre');
    const descripcionInput = document.getElementById('descripcion');
    const precioInput = document.getElementById('precio');
    const servicioIdInput = document.getElementById('servicioId');

    let servicios = [];
    let idCounter = 1;

    // Función para renderizar la tabla con los servicios
    const renderizarServicios = () => {
        servicioTablaBody.innerHTML = '';
        servicios.forEach(servicio => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${servicio.nombre}</td>
                <td>${servicio.descripcion}</td>
                <td>$${servicio.precio.toFixed(2)}</td>
                <td>
                    <button class="btn btn-edit" onclick="editarServicio(${servicio.id})">Editar</button>
                    <button class="btn btn-delete" onclick="eliminarServicio(${servicio.id})">Eliminar</button>
                </td>
            `;
            servicioTablaBody.appendChild(row);
        });
    };

    // Función para manejar el envío del formulario (Crear/Actualizar)
    servicioForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const id = servicioIdInput.value;
        const nombre = nombreInput.value.trim();
        const descripcion = descripcionInput.value.trim();
        const precio = parseFloat(precioInput.value);

        if (nombre && descripcion && !isNaN(precio)) {
            if (id) {
                // Actualizar servicio (U)
                const servicioIndex = servicios.findIndex(s => s.id === parseInt(id));
                if (servicioIndex !== -1) {
                    servicios[servicioIndex] = { ...servicios[servicioIndex], nombre, descripcion, precio };
                }
            } else {
                // Crear nuevo servicio (C)
                const nuevoServicio = {
                    id: idCounter++,
                    nombre,
                    descripcion,
                    precio
                };
                servicios.push(nuevoServicio);
            }
            // Limpiar formulario y renderizar la tabla
            servicioForm.reset();
            servicioIdInput.value = '';
            renderizarServicios();
        } else {
            alert('Por favor, completa todos los campos.');
        }
    });

    // Funciones globales para que sean accesibles desde el HTML
    window.editarServicio = (id) => {
        const servicioAEditar = servicios.find(s => s.id === id);
        if (servicioAEditar) {
            nombreInput.value = servicioAEditar.nombre;
            descripcionInput.value = servicioAEditar.descripcion;
            precioInput.value = servicioAEditar.precio;
            servicioIdInput.value = servicioAEditar.id;
        }
    };

    window.eliminarServicio = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este servicio?')) {
            servicios = servicios.filter(s => s.id !== id);
            renderizarServicios();
        }
    };
    
    // Inicialización con 4 servicios de ejemplo
    servicios = [
        { id: idCounter++, nombre: 'Corte de Cabello', descripcion: 'Incluye lavado y secado.', precio: 13000.00 },
        { id: idCounter++, nombre: 'Manicura SPA', descripcion: 'Tratamiento completo para manos y uñas.', precio: 14990.00 },
        { id: idCounter++, nombre: 'Facial Hidratante', descripcion: 'Limpieza profunda e hidratación.', precio: 29990.00 },
        { id: idCounter++, nombre: 'Masaje Relajante', descripcion: 'Masaje de 60 minutos para liberar tensión.', precio: 24990.00 }
    ];

    renderizarServicios();
});