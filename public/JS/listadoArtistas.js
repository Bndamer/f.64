// MODALES
function abrirModal(id, artistaId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (artistaId !== null) modal.dataset.artistaId = artistaId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevoArtista');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarArtista").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarArtista");
  const idArtista = modal.dataset.artistaId;

  const formData = new FormData();
  formData.append("nombreCompleto", document.getElementById("edit-nombre").value);
  formData.append("nacionalidad", document.getElementById("edit-nacionalidad").value);
  formData.append("anioNacimiento", document.getElementById("edit-anioNacimiento").value);
  formData.append("anioFallecimiento", document.getElementById("edit-anioFallecimiento").value);
  formData.append("estiloFotografico", document.getElementById("edit-estilo").value);
  formData.append("biografia", document.getElementById("edit-biografia").value);

  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenFotografo", imagen);

  fetch(`http://localhost:3000/fotografos/${idArtista}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarArtista");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar la artista.");
    });
});

// CONFIRMAR ELIMINACIÓN
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idArtista = modal.dataset.artistaId;

  fetch(`http://localhost:3000/fotografos/${idArtista}`, {
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

// MOSTRAR LISTA DE FOTOGRAFOS
fetch("http://localhost:3000/fotografos")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".artista-lista");
    const template = document.getElementById("template-artista");

    data.forEach(artista => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = artista.idFotografo;
      clone.querySelector(".nombre").textContent = artista.nombreCompleto;
      clone.querySelector(".nacionalidad").textContent = artista.nacionalidad;
      clone.querySelector(".anioNacimiento").textContent = artista.anioNacimiento;
      clone.querySelector(".anioFallecimiento").textContent = artista.anioFallecimiento;
      clone.querySelector(".estilo").textContent = artista.estiloFotografico;
      clone.querySelector(".biografia").textContent = artista.biografia;
      clone.querySelector(".thumb").src = `/images/fotografos/${artista.imagenFotografo}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = artista.idFotografo;
      btnDelete.dataset.id = artista.idFotografo;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarArtista', artista.idFotografo);

        fetch(`http://localhost:3000/fotografos/${artista.idFotografo}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-nombre").value = data.nombreCompleto;
            document.getElementById("edit-nacionalidad").value = data.nacionalidad;
            document.getElementById("edit-anioNacimiento").value = data.anioNacimiento;
            document.getElementById("edit-anioFallecimiento").value = data.anioFallecimiento;
            document.getElementById("edit-estilo").value = data.estiloFotografico;
            document.getElementById("edit-biografia").value = data.biografia;
          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', artista.idFotografo);
      });

      contenedor.appendChild(clone);
    });
  });

// NUEVO artista
document.getElementById("formNuevoArtista").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombreCompleto", document.getElementById("nuevo-artista").value);
  formData.append("nacionalidad", document.getElementById("nuevo-nacionalidad").value);
  formData.append("anioNacimiento", document.getElementById("nuevo-anioNacimiento").value);
  formData.append("anioFallecimiento", document.getElementById("nuevo-anioFallecimiento").value);
  formData.append("estiloFotografico", document.getElementById("nuevo-estilo").value);
  formData.append("biografia", document.getElementById("nuevo-biografia").value);

  const imagen = document.getElementById("nuevo-img").files[0];
  if (imagen) formData.append("imagenFotografo", imagen);

  fetch("http://localhost:3000/fotografos", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevoArtista");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar el artista.");
    });
});