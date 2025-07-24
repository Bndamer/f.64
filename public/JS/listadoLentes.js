// MODALES
function abrirModal(id, lenteId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (lenteId !== null) modal.dataset.lenteId = lenteId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevaLente');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarLente").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarLente");
  const idLente = modal.dataset.lenteId;

  const formData = new FormData();
  formData.append("modeloLentes", document.getElementById("edit-modelo").value);
  formData.append("tipoLentes", document.getElementById("edit-tipo").value);
  formData.append("aperturaMinLentes", document.getElementById("edit-aperturaMin").value);
  formData.append("aperturaMaxLentes", document.getElementById("edit-aperturaMax").value);
  formData.append("distanciaFocalLentes", document.getElementById("edit-distanciaFocal").value);
  formData.append("marca_id", document.getElementById("edit-marca").value);
  formData.append("precioLentes", document.getElementById("edit-precio").value);
  formData.append("descripcionLentes", document.getElementById("edit-descripcion").value);

  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenLentes", imagen);

  fetch(`http://localhost:3000/lentes/${idLente}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarLente");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar el lente.");
    });
});

// CONFIRMAR ELIMINACIÓN
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idLente = modal.dataset.lenteId;

  fetch(`http://localhost:3000/lentes/${idLente}`, {
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

// MOSTRAR LISTA DE LENTES
fetch("http://localhost:3000/lentes")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".lente-lista");
    const template = document.getElementById("template-lente");

    data.forEach(lente => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = lente.idLentes;
      clone.querySelector(".modelo").textContent = lente.modeloLentes;
      clone.querySelector(".tipo").textContent = lente.tipoLentes;
      clone.querySelector(".aperturaMin").textContent = lente.aperturaMinLentes;
      clone.querySelector(".aperturaMax").textContent = lente.aperturaMaxLentes;
      clone.querySelector(".distanciaFocal").textContent = lente.distanciaFocalLentes;
      clone.querySelector(".marca").textContent = lente.marca_id;
      clone.querySelector(".precio").textContent = `$${lente.precioLentes}`;
      clone.querySelector(".descripcion").textContent = lente.descripcionLentes;
      clone.querySelector(".thumb").src = `/images/lentes/${lente.imagenLentes}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = lente.idLentes;
      btnDelete.dataset.id = lente.idLentes;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarLente', lente.idLentes);

        fetch(`http://localhost:3000/lentes/${lente.idLentes}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-modelo").value = data.modeloLentes;
            document.getElementById("edit-tipo").value = data.tipoLentes;
            document.getElementById("edit-aperturaMin").value = data.aperturaMinLentes;
            document.getElementById("edit-aperturaMax").value = data.aperturaMaxLentes;
            document.getElementById("edit-distanciaFocal").value = data.distanciaFocalLentes;
            document.getElementById("edit-marca").value = data.marca_id;
            document.getElementById("edit-precio").value = data.precioLentes;
            document.getElementById("edit-descripcion").value = data.descripcionLentes;
          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', lente.idLentes);
      });

      contenedor.appendChild(clone);
    });
  });

// NUEVO LENTE
document.getElementById("formNuevaLente").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("modeloLentes", document.getElementById("nuevo-modelo").value);
  formData.append("tipoLentes", document.getElementById("nuevo-tipo").value);
  formData.append("aperturaMinLentes", document.getElementById("nuevo-aperturaMin").value);
  formData.append("aperturaMaxLentes", document.getElementById("nuevo-aperturaMax").value);
  formData.append("distanciaFocalLentes", document.getElementById("nuevo-distanciaFocal").value);
  formData.append("marca_id", document.getElementById("nuevo-marca").value);
  formData.append("precioLentes", document.getElementById("nuevo-precio").value);
  formData.append("descripcionLentes", document.getElementById("nuevo-descripcion").value);

  const imagen = document.getElementById("nuevo-img").files[0];
  if (imagen) formData.append("imagenLentes", imagen);

  fetch("http://localhost:3000/lentes", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevaLente");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar el lente.");
    });
});
