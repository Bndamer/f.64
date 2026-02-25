// MODALES
function abrirModal(id, accesorioId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (accesorioId !== null) modal.dataset.accesorioId = accesorioId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevoAccesorio');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarAccesorio").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarAccesorio");
  const idAccesorio = modal.dataset.accesorioId;

  const formData = new FormData();
  formData.append("nombreAccesorios", document.getElementById("edit-nombre").value);
  formData.append("descripcionAccesorios", document.getElementById("edit-descripcion").value);
  formData.append("tipoAccesorios", document.getElementById("edit-tipo").value);
  formData.append("precioAccesorios", document.getElementById("edit-precio").value);
  formData.append("fk_marcas", document.getElementById("edit-marca").value);
  
  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenAccesorios", imagen);

  fetch(`http://localhost:3000/accesorios/${idAccesorio}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarAccesorio");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar el accesorio.");
    });
});

// CONFIRMAR ELIMINACIÓN (evento único)
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idAccesorio = modal.dataset.accesorioId;

  fetch(`http://localhost:3000/accesorios/${idAccesorio}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al eliminar");
      cerrarModal("modalConfirmarEliminacion");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo eliminar la cámara.");
    });
});

// MOSTRAR LISTA
fetch("http://localhost:3000/accesorios")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".accesorio-lista");
    const template = document.getElementById("template-accesorio");

    data.forEach(accesorio => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = accesorio.idAccesorios;
      clone.querySelector(".nombre").textContent = accesorio.nombreAccesorios;
      clone.querySelector(".descripcion").textContent = accesorio.descripcionAccesorios;
      clone.querySelector(".tipo").textContent = accesorio.tipoAccesorios;
      clone.querySelector(".precio").textContent = `$${accesorio.precioAccesorios}`;
      clone.querySelector(".marca").textContent = accesorio.fk_marcas;
      clone.querySelector(".thumb").src = `/images/accesorios/${accesorio.imagenAccesorios}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = accesorio.idAccesorios;
      btnDelete.dataset.id = accesorio.idAccesorio;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarAccesorio', accesorio.idAccesorios);

        fetch(`http://localhost:3000/accesorios/${accesorio.idAccesorios}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-nombre").value = data.nombreAccesorios;
            document.getElementById("edit-descripcion").value = data.descripcionAccesorios;
            document.getElementById("edit-tipo").value = data.tipoAccesorios;
            document.getElementById("edit-precio").value = data.precioAccesorios;
            document.getElementById("edit-marca").value = data.fk_marcas;
            document.getElementById("edit-precio").value = data.precioAccesorios;
          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', accesorio.idAccesorios);
      });

      contenedor.appendChild(clone);
    });
  });
//NUEVO INGRESO
  document.getElementById("formNuevoAccesorio").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombreAccesorios", document.getElementById("nuevo-nombre").value);
  formData.append("descripcionAccesorios", document.getElementById("nuevo-descripcion").value);
  formData.append("tipoAccesorios", document.getElementById("nuevo-tipo").value);
  formData.append("precioAccesorios", document.getElementById("nuevo-precio").value);
  formData.append("fk_marcas", document.getElementById("nuevo-marca").value);
  

  const imagen = document.getElementById("nuevo-img").files[0];
  if (imagen) formData.append("imagenAccesorios", imagen);

  fetch("http://localhost:3000/accesorios", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevoAccesorio");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar el accesorio.");
    });
});