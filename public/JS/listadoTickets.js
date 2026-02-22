const API_TICKETS = "http://localhost:3000/tickets";
const API_ACTUALIZACIONES = "http://localhost:3000/updates";

/* =========================
   MODALES
========================= */

function abrirModal(id, ticketId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (ticketId !== null) modal.dataset.ticketId = ticketId;
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  // limpiar textarea
  const textarea = modal.querySelector(".nuevaActualizacion");
  if (textarea) {
    textarea.value = "";
  }
  modal.classList.add("hidden");
}
/* =========================
   CARGAR LISTA DE TICKETS
========================= */

document.addEventListener("DOMContentLoaded", () => {
  cargarTickets();

  document
    .querySelector("#modalDetalleTicket .cerrarModalBtn")
    .addEventListener("click", () => {
      cerrarModal("modalDetalleTicket");
    });
     // botón agregar
  document
    .querySelector(".agregarActualizacionBtn")
    .addEventListener("click", agregarActualizacion);
});

function cargarTickets() {
  fetch(API_TICKETS)
    .then((res) => res.json())
    .then((data) => {
      const contenedor = document.querySelector(".contenedorTickets");
      const template = document.getElementById("template-ticket");
      contenedor.innerHTML = "";

      data.forEach((ticket) => {
        const clone = template.content.cloneNode(true);

        clone.querySelector(".id").textContent = ticket.idTicket;
        clone.querySelector(".categoria").textContent = ticket.categoriaTicket;
        clone.querySelector(".titulo").textContent = ticket.tituloTicket;
        clone.querySelector(".usuario").textContent = ticket.creadorAlias;
        clone.querySelector(".admin").textContent =
          ticket.adminAlias || "Sin asignar";

        clone.querySelector(".respuestas").textContent =
          ticket.cantidadRespuestas || 0;

        clone.querySelector(".fecha").textContent = new Date(
          ticket.datetimeCreacionTicket,
        ).toLocaleString();

        const estadoDiv = clone.querySelector(".estado");
        estadoDiv.textContent = ticket.estadoTicket;
        estadoDiv.classList.add("estado-" + ticket.estadoTicket);

        /* BOTONES */

        clone.querySelector(".ver").addEventListener("click", () => {
          verDetalle(ticket.idTicket);
        });

        const btnTomar = clone.querySelector(".tomar");

        if (ticket.idAdminAsignado) {
          btnTomar.disabled = true;
          btnTomar.textContent = "ASIGNADO";
          btnTomar.classList.add("btn-asignado");
        } else {
          btnTomar.addEventListener("click", () => {
            tomarTicket(ticket.idTicket);
          });
        }

        clone.querySelector(".cerrar").addEventListener("click", () => {
          cerrarTicket(ticket.idTicket);
        });

        contenedor.appendChild(clone);
      });
    })
    .catch((err) => console.error("Error cargando tickets:", err));
}
function verDetalle(idTicket) {
  abrirModal("modalDetalleTicket", idTicket);

  fetch(`${API_TICKETS}/${idTicket}`)
    .then((res) => res.json())
    .then((ticket) => {
      document.querySelector(".detalleTitulo").textContent =
        ticket.tituloTicket;
      document.querySelector(".detalleCategoria").textContent =
        ticket.categoriaTicket;
      document.querySelector(".detalleDescripcion").textContent =
        ticket.descripcionTicket;
      document.querySelector(".detalleFecha").textContent =
        ticket.datetimeCreacionTicket;
      document.querySelector(".detalleUsuario").textContent =
        ticket.creadorAlias;
      document.querySelector(".detalleEstado").textContent =
        ticket.estadoTicket;
      document.querySelector(".detalleAdmin").textContent =
        ticket.adminAlias || "Sin asignar";

      const img = document.querySelector(".detalleEvidencia");
      const link = document.getElementById("linkEvidencia");

      if (ticket.evidenciaTicket) {
        const ruta = `/images/tickets/${ticket.evidenciaTicket}`;

        img.src = ruta;
        link.href = ruta;

        img.style.display = "block";
      } else {
        img.style.display = "none";
      }

      cargarActualizaciones(idTicket);

      const textarea = document.querySelector(".nuevaActualizacion");
      const boton = document.querySelector(".agregarActualizacionBtn");
      const userId = localStorage.getItem("userId");

const autorizado =
  userId == ticket.idAdminAsignado ||
  userId == ticket.idUsuarioCreador; // asegurate que este dato venga en el GET

if (!autorizado) {
  textarea.disabled = true;
  boton.disabled = true;
  textarea.placeholder =
    "Solo el creador del ticket o el admin asignado pueden responder.";
} else {
  textarea.disabled = false;
  boton.disabled = false;
}
    });
}


function cargarActualizaciones(idTicket) {
  fetch(`${API_ACTUALIZACIONES}/${idTicket}`)
    .then((res) => res.json())
    .then((actualizaciones) => {
      const contenedor = document.querySelector(".contenedorActualizaciones");
      contenedor.innerHTML = "";

      actualizaciones.forEach((act) => {
        const div = document.createElement("div");
        div.classList.add("actualizacion-item");

        div.innerHTML = `
          <strong>${act.aliasUsuario}</strong>
          <small>${new Date(act.fechaHoraActualizacion).toLocaleString()}</small>
          <p>${act.mensajeActualizacion}</p>
          <hr>
        `;

        contenedor.appendChild(div);
      });
    });
}

function tomarTicket(idTicket) {
  const userId = localStorage.getItem("userId");

  fetch(`${API_TICKETS}/${idTicket}/tomar`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ idAdminAsignado: userId }),
  })
    .then((res) => {
      if (!res.ok) throw new Error();
      cargarTickets();
    })
    .catch(() => alert("No se pudo tomar el ticket."));
}

function cerrarTicket(idTicket) {
  fetch(`${API_TICKETS}/${idTicket}/cerrar`, {
    method: "PUT",
  })
    .then((res) => {
      if (!res.ok) throw new Error();
      cargarTickets();
    })
    .catch(() => alert("No se pudo cerrar el ticket."));
}

function agregarActualizacion() {

  const modal = document.getElementById("modalDetalleTicket");
  const idTicket = modal.dataset.ticketId;

  const textarea = document.querySelector(".nuevaActualizacion");
  const mensaje = textarea.value.trim();

  const userId = localStorage.getItem("userId");

  if (!mensaje) {
    alert("La actualización no puede estar vacía.");
    return;
  }

  fetch(API_ACTUALIZACIONES, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fkTicket: idTicket,
      fkUsuarioAutor: userId,
      mensajeActualizacion: mensaje
    }),
  })
    .then((res) => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(() => {
      textarea.value = "";              // limpiar campo
      cargarActualizaciones(idTicket);  // refrescar historial
      cargarTickets();                  // refrescar contador respuestas
    })
    .catch(() => {
      alert("No se pudo agregar la actualización.");
    });
}
