function agregarTarea() {
    let nuevaTareaTexto = document.getElementById("nuevaTarea").value; // obtener el valor del modelo de la cámara
    let nuevaMarcaTexto = document.getElementById("nuevaMarca").value; // obtener el valor de la marca

    // Validación para ver que no sean vacíos los valores
    if (nuevaTareaTexto === "" || nuevaMarcaTexto === "") {
        alert("Por favor, ingrese tanto la marca como el modelo de la cámara");
        return;
    }

    // Crear un objeto para la nueva cámara
    let nuevaCamara = {
        marca: nuevaMarcaTexto,
        modelo: nuevaTareaTexto
    };

    // Obtener el listado actual del localStorage
    let listadoCamaras = JSON.parse(localStorage.getItem("listadoCamaras")) || [];

    // Agregar la nueva cámara al listado
    listadoCamaras.push(nuevaCamara);

    // Guardar el listado actualizado en el localStorage
    localStorage.setItem("listadoCamaras", JSON.stringify(listadoCamaras));

    // Renderizar la lista
    renderizarLista();

    // Limpiar los cuadros de texto luego de agregar la tarea
    document.getElementById("nuevaTarea").value = "";
    document.getElementById("nuevaMarca").value = "";
}

function renderizarLista() {
    // Limpiar la lista actual
    const listadoElement = document.getElementById("listadoCamaras");
    listadoElement.innerHTML = ""; // Limpiar lista

    // Obtener el listado del localStorage
    let listadoCamaras = JSON.parse(localStorage.getItem("listadoCamaras")) || [];

    // Agregar cada cámara al listado
    listadoCamaras.forEach((camara, index) => {
        let nuevaTarea = document.createElement("li");
        nuevaTarea.textContent = `${camara.marca} ${camara.modelo} `; // Incluir marca y modelo

        // Botón de "check" (marcar como hecho)
        let botonCheck = document.createElement("button");
        botonCheck.innerHTML = '<i class="bx bx-check"></i>'; // Icono de check
        botonCheck.classList.add("boton-check"); // Agregar clase para el estilo
        botonCheck.onclick = function() {
            nuevaTarea.style.textDecoration = "line-through"; // Ejemplo de marcar como hecho
        };

        // Botón eliminar
        let botonEliminar = document.createElement("button");
        botonEliminar.innerHTML = '<i class="bx bx-x"></i>'; // Icono de eliminar
        botonEliminar.classList.add("boton-eliminar"); // Agregar clase para el estilo
        botonEliminar.onclick = function() {
            eliminarTarea(index); // Llama a la función para eliminar la tarea
        };

        // Agregar los botones al elemento de la lista 
        nuevaTarea.appendChild(botonCheck);
        nuevaTarea.appendChild(botonEliminar);

        // Agregar la cámara a la lista
        listadoElement.appendChild(nuevaTarea);
    });
}

function eliminarTarea(index) {
    // Obtener el listado actual del localStorage
    let listadoCamaras = JSON.parse(localStorage.getItem("listadoCamaras")) || [];

    // Eliminar la cámara seleccionada
    listadoCamaras.splice(index, 1);

    // Guardar el listado actualizado en el localStorage
    localStorage.setItem("listadoCamaras", JSON.stringify(listadoCamaras));

    // Renderizar la lista actualizada
    renderizarLista();
}

// Cargar las cámaras almacenadas al iniciar la página
document.addEventListener("DOMContentLoaded", renderizarLista);