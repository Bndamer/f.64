if (!localStorage.getItem('token')) {
    window.location.href = '/login.html';
} //protocolo que protege que haya acceso a backoffice.hmtl Eso evita que un usuario
//  sin login entre manualmente escribiendo la URL del backoffice.

const formConsulta = document.getElementById("formConsulta");
const mensaje = document.getElementById("mensaje");

// Abrir modal y cerrar modal
const btnHacerConsulta = document.getElementById("btnHacerConsulta");
const btnVerConsultas = document.getElementById("btnVerConsultas");
const formContainer = document.getElementById("formConsultaContainer");
const cerrarFormulario = document.getElementById("cerrarFormulario");

btnHacerConsulta.addEventListener("click", () => {
    formContainer.style.display = "flex";
});

cerrarFormulario.addEventListener("click", () => {
    formContainer.style.display = "none";
});

window.addEventListener("click", (e) => {
    if (e.target === formContainer) {
        formContainer.style.display = "none";
    }
});

// --- Submit del formulario ---
formConsulta.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(formConsulta);

    // Tomamos el id del usuario desde localStorage
    const idUsuarioCreador = localStorage.getItem("userId");

    if (!idUsuarioCreador) {
        alert("No se encontró el ID del usuario en localStorage.");
        return;
    }

    fetch(`http://localhost:3000/tickets/${idUsuarioCreador}`, {
        method: "POST",
        body: formData
    })
    .then(function(response) {
        return response.json();
    })
    .then(function(data) {
        if (data.idTicket) {
            alert(`Consulta creada correctamente!`);
            formConsulta.reset();
            formContainer.style.display = "none"; // cerrar modal
        } else if (data.error) {
            alert(`Error: ${data.error}`);
        } else {
            alert("Ocurrió un error desconocido.");
        }
    })
    .catch(function(error) {
        alert(`Error al enviar la consulta: ${error.message}`);
    });
});