
////////////////////////////// manejo de tabla dinamicas en las paginas del main grid de index.html////////
////////////////////////////////////////////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
     const path = window.location.pathname;

  if (path.includes("artistas.html")) {
    cargarFotografos();
  } else if (path.includes("lentes.html")) {
    cargarLentes();
  } else if (path.includes("camaras.html")) {
    cargarCamaras();
  } else if (path.includes("tecnicas.html")) {
    cargarTecnicas();
  } else if (path.includes("sony.html")) {
    cargarSony();
  } else if (path.includes("canonnikon.html")) {
    cargarCanonNikon();
  } else if (path.includes("film.html")) {
    cargarFilm();
  } else {
    console.error("Página no reconocida para cargar datos dinámicos.");
  }
});

function cargarFotografos() { fetch("http://localhost:3000/fotografos") // mi endpoint
        .then((response) => response.json())
        .then((data) => {
            const contenedor = document.querySelector(".gridFotografos");
            const template = document.getElementById("cardFotografo").content;

            data.forEach((fotografo) => {
                const clone = document.importNode(template, true);

                clone.querySelector(
                    ".imagenFotografo"
                ).src = `/images/fotografos/${fotografo.imagenFotografo}`; //C:\Users\brian\Proyectos\f.64\public\images\fotografos\leibovitz.jpg
                clone.querySelector(
                    ".imagenFotografo"
                ).alt = `Foto de ${fotografo.nombreCompleto}`;

                clone.querySelector(".nombreCompleto").textContent =
                    fotografo.nombreCompleto;
                clone.querySelector(
                    ".nacionalidad"
                ).textContent = `Nacionalidad: ${fotografo.nacionalidad}`;
                clone.querySelector(
                    ".anoNacimiento"
                ).textContent = `Año de nacimiento: ${fotografo.añoNacimiento}`;

                // Validamos si está fallecido o no
                clone.querySelector(".anoFallecimiento").textContent =
                    fotografo.añoFallecimiento
                        ? `Falleció en: ${fotografo.añoFallecimiento}`
                        : "Aún con vida";

                clone.querySelector(
                    ".estiloFotografico"
                ).textContent = `Estilo: ${fotografo.estiloFotografico}`;
                clone.querySelector(".biografia").textContent = fotografo.biografia;

                contenedor.appendChild(clone);
            });
        })
        .catch((error) => {
            console.error("Error al cargar fotógrafos:", error);
        })
    };
