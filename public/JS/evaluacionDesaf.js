const desafiosContainer = document.getElementById("desafiosContainer");
const inscripcionesBody = document.getElementById("inscripcionesBody");
const modal = document.getElementById("modalEvidencia");
const zoomImg = document.getElementById("zoomEvidencia");

// 1️⃣ Traer desafíos y crear botones
fetch("http://localhost:3000/desafios")
  .then(res => res.json())
  .then(desafios => {
    desafios.forEach(d => {
      const btn = document.createElement("button");
      btn.textContent = d.nombreDesafio;
      btn.classList.add("desafio-btn");
      btn.dataset.id = d.idDesafio;

      btn.addEventListener("click", function() {
        cargarInscripciones(d.idDesafio);
      });

      desafiosContainer.appendChild(btn);
    });
  })
  .catch(err => console.error("Error cargando desafíos:", err));

// 2️⃣ Función para cargar inscripciones
function cargarInscripciones(desafioId) {
  // Limpiar tabla
  inscripcionesBody.innerHTML = "<tr><td colspan='7'>Cargando...</td></tr>";

  // Traemos solo las inscripciones de este desafío
  fetch(`http://localhost:3000/inscripciones/desafio/${desafioId}`)
    .then(res => res.json())
    .then(inscripciones => {
      inscripcionesBody.innerHTML = ""; // limpiar tabla

      inscripciones.forEach(insc => {
        const tr = document.createElement("tr");
        tr.id = `insc-${insc.idInscripcion}`;

        // Por defecto placeholder
        const imgSrc = '/images/placeholder.jpg';

        tr.innerHTML = `
          <td>${insc.aliasUsuario}</td>
          <td>${insc.progreso}%</td>
          <td>${insc.estado}</td>
          <td><img src="${imgSrc}" class="evidencia-img" alt="Evidencia"></td>
          <td><input type="text" class="comentario-input" value="${insc.comentario || ''}" placeholder="Agregar comentario"></td>
          <td><input type="number" min="0" max="100" class="puntos-input" value="${insc.puntosObtenidos || 0}"></td>
          <td><button class="btn-evaluar" data-id="${insc.idInscripcion}">Evaluar</button></td>
        `;

        inscripcionesBody.appendChild(tr);

        // Traemos solo la evidencia de ESTA inscripción
        fetch(`http://localhost:3000/evidencias/inscripcion/${insc.idInscripcion}`)
          .then(res => res.json())
          .then(evidencias => {
            if (evidencias.length > 0) {
              // Tomamos la más reciente
              const ultima = evidencias[evidencias.length - 1];
              tr.querySelector(".evidencia-img").src = `/images/evidencias/${ultima.nombreArchivo}`;
            }
          })
          .catch(err => console.error("Error cargando evidencia:", err));
      });

      agregarEventosBotones();
      agregarEventosZoom();
    })
    .catch(err => {
      console.error("Error cargando inscripciones:", err);
      inscripcionesBody.innerHTML = "<tr><td colspan='7'>Error al cargar inscripciones</td></tr>";
    });
}

// 3️⃣ Evaluar inscripción
function evaluarInscripcion(inscripcionId, comentario, puntos) {
  fetch(`http://localhost:3000/inscripciones/${inscripcionId}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ comentario, puntosObtenidos: puntos })
  })
  .then(res => res.json())
  .then(() => alert(`Evaluación guardada para la inscripción ${inscripcionId}`))
  .catch(err => {
    console.error(err);
    alert("Error al guardar la evaluación");
  });
}

// 4️⃣ Botones Evaluar
function agregarEventosBotones() {
  document.querySelectorAll(".btn-evaluar").forEach(btn => {
    btn.addEventListener("click", function() {
      const tr = btn.closest("tr");
      const comentario = tr.querySelector(".comentario-input").value;
      const puntos = tr.querySelector(".puntos-input").value;
      const inscripcionId = btn.dataset.id;

      evaluarInscripcion(inscripcionId, comentario, puntos);
    });
  });
}

// 5️⃣ Zoom evidencia
function agregarEventosZoom() {
  document.querySelectorAll('.evidencia-img').forEach(img => {
    img.addEventListener('click', function() {
      zoomImg.src = img.src;
      modal.style.display = 'flex';
    });
  });

  modal.addEventListener('click', function() {
    modal.style.display = 'none';
    zoomImg.src = '';
  });
}