// MODALES
function abrirModal(id, resenaId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (resenaId !== null) modal.dataset.resenaId = resenaId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevaResena');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarResena").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarResena");
  const idResena = modal.dataset.resenaId;

  const formData = new FormData();
  formData.append("nombreResena", document.getElementById("edit-nombre").value);
  formData.append("descripcionResena", document.getElementById("edit-descripcion").value);

  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenResena", imagen);

  fetch(`http://localhost:3000/resenas/${idResena}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarResena");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar la reseña.");
    });
});

// CONFIRMAR ELIMINACIÓN
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idResena = modal.dataset.resenaId;

  fetch(`http://localhost:3000/resenas/${idResena}`, {
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

// MOSTRAR LISTA DE reseñas
fetch("http://localhost:3000/resenas")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".resena-contenedor");
    const template = document.getElementById("template-resena");

    data.forEach(resena => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = resena.idResenas;
      clone.querySelector(".nombre").textContent = resena.nombreCompletoUsuario;
      clone.querySelector(".comentario").textContent = resena.comentarioResenas;
      clone.querySelector(".fecha").textContent = resena.fechaComentarioResenas;
      clone.querySelector(".lentes").textContent = resena.modeloLentes;
      clone.querySelector(".accesorios").textContent = resena.nombreAccesorios;
      clone.querySelector(".camaras").textContent = resena.modeloCamaras;
      clone.querySelector(".thumb").src = `/images/resenas/${resena.imagenResenas}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = resena.idResenas;
      btnDelete.dataset.id = resena.idResenas;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarResena', resena.idResenas);

        fetch(`http://localhost:3000/resenas/${resena.idResenas}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-nombre").value = data.nombreResenas;
            document.getElementById("edit-comentario").value = data.comentarioResenas;
            document.getElementById("edit-fecha").value = data.fechaComentarioResenas;
            document.getElementById("edit-lentes").value = data.fkLentes;
            document.getElementById("edit-accesorios").value = data.fkAccesorios;
            document.getElementById("edit-camaras").value = data.fkCamaras;
          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', resena.idResenas);
      });

      contenedor.appendChild(clone);
    });
  });

// NUEVO reseña
document.getElementById("formNuevaResena").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombreResena", document.getElementById("nuevo-nombre").value);
  formData.append("comentarioResena", document.getElementById("nuevo-comentario").value);
  formData.append("fechaComentarioResenas", document.getElementById("nuevo-fecha").value);
  formData.append("fkLentes", document.getElementById("nuevo-lentes").value);
  formData.append("fkAccesorios", document.getElementById("nuevo-accesorios").value);
  formData.append("fkCamaras", document.getElementById("nuevo-camaras").value);

  const imagen = document.getElementById("nuevo-img").files[0];
  if (imagen) formData.append("imagenResena", imagen);

  fetch("http://localhost:3000/resenas", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevaResena");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar la reseña.");
    });
});