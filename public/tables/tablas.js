
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



//////FUNCION PARA CARGAR FOTOGRAFOS DESDE EL ENDPOINT A LA TABLA DINAMICA DE ARTISTAS.HTML/////
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


 //////FUNCION PARA CARGAR LENTES DESDE EL ENDPOINT A LA TABLA DINAMICA DE LENTES.HTML/////
    function cargarLentes() { fetch("http://localhost:3000/lentes") // mi endpoint
        .then((response) => response.json())
        .then((data) => {
            const contenedor = document.querySelector(".gridLentes");
            const template = document.getElementById("cardLentes").content;

            data.forEach((lente) => {
                const clone = document.importNode(template, true);

                clone.querySelector(".imagenLentes").src = `/images/lentes/${lente.imagenLentes}`;
                clone.querySelector(".imagenLentes").alt = `Foto de ${lente.modeloLentes}`;

                clone.querySelector(".modeloLentes").textContent = lente.modeloLentes;
                clone.querySelector(".tipoLentes").textContent = `Tipo: ${lente.tipoLentes}`;
                clone.querySelector(".aperturaMin").textContent = `Apertura mínima: ${lente.aperturaMinLentes}`;
                clone.querySelector(".aperturaMax").textContent = `Apertura máxima: ${lente.aperturaMaxLentes}`;
                clone.querySelector(".distanciaFocal").textContent = `Distancia focal: ${lente.distanciaFocalLentes}`;
                clone.querySelector(".marcaid").textContent = `Marca: ${lente.nombreMarcas}`;                clone.querySelector(".precioLentes").textContent = `Precio: ${lente.precioLentes}`;
                clone.querySelector(".fkReseñas").textContent = `Datos: ${lente.descripcionLentes}`;

                contenedor.appendChild(clone);
            });
        })
        .catch((error) => {
            console.error("Error al cargar lentes:", error);
        })
    };
