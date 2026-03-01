const idUsuario = localStorage.getItem("userId");let desafiosGlobal = [];
let inscripcionActual = null;

/////////////////////////////////////////////////////
// CARGAR DESAFÍOS
/////////////////////////////////////////////////////

function cargarDesafios(estado = "todos") {

  fetch("/inscripciones/usuario/" + idUsuario)
    .then(res => res.json())
    .then(data => {

      desafiosGlobal = data;

      if (estado === "todos") {
        renderDesafios(data);
      } else {
        const filtrados = data.filter(d => d.estado === estado);
        renderDesafios(filtrados);
      }

      actualizarResumen(desafiosGlobal); // 👈 siempre global
    });
}

/////////////////////////////////////////////////////
// RENDER DESAFÍOS
/////////////////////////////////////////////////////

function renderDesafios(desafios) {

  const contenedor = document.getElementById("listaDesafios");
  contenedor.innerHTML = "";

  desafios.forEach(function(d) {

    const progreso = d.progreso;

    contenedor.innerHTML += `
      <article class="card-desafio">
        <h3>${d.nombreDesafio}</h3>
        <p>Dificultad: ${d.nivelDificultad}</p>

        <div class="barra-progreso">
          <span style="width:${progreso}%"></span>
        </div>

        <p>${progreso}% completado</p>
        <p>Estado: ${d.estado}</p>
        <p>Puntos: ${d.puntosObtenidos}</p>

        <button onclick="verEvidencias(${d.idInscripcion}, '${d.nombreDesafio}')">
          Adjuntar Material
        </button>
      </article>
    `;
  });
}

function cargarDisponibles() {

  fetch("/desafios/disponibles/" + idUsuario)
    .then(res => res.json())
    .then(data => {

      if (!Array.isArray(data)) {
        console.error("Disponibles no es array:", data);
        return;
      }

      renderDisponibles(data);
    })
    .catch(error => {
      console.error("Error cargando disponibles:", error);
    });
}

/////////////////////////////////////////////////////
// ACTUALIZAR RESUMEN
/////////////////////////////////////////////////////

function actualizarResumen(desafios) {

  let activos = 0;
  let completados = 0;
  let puntos = 0;

  desafios.forEach(function(d) {

    if (d.estado === "activo") activos++;
    if (d.estado === "completado") completados++;

    puntos += d.puntosObtenidos;
  });

  document.getElementById("totalActivos").innerText = activos;
  document.getElementById("totalCompletados").innerText = completados;
  document.getElementById("totalPuntos").innerText = puntos;
}

/////////////////////////////////////////////////////
// VER EVIDENCIAS
/////////////////////////////////////////////////////

function verEvidencias(idInscripcion, nombreDesafio) {

  inscripcionActual = idInscripcion;

  document.getElementById("panelEvidencias")
    .classList.remove("hidden");

  document.getElementById("tituloDesafio")
    .innerText = nombreDesafio;

  fetch("/evidencias/inscripcion/" + idInscripcion)
    .then(res => res.json())
    .then(evidencias => {

      const lista = document.getElementById("listaEvidencias");
      lista.innerHTML = "";

      evidencias.forEach(function(e) {

        lista.innerHTML += `
          <div>
            <img src="/images/evidencias/${e.nombreArchivo}" width="100"/>
           <p>Lechuza viajera: ${e.descripcion}</p>
            <h5>Estado: ${e.estado}</h5>
            <p>Michi moderador: ${e.observacionAdmin || ""}</p>
          </div>
          <hr/>
        `;
      });

    })
    .catch(error => {
      console.error("Error cargando evidencias:", error);
    });
}


function renderDisponibles(desafios) {

  const contenedor = document.getElementById("listaDisponibles");
  contenedor.innerHTML = "";

  if (desafios.length === 0) {
    contenedor.innerHTML = "<p>No hay desafíos disponibles</p>";
    return;
  }

  desafios.forEach(function(d) {

    contenedor.innerHTML += `
      <article class="card-desafio disponible">
        <h3>${d.nombreDesafio}</h3>
        <p>Dificultad: ${d.nivelDificultad}</p>
        <p>${d.consignaDesafio}</p>
        <p>Premio: ${d.premioDesafio}</p>
        <p>Vigencia: ${d.tiempoVigenciaDias} días</p>

        <button onclick="inscribirse(${d.idDesafio})">
          Inscribirme
        </button>
      </article>
    `;
  });
}

function inscribirse(idDesafio) {

  fetch("/inscripciones", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idUsuario: idUsuario,
      idDesafio: idDesafio
    })
  })
  .then(res => {

    return res.json().then(data => {
      return { status: res.status, body: data };
    });

  })
  .then(response => {

    if (response.status === 201) {
      alert("Te inscribiste correctamente");
      cargarDesafios();
      cargarDisponibles();
    } else {
      alert(response.body.error || "No se pudo inscribir");
    }

  })
  .catch(error => {
    console.error("Error real:", error);
    alert("Error del servidor");
  });
}

/////////////////////////////////////////////////////
// CERRAR PANEL
/////////////////////////////////////////////////////

document.getElementById("cerrarPanel")
  .addEventListener("click", function() {
    document.getElementById("panelEvidencias")
      .classList.add("hidden");
  });

/////////////////////////////////////////////////////
// FILTROS
/////////////////////////////////////////////////////

document.querySelectorAll(".filtro").forEach(function(btn) {

  btn.addEventListener("click", function() {

    document.querySelectorAll(".filtro")
      .forEach(function(b) {
        b.classList.remove("activo");
      });

    btn.classList.add("activo");

    cargarDesafios(btn.dataset.estado);
  });
});

/////////////////////////////////////////////////////
// SUBIR EVIDENCIA
/////////////////////////////////////////////////////

document.getElementById("formEvidencia")
  .addEventListener("submit", function(e) {

    e.preventDefault();

    const formData = new FormData(this);
    formData.append("fkInscripcion", inscripcionActual);

    fetch("/evidencias", {
      method: "POST",
      body: formData
    })
    .then(res => res.json())
    .then(data => {

      alert("Evidencia subida correctamente");

      verEvidencias(inscripcionActual,
        document.getElementById("tituloDesafio").innerText
      );

      cargarDesafios();
    })
    .catch(error => {
      console.error("Error subiendo evidencia:", error);
    });
  });

/////////////////////////////////////////////////////
// INICIALIZAR
/////////////////////////////////////////////////////

cargarDesafios();
cargarDisponibles();