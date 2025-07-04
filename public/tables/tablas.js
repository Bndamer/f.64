
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
                ).textContent = `Año de nacimiento: ${fotografo.anioNacimiento}`;

                // Validamos si está fallecido o no
                clone.querySelector(".anoFallecimiento").textContent =
                    fotografo.anioFallecimiento
                        ? `Falleció en: ${fotografo.anioFallecimiento}`
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
                clone.querySelector(".marcaid").textContent = `Marca: ${lente.nombreMarcas}`;                
                clone.querySelector(".precioLentes").textContent = `Precio: ${lente.precioLentes}`;
                clone.querySelector(".fkReseñas").textContent = `Datos: ${lente.descripcionLentes}`;

                contenedor.appendChild(clone);
            });
        })
        .catch((error) => {
            console.error("Error al cargar lentes:", error);
        })
    };

     //////FUNCION PARA CARGAR camaras DESDE EL ENDPOINT A LA TABLA DINAMICA DE camaras.HTML/////
    function cargarCamaras() { fetch("http://localhost:3000/camaras") // mi endpoint
        .then((response) => response.json())
        .then((data) => {
            const contenedor = document.querySelector(".gridCamaras");
            const template = document.getElementById("cardCamaras").content;

            data.forEach((camara) => {
                const clone = document.importNode(template, true);

                clone.querySelector(".imagenCamaras").src = `/images/camaras/${camara.imagenCamaras}`;
                clone.querySelector(".imagenCamaras").alt = `Foto de ${camara.modeloCamaras}`;

                clone.querySelector(".modeloCamaras").textContent = camara.modeloCamaras;
                clone.querySelector(".tipoCamaras").textContent = `Tipo: ${camara.tipoCamaras}`;
                clone.querySelector(".sensorCamaras").textContent = `Sensor: ${camara.sensorCamaras}`;
                clone.querySelector(".resolucionCamaras").textContent = `Resolución: ${camara.resolucionCamaras}`;
                clone.querySelector(".isoMinCamaras").textContent = `ISO mínimo: ${camara.isoMinCamaras}`;
                clone.querySelector(".isoMaxCamaras").textContent = `ISO máximo: ${camara.isoMaxCamaras}`;
                clone.querySelector(".marca_id").textContent = `Marca: ${camara.marca_id}`;
                clone.querySelector(".precioCamaras").textContent = `Precio: ${camara.precioCamaras}`;

                contenedor.appendChild(clone);
            });
        })
        .catch((error) => {
            console.error("Error al cargar lentes:", error);
        })
    };

    //////FUNCION PARA CARGAR tecnicas fotograficas DESDE EL ENDPOINT A LA TABLA DINAMICA DE tecnicas.HTML/////
    function cargarTecnicas() { fetch("http://localhost:3000/tecnicas") // mi endpoint
        .then((response) => response.json())
        .then((data) => {
            const contenedor = document.querySelector(".gridTecnicas");
            const template = document.getElementById("cardTecnica").content;

            data.forEach((tecnica) => {
                const clone = document.importNode(template, true);

                clone.querySelector(".imagenTecnica").src = `/images/tecnicas/${tecnica.imagenTecnica}`;
                clone.querySelector(".imagenTecnica").alt = `Foto de ${tecnica.nombreTecnica}`;

                clone.querySelector(".nombreTecnica").textContent = tecnica.nombreTecnica;
                clone.querySelector(".descripcionTecnica").textContent = tecnica.descripcionTecnica;

                contenedor.appendChild(clone);
            });
        })
        .catch((error) => {
            console.error("Error al cargar lentes:", error);
        })
    };