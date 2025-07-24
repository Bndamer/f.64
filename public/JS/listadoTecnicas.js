// MODALES
function abrirModal(id, tecnicaId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (tecnicaId !== null) modal.dataset.tecnicaId = tecnicaId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevaTecnica');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarTecnica").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarTecnica");
  const idTecnica = modal.dataset.tecnicaId;

  const formData = new FormData();
  formData.append("nombreTecnica", document.getElementById("edit-nombre").value);
  formData.append("descripcionTecnica", document.getElementById("edit-descripcion").value);

  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenTecnica", imagen);

  fetch(`http://localhost:3000/tecnicas/${idTecnica}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarTecnica");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar la tecnica.");
    });
});

// CONFIRMAR ELIMINACIÓN
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idTecnica = modal.dataset.tecnicaId;

  fetch(`http://localhost:3000/tecnicas/${idTecnica}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al eliminar");
      cerrarModal("modalConfirmarEliminacion");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo eliminar el lente.");
    });
});

// MOSTRAR LISTA DE TECNICAS
fetch("http://localhost:3000/tecnicas")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".tecnica-lista");
    const template = document.getElementById("template-tecnica");

    data.forEach(tecnica => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = tecnica.idTecnica;
      clone.querySelector(".nombre").textContent = tecnica.nombreTecnica;
      clone.querySelector(".descripcion").textContent = tecnica.descripcionTecnica;
      clone.querySelector(".thumb").src = `/images/tecnicas/${tecnica.imagenTecnica}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = tecnica.idTecnica;
      btnDelete.dataset.id = tecnica.idTecnica;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarTecnica', tecnica.idTecnica);

        fetch(`http://localhost:3000/tecnicas/${tecnica.idTecnica}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-nombre").value = data.nombreTecnica;
            document.getElementById("edit-descripcion").value = data.descripcionTecnica;
          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', tecnica.idTecnica);
      });

      contenedor.appendChild(clone);
    });
  });

// NUEVO LENTE
document.getElementById("formNuevaTecnica").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombreTecnica", document.getElementById("nueva-tecnica").value);
  formData.append("descripcionTecnica", document.getElementById("nueva-descripcion").value);

  const imagen = document.getElementById("nuevo-img").files[0];
  if (imagen) formData.append("imagenTecnica", imagen);

  fetch("http://localhost:3000/tecnicas", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevaTecnica");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar la tecnica.");
    });
});