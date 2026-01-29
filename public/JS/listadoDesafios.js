// MODALES
function abrirModal(id, desafioId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (desafioId !== null) modal.dataset.desafioId = desafioId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevoDesafio');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarDesafio").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarDesafio");
  const idDesafio = modal.dataset.desafioId;

  const formData = new FormData();
  formData.append("nombreDesafio", document.getElementById("edit-nombre").value);
  formData.append("consignaDesafio", document.getElementById("edit-consigna").value);
  formData.append("nivelDificultad", document.getElementById("edit-dificultad").value);
  formData.append("tiempoVigenciaDias", document.getElementById("edit-vigencia").value);
  formData.append("premioDesafio", document.getElementById("edit-premio").value);

  fetch(`http://localhost:3000/desafios/${idDesafio}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      cerrarModal("modalEditarDesafio");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar el desafío.");
    });
});

// CONFIRMAR ELIMINACIÓN (evento único)
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idDesafio = modal.dataset.desafioId;

  fetch(`http://localhost:3000/desafios/${idDesafio}`, {
    method: "DELETE"
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al eliminar");
      cerrarModal("modalConfirmarEliminacion");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo eliminar el desafío.");
    });
});

// MOSTRAR LISTA
fetch("http://localhost:3000/desafios")
  .then(res => res.json())
  .then(data => {
    const contenedor = document.querySelector(".desafio-lista");
    const template = document.getElementById("template-desafio");

    data.forEach(desafio => {
      const clone = template.content.cloneNode(true);

      clone.querySelector(".id").textContent = desafio.idDesafio;
      clone.querySelector(".nombre").textContent = desafio.nombreDesafio;
      clone.querySelector(".consigna").textContent = desafio.consignaDesafio;
      clone.querySelector(".dificultad").textContent = desafio.nivelDificultad;
      clone.querySelector(".vigencia").textContent = desafio.tiempoVigenciaDias+(" días");
      clone.querySelector(".premio").textContent = desafio.premioDesafio;
      clone.querySelector(".fechaCreacion").textContent = desafio.fechaCreacion.split('T')[0];

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = desafio.idDesafio;
      btnDelete.dataset.id = desafio.idDesafio;

      btnUpload.addEventListener("click", () => {
        abrirModal('modalEditarDesafio', desafio.idDesafio);

        fetch(`http://localhost:3000/desafios/${desafio.idDesafio}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-nombre").value = data.nombreDesafio;
            document.getElementById("edit-consigna").value = data.consignaDesafio;
            document.getElementById("edit-dificultad").value = data.nivelDificultad;
            document.getElementById("edit-vigencia").value = data.tiempoVigenciaDias;
            document.getElementById("edit-premio").value = data.premioDesafio;

          });
      });

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', desafio.idDesafio);
      });

      contenedor.appendChild(clone);
    });
  });
//NUEVO INGRESO
  document.getElementById("formNuevoDesafio").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();
  formData.append("nombreDesafio", document.getElementById("nuevo-nombre").value);
  formData.append("consignaDesafio", document.getElementById("nuevo-consigna").value);
  formData.append("dificultadDesafio", document.getElementById("nuevo-dificultad").value);
  formData.append("vigenciaDesafio", document.getElementById("nuevo-vigencia").value);
  formData.append("premioDesafio", document.getElementById("nuevo-premio").value);

  fetch("http://localhost:3000/desafios", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      cerrarModal("modalNuevoDesafio");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar el desafío.");
    });
});