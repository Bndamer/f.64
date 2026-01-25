// MODALES
function abrirModal(id, resenaId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (resenaId !== null)
    { modal.dataset.resenaId = resenaId;}

  // IMPORTANTE: Retornamos el Promise.all para poder encadenar el .then() después
  return Promise.all([
    cargarOpcionesSelect("lentes", "edit-lentes"),
    cargarOpcionesSelect("accesorios", "edit-accesorios"),
    cargarOpcionesSelect("camaras", "edit-camaras")
  ]);
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}


function cargarOpcionesSelect(endpoint, selectId) {
  return fetch(`http://localhost:3000/${endpoint}/id-nombre`)
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById(selectId);
      select.innerHTML = '<option value="">Seleccione una opción</option>';
      data.forEach(item => {
        const option = document.createElement("option");
        option.value = item[`id${capitalize(endpoint)}`];
        option.textContent = item[`nombre${capitalize(endpoint)}`] || item[`modelo${capitalize(endpoint)}`];
        select.appendChild(option);
      });
    })
    .catch(err => {
      console.error(`Error cargando ${endpoint}:`, err);
    });
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}



// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarResena").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarResena");
  const idResena = modal.dataset.resenaId;

  if (!idResena) {
        alert("Error: No se encontró el ID de la reseña.");
        return;
    }

  const formData = new FormData();

  formData.append("comentarioResenas", document.getElementById("edit-comentario").value);
  formData.append("fechaComentarioResenas", document.getElementById("edit-fecha").value);

  const lente = document.getElementById("edit-lentes").value;
  const accesorio = document.getElementById("edit-accesorios").value;
  const camara = document.getElementById("edit-camaras").value;

  // Agregá solo si el usuario seleccionó alguno
  if (lente) formData.append("fkLentes", lente);
  if (accesorio) formData.append("fkAccesorios", accesorio);
  if (camara) formData.append("fkCamaras", camara);

  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenResenas", imagen);

  // Adentro del submit, antes del fetch:
console.log("ID de reseña a enviar:", idResena);
for (let pair of formData.entries()) {
    console.log(pair[0] + ': ' + pair[1]); 
}

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
      alert("No se pudo eliminar la reseña.");
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
      clone.querySelector(".fecha").textContent = resena.fechaComentarioResenas.split('T')[0];
      clone.querySelector(".lentes").textContent = resena.modeloLentes;
      clone.querySelector(".accesorios").textContent = resena.nombreAccesorios;
      clone.querySelector(".camaras").textContent = resena.modeloCamaras;
      clone.querySelector(".thumb").src = `/images/resenas/${resena.imagenResenas}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = resena.idResenas;
      btnDelete.dataset.id = resena.idResenas;


// Función para seleccionar una opción buscando por su TEXTO (el nombre de la cámara)
function seleccionarPorTexto(selectId, textoBusqueda) {
  const select = document.getElementById(selectId);
  const opciones = select.options;

  for (let i = 0; i < opciones.length; i++) {
    if (opciones[i].textContent === textoBusqueda) {
      select.selectedIndex = i;
      break;
    }
  }
}


/////////evento editar////////

    btnUpload.addEventListener("click", () => {
  // Abre el modal y espera a que los selects se llenen
  abrirModal('modalEditarResena', resena.idResenas)
    .then(() => {
      // 2. Ahora que los selects TIENEN las opciones, pedimos la reseña
      return fetch(`http://localhost:3000/resenas/${resena.idResenas}`);
    })
    .then(res => res.json())
    .then(data => {

      // Llena los campos
      document.getElementById("edit-autor").value = data.fkUsuarioResenas;
      document.getElementById("edit-comentario").value = data.comentarioResenas;

      // La fecha debe estar en formato YYYY-MM-DD para el input date
      if (data.fechaComentarioResenas) {
        document.getElementById("edit-fecha").value = data.fechaComentarioResenas.split('T')[0];
      }

     seleccionarPorTexto("edit-lentes", data.fkLentes);
     seleccionarPorTexto("edit-accesorios", data.fkAccesorios);
     seleccionarPorTexto("edit-camaras", data.fkCamaras);
    })
    .catch(err => console.error("Error al poblar el modal:", err));
});

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', resena.idResenas);
      });

      contenedor.appendChild(clone);
    });
  });