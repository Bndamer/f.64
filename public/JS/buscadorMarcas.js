document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscadorMarcas");

  inputBuscador.addEventListener("input", () => {
    const filtro = inputBuscador.value.toLowerCase();

    const filas = document.querySelectorAll(".fila:not(.fila-header)");

    filas.forEach(fila => {
      const id = fila.querySelector(".id")?.textContent.toLowerCase() || "";
      const nombre = fila.querySelector(".nombre")?.textContent.toLowerCase() || "";

      const coincide = id.includes(filtro) || nombre.includes(filtro);
      fila.style.display = coincide ? "" : "none";
    });
  });
});