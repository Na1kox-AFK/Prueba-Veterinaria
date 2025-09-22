document.addEventListener("DOMContentLoaded", () => {
  const clientes = [
    { nombre: "Ana Pérez", servicio: "Limpieza Facial", fecha: "2025-09-25", hora: "15:00", estado: "pendiente" },
    { nombre: "Carlos Gómez", servicio: "Masaje Relajante", fecha: "2025-09-26", hora: "11:30", estado: "confirmado" },
    { nombre: "María López", servicio: "Tratamiento Capilar", fecha: "2025-09-27", hora: "09:00", estado: "pendiente" },
    { nombre: "Javier Soto", servicio: "Depilación", fecha: "2025-09-28", hora: "17:15", estado: "cancelado" }
  ];

  const tbody = document.querySelector("#clientesTable tbody");

  function renderClientes() {
    tbody.innerHTML = "";
    clientes.forEach((c, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${c.nombre}</td>
        <td>${c.servicio}</td>
        <td>${c.fecha}</td>
        <td>${c.hora}</td>
        <td><span class="estado ${c.estado}">${c.estado}</span></td>
        <td>
          <div class="acciones-btn">
            <button class="btn-confirmar">Confirmar</button>
            <button class="btn-cancelar">Cancelar</button>
          </div>
        </td>
      `;
      
      // Acciones
      const btnConfirmar = row.querySelector(".btn-confirmar");
      const btnCancelar = row.querySelector(".btn-cancelar");

      btnConfirmar.addEventListener("click", () => {
        clientes[index].estado = "confirmado";
        renderClientes();
      });

      btnCancelar.addEventListener("click", () => {
        clientes[index].estado = "cancelado";
        renderClientes();
      });

      tbody.appendChild(row);
    });
  }

  renderClientes();
});
