// MODALES
function abrirModal(id, marcaId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (marcaId !== null) modal.dataset.marcaId = marcaId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevoMarca');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarMarca").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarMarca");
  const idMarca = modal.dataset.marcaId;

  const body = {
    nombreMarcas: document.getElementById("edit-nombre").value,
    paisOrigenMarcas: document.getElementById("edit-pais").value,
    anioFundacionMarcas: document.getElementById("edit-anoFundacion").value
  };

  fetch(`http://localhost:3000/marcas/${idMarca}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarMarca");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar la marca.");
    });
});

// CONFIRMAR ELIMINACIÓN (evento único)
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idMarca = modal.dataset.marcaId;

  fetch(`http://localhost:3000/marcas/${idMarca}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al eliminar");
      cerrarModal("modalConfirmarEliminacion");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo eliminar la marca.");
    });
});

// MOSTRAR LISTA
fetch("http://localhost:3000/marcas")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".marca-lista");
    const template = document.getElementById("template-marca");

    data.forEach(marca => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = marca.idMarcas;
      clone.querySelector(".nombre").textContent = marca.nombreMarcas;
      clone.querySelector(".pais-origen").textContent = marca.paisOrigenMarcas;
      clone.querySelector(".ano-fundacion").textContent = marca.anioFundacionMarcas;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = marca.idMarcas;
      btnDelete.dataset.id = marca.idMarcas;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarMarca', marca.idMarcas);

        fetch(`http://localhost:3000/marcas/${marca.idMarcas}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-nombre").value = data.nombreMarcas;
            document.getElementById("edit-pais").value = data.paisOrigenMarcas;
            document.getElementById("edit-anoFundacion").value = data.anioFundacionMarcas;
          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', marca.idMarcas);
      });

      contenedor.appendChild(clone);
    });
  });

// NUEVO INGRESO
document.getElementById("formNuevoMarca").addEventListener("submit", function (e) {
  e.preventDefault();

  const body = {
    nombreMarcas: document.getElementById("nuevo-nombre").value,
    paisOrigenMarcas: document.getElementById("nuevo-pais").value,
    anioFundacionMarcas: document.getElementById("nuevo-anoFundacion").value
  };

  fetch("http://localhost:3000/marcas", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevoMarca");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar la marca.");
    });
});
