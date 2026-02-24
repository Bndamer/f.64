const userId = localStorage.getItem("userId");


/* =========================
   MODALES
========================= */

function abrirModal(id, ticketId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (ticketId !== null) modal.dataset.ticketId = ticketId;
}

function cerrarModal(id) {
  const modal = document.getElementById(id);
  // limpiar textarea
  const textarea = modal.querySelector(".nuevaActualizacion");
  if (textarea) {
    textarea.value = "";
  }
  modal.classList.add("hidden");
}


///////////////MOSTTRAR GALERIA///////////

fetch(`http://localhost:3000/galeria/usuario/${userId}`)
  .then(res => res.json())
  .then(data => {
    console.log(data);

    const contenedor = document.querySelector(".gridGaleria");
    const template = document.getElementById("cardGaleria");

    contenedor.innerHTML = ""; // limpiar antes de renderizar

    data.forEach(foto => {

      const clone = template.content.cloneNode(true);

      clone.querySelector(".imagenGaleria").src =
        `/images/galeria/${foto.imagenGaleria}`;

      clone.querySelector(".descripcionFoto").textContent =
        foto.descripcionGaleria;

      clone.querySelector(".camaraUsada").textContent =
        `📷 Cámara : ${foto.modeloCamaras || "No especificada"}`;

      clone.querySelector(".lenteUsado").textContent =
        `🔎 Lente : ${foto.modeloLentes || "No especificado"}`;

      clone.querySelector(".tecnicasUsadas").textContent =
        `🎨 Técnicas: ${foto.tecnicas || "No especificado"}`;

      clone.querySelector(".btnLike span").textContent = "❤️ 0";
clone.querySelector(".btnComentarios span").textContent = "💬 0";

      const btnEditarInfo = clone.querySelector(".btnEditarInfo");
      const btnEliminar = clone.querySelector(".btnEliminarFoto");  
      const btnComentarios = clone.querySelector(".btnComentarios");
      const btnPostular = clone.querySelector(".btnPostularFoto");

    

      btnComentarios.addEventListener("click", () => {
        abrirModal("modalComentarios");
      });

      contenedor.appendChild(clone);


      ///evento boton eliminar foto//
btnEliminar.addEventListener("click", () => {
  if (!confirm("¿Seguro que querés eliminar esta foto?")) return;

  fetch(`http://localhost:3000/galeria/${foto.idGaleria}`, {
    method: "DELETE"
  })
  .then(res => res.json())
  .then(data => {
  alert("Foto eliminada correctamente");
  location.reload();
})
  .catch(err => console.error("Error al eliminar:", err));
});



///evento boton editar info//
btnEditarInfo.addEventListener("click", () => {
  abrirModal("modalEditarFoto"); 
  
    cargarDatosEnModal(foto); // función que completa los campos
});
    });
  })
  .catch(err => {
    console.error("Error al cargar galería:", err);
  });



document.addEventListener("DOMContentLoaded", () => {

      // SUBIR
  cargarCamaras("camaraUsadaSelect");
  cargarLentes("lenteUsadoSelect");
  cargarTecnicas("tecnicasUsadasSelect");

  // EDITAR
  cargarCamaras("editCamaraSelect");
  cargarLentes("editLenteSelect");
  cargarTecnicas("editTecnicasSelect");


  const btnAbrirModal = document.querySelector(".btnAbrirModalSubir");
  const btnCerrarModal = document.querySelector(".cerrarModalSubir");

  btnAbrirModal.addEventListener("click", () => {
    abrirModal("modalSubirFoto");
  });

  btnCerrarModal.addEventListener("click", () => {
    cerrarModal("modalSubirFoto");
  });

});
/////SUBIR FOTO A LA GALERÍA DESDE EL FORMULARIO DEL MODAL/////
  document.getElementById("formSubirFoto").addEventListener("submit", function (e) {
  e.preventDefault();

  const formData = new FormData();

formData.append("fk_usuario", userId);
  formData.append("descripcionGaleria",
    document.getElementById("descripcionGaleria").value);

  formData.append("fk_camara",
    document.getElementById("camaraUsadaSelect").value);

  formData.append("fk_lente",
    document.getElementById("lenteUsadoSelect").value);

  const imagen = document.getElementById("imagenGaleria").files[0];
  if (imagen) formData.append("imagenGaleria", imagen);

  const tecnicasSelect = document.getElementById("tecnicasUsadasSelect");
const tecnicasSeleccionadas = Array.from(tecnicasSelect.selectedOptions)
                                    .map(option => option.value);

formData.append("tecnicas", JSON.stringify(tecnicasSeleccionadas));

  fetch("http://localhost:3000/galeria", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al subir foto");

      cerrarModal("modalSubirFoto");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo subir la foto.");
    });
});



/*****FUNCIONES NECESARIAS PARA LOS SELECT DE EDITAR Y SUBIR FOTO*/ 
function cargarCamaras(id) {
  return fetch("http://localhost:3000/camaras")
    .then(res => res.json())
    .then(data => {

      const select = document.getElementById(id);
      select.innerHTML = '<option value="">Seleccionar cámara</option>';

      data.forEach(camara => {
        const option = document.createElement("option");
        option.value = camara.idCamaras;
        option.textContent = camara.modeloCamaras;
        select.appendChild(option);
      });
    });
}
function cargarLentes(id) {
  fetch("http://localhost:3000/lentes")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById(id);

      data.forEach(lente => {
        const option = document.createElement("option");
        option.value = lente.idLentes;
        option.textContent = lente.modeloLentes;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error cargando lentes:", err));
}
function cargarTecnicas(id) {
  fetch("http://localhost:3000/tecnicas")
    .then(res => res.json())
    .then(data => {
      const select = document.getElementById(id);

      data.forEach(tecnica => {
        const option = document.createElement("option");
        option.value = tecnica.idTecnica;
        option.textContent = tecnica.nombreTecnica;
        select.appendChild(option);
      });
    })
    .catch(err => console.error("Error cargando técnicas:", err));
}

const btnCerrarModalEditar = document.querySelector(".cerrarModalEditar");

btnCerrarModalEditar.addEventListener("click", () => {
  cerrarModal("modalEditarFoto");
});




//////CARGARR DATOS DE LA FOTO EN EL MODAL DE EDICION//////
function cargarDatosEnModal(foto) {
    

  // Guardar ID
  document.getElementById("editIdGaleria").value = foto.idGaleria;
//preview 
  document.getElementById("previewImagenActual").src =
  `/images/galeria/${foto.imagenGaleria}`;

  // Descripción
  document.getElementById("editDescripcionGaleria").value =
    foto.descripcionGaleria || "";

  // Cámara
  document.getElementById("editCamaraSelect").value =
    foto.fk_camara || "";

  // Lente
  document.getElementById("editLenteSelect").value =
    foto.fk_lente || "";

  // Técnicas (IMPORTANTE)
  const selectTecnicas = document.getElementById("editTecnicasSelect");


  // Si tu backend trae técnicas como string tipo: "Macro, Retrato"
  if (foto.tecnicas) {

    const tecnicasArray = foto.tecnicas.split(",").map(t => t.trim());

    Array.from(selectTecnicas.options).forEach(option => {
      if (tecnicasArray.includes(option.textContent)) {
        option.selected = true;
      }
    });
  }
}




////////////////meotod PUT - actualizar foto//////////////////////
document.getElementById("formEditarFoto").addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("editIdGaleria").value;

  const descripcionGaleria =
    document.getElementById("editDescripcionGaleria").value;

  const fk_camara =
    document.getElementById("editCamaraSelect").value;

  const fk_lente =
    document.getElementById("editLenteSelect").value;

  const tecnicasSelect =
    document.getElementById("editTecnicasSelect");

  const tecnicasSeleccionadas =
    Array.from(tecnicasSelect.selectedOptions)
         .map(option => option.value);

  fetch(`http://localhost:3000/galeria/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      descripcionGaleria,
      fk_camara,
      fk_lente,
      tecnicas: JSON.stringify(tecnicasSeleccionadas)
    })
  })
  .then(res => res.json())
  .then(data => {
    cerrarModal("modalEditarFoto");
    location.reload();
  })
  .catch(err => {
    console.error("Error al actualizar:", err);
  });
});