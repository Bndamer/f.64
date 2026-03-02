if (!localStorage.getItem('token')) {
    window.location.href = '/login.html';
}


const formConsulta = document.getElementById("formConsulta");
const mensaje = document.getElementById("mensaje");
const formContainer = document.getElementById("formConsultaContainer");
const cerrarFormulario = document.getElementById("cerrarFormulario");

const modalConsultasContainer = document.getElementById("modalConsultasContainer");
const cerrarConsultas = document.getElementById("cerrarConsultas");
const consultasList = document.getElementById("consultasList");

const API_TICKETS_USER = "http://localhost:3000/tickets/user";
const API_ACTUALIZACIONES_USER = "http://localhost:3000/updates";

// --- Formularios de creación de ticket ---
document.getElementById("btnHacerConsulta").addEventListener("click", () => {
    formContainer.style.display = "flex";
});

cerrarFormulario.addEventListener("click", () => formContainer.style.display = "none");
window.addEventListener("click", (e) => { if (e.target === formContainer) formContainer.style.display = "none"; });

formConsulta.addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(formConsulta);
    const idUsuarioCreador = localStorage.getItem("userId");
    if (!idUsuarioCreador) return alert("No se encontró el ID del usuario.");

    fetch(`http://localhost:3000/tickets/${idUsuarioCreador}`, { method: "POST", body: formData })
    .then(res => res.json())
    .then(data => {
        if (data.idTicket) {
            alert("Consulta creada correctamente!");
            formConsulta.reset();
            formContainer.style.display = "none";
        } else {
            alert(`Error: ${data.error || "Ocurrió un error desconocido."}`);
        }
    }).catch(err => alert("Error al enviar la consulta: " + err.message));
});

// --- Modal de consultas ---
function abrirModalConsultas() {
    modalConsultasContainer.style.display = "flex";
    cargarMisConsultas();
}

function cerrarModalConsultas() {
    modalConsultasContainer.style.display = "none";
    consultasList.innerHTML = "";
}

cerrarConsultas.addEventListener("click", cerrarModalConsultas);
window.addEventListener("click", (e) => { if (e.target === modalConsultasContainer) cerrarModalConsultas(); });

const btnVerConsultas = document.querySelector("#btnVerConsultas");
if (btnVerConsultas) {
  btnVerConsultas.addEventListener("click", abrirModalConsultas);
}

document.querySelector("#btnVerConsultas").addEventListener("click", abrirModalConsultas);

// --- Cargar tickets y actualizaciones del usuario ---
function cargarMisConsultas() {
    const userId = localStorage.getItem("userId");
    if (!userId) return alert("No se encontró el ID del usuario.");

    fetch(`${API_TICKETS_USER}/${userId}`)
    .then(res => res.json())
    .then(tickets => {
        const template = document.getElementById("templateConsulta");
        consultasList.innerHTML = "";

        if (tickets.length === 0) {
            consultasList.innerHTML = "<p>No tenés consultas.</p>";
            return;
        }

        tickets.forEach(ticket => {
            const clone = template.content.cloneNode(true);

            clone.querySelector(".ticketId").textContent = ticket.idTicket;
            clone.querySelector(".categoria").textContent = ticket.categoriaTicket;
            clone.querySelector(".titulo").textContent = ticket.tituloTicket;
            clone.querySelector(".estado").textContent = ticket.estadoTicket;
            clone.querySelector(".fecha").textContent = new Date(ticket.datetimeCreacionTicket).toLocaleString();

            const contUpdates = clone.querySelector(".contenedorActualizaciones");

            // Traer actualizaciones
            fetch(`${API_ACTUALIZACIONES_USER}/${ticket.idTicket}`)
            .then(res => res.json())
            .then(actualizaciones => {
                actualizaciones.forEach(act => {
                    const div = document.createElement("div");
                    div.classList.add("actualizacion-item");
                    div.innerHTML = `
                        <strong>${act.aliasUsuario}</strong> 
                        <small>${new Date(act.fechaHoraActualizacion).toLocaleString()}</small>
                        <p>${act.mensajeActualizacion}</p>
                    `;
                    contUpdates.appendChild(div);
                });
            });

            // Botón responder
            const btnResponder = clone.querySelector(".responderBtn");
            const inputRespuesta = clone.querySelector(".respuestaInput");

            btnResponder.addEventListener("click", () => {
                const mensaje = inputRespuesta.value.trim();
                if (!mensaje) return alert("La respuesta no puede estar vacía.");

                fetch(API_ACTUALIZACIONES_USER, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fkTicket: ticket.idTicket, fkUsuarioAutor: userId, mensajeActualizacion: mensaje })
                })
                .then(res => { if (!res.ok) throw new Error(); return res.json(); })
                .then(() => {
                    inputRespuesta.value = "";
                    contUpdates.innerHTML = "";
                    // refrescar actualizaciones
                    fetch(`${API_ACTUALIZACIONES_USER}/${ticket.idTicket}`)
                    .then(res => res.json())
                    .then(actualizaciones => {
                        actualizaciones.forEach(act => {
                            const div = document.createElement("div");
                            div.classList.add("actualizacion-item");
                            div.innerHTML = `
                                <strong>${act.aliasUsuario}</strong> 
                                <small>${new Date(act.fechaHoraActualizacion).toLocaleString()}</small>
                                <p>${act.mensajeActualizacion}</p>
                            `;
                            contUpdates.appendChild(div);
                        });
                    });
                }).catch(() => alert("No se pudo enviar la respuesta."));
            });

            consultasList.appendChild(clone);
        });
    })
    .catch(err => console.error("Error al cargar mis consultas:", err));
}