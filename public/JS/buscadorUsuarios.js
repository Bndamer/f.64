document.addEventListener("DOMContentLoaded", () => {
  // El ID que tenés en tu HTML es 'buscadorusuarios'
  const inputBuscador = document.getElementById("buscadorusuarios");

  inputBuscador.addEventListener("input", () => {
    const filtro = inputBuscador.value.toLowerCase();

    // Buscamos las filas de usuarios (usando la clase .fila-usuario que definimos en el template)
    // Excluimos la .fila-header para que los títulos no desaparezcan
    const filas = document.querySelectorAll(".fila-usuario:not(.fila-header)");

    filas.forEach(fila => {
      // Capturamos el contenido de todas las celdas que queremos filtrar
      const id = fila.querySelector(".id")?.textContent.toLowerCase() || "";
      const nombre = fila.querySelector(".nombreCompleto")?.textContent.toLowerCase() || "";
      const alias = fila.querySelector(".alias")?.textContent.toLowerCase() || "";
      const dni = fila.querySelector(".dni")?.textContent.toLowerCase() || "";
      const esAdmin = fila.querySelector(".esAdmin")?.textContent.toLowerCase() || "";

      // La lógica del filtro: si el texto ingresado está en cualquiera de estos campos...
      const coincide = 
        id.includes(filtro) || 
        nombre.includes(filtro) || 
        alias.includes(filtro) || 
        dni.includes(filtro) ||
        esAdmin.includes(filtro);

      // Mostramos u ocultamos la fila según la coincidencia
      // Uso "" para que vuelva a su estado original (flex o block) o "none"
      fila.style.display = coincide ? "" : "none"; 
    });
  });
});