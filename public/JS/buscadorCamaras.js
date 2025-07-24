document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscadorcamaras");

  inputBuscador.addEventListener("input", () => {
    const filtro = inputBuscador.value.toLowerCase();

    // Seleccionamos todas las filas que no sean encabezado
const filas = document.querySelectorAll(".fila-camara:not(.fila-header)");

    filas.forEach(fila => {
      const id = fila.querySelector(".id")?.textContent.toLowerCase() || "";
      const modelo = fila.querySelector(".modelo")?.textContent.toLowerCase() || "";

      const coincide = id.includes(filtro) || modelo.includes(filtro);
      fila.style.display = coincide ? "" : "none";
    });
  });
});