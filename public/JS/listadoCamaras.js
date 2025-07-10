// MODALES
function abrirModal(id, camaraId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (camaraId !== null) modal.dataset.camaraId = camaraId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevaCamara');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarCamara").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarCamara");
  const idCamara = modal.dataset.camaraId;

  const formData = new FormData();
  formData.append("modeloCamaras", document.getElementById("edit-modelo").value);
  formData.append("tipoCamaras", document.getElementById("edit-tipo").value);
  formData.append("sensorCamaras", document.getElementById("edit-sensor").value);
  formData.append("resolucionCamaras", document.getElementById("edit-resolucion").value);
  formData.append("isoMinCamaras", document.getElementById("edit-isoMin").value);
  formData.append("isoMaxCamaras", document.getElementById("edit-isoMax").value);
  formData.append("marca_id", document.getElementById("edit-marca").value);
  formData.append("precioCamaras", document.getElementById("edit-precio").value);
  
  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenCamaras", imagen);

  fetch(`http://localhost:3000/camaras/${idCamara}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarCamara");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar la cámara.");
    });
});

// CONFIRMAR ELIMINACIÓN (evento único)
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idCamara = modal.dataset.camaraId;

  fetch(`http://localhost:3000/camaras/${idCamara}`, {
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
fetch("http://localhost:3000/camaras")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".camara-lista");
    const template = document.getElementById("template-camara");

    data.forEach(camara => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = camara.idCamaras;
      clone.querySelector(".modelo").textContent = camara.modeloCamaras;
      clone.querySelector(".tipo").textContent = camara.tipoCamaras;
      clone.querySelector(".sensor").textContent = camara.sensorCamaras;
      clone.querySelector(".resolucion").textContent = camara.resolucionCamaras;
      clone.querySelector(".iso").textContent = `${camara.isoMinCamaras} - ${camara.isoMaxCamaras}`;
      clone.querySelector(".marca").textContent = camara.marca_id;
      clone.querySelector(".precio").textContent = `$${camara.precioCamaras}`;
      clone.querySelector(".thumb").src = `/images/camaras/${camara.imagenCamaras}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = camara.idCamaras;
      btnDelete.dataset.id = camara.idCamaras;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarCamara', camara.idCamaras);

        fetch(`http://localhost:3000/camaras/${camara.idCamaras}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-modelo").value = data.modeloCamaras;
            document.getElementById("edit-tipo").value = data.tipoCamaras;
            document.getElementById("edit-sensor").value = data.sensorCamaras;
            document.getElementById("edit-resolucion").value = data.resolucionCamaras;
            document.getElementById("edit-isoMin").value = data.isoMinCamaras;
            document.getElementById("edit-isoMax").value = data.isoMaxCamaras;
            document.getElementById("edit-marca").value = data.marca_id;
            document.getElementById("edit-precio").value = data.precioCamaras;
          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', camara.idCamaras);
      });

      contenedor.appendChild(clone);
    });
  });

  document.getElementById("formNuevaCamara").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("modeloCamaras", document.getElementById("nuevo-modelo").value);
  formData.append("tipoCamaras", document.getElementById("nuevo-tipo").value);
  formData.append("sensorCamaras", document.getElementById("nuevo-sensor").value);
  formData.append("resolucionCamaras", document.getElementById("nuevo-resolucion").value);
  formData.append("isoMinCamaras", document.getElementById("nuevo-isoMin").value);
  formData.append("isoMaxCamaras", document.getElementById("nuevo-isoMax").value);
  formData.append("marca_id", document.getElementById("nuevo-marca").value);
  formData.append("precioCamaras", document.getElementById("nuevo-precio").value);

  const imagen = document.getElementById("nuevo-img").files[0];
  if (imagen) formData.append("imagenCamaras", imagen);

  fetch("http://localhost:3000/camaras", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevaCamara");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar la cámara.");
    });
});