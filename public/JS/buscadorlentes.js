document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscadorlentes");

  inputBuscador.addEventListener("input", () => {
    const filtro = inputBuscador.value.toLowerCase();

    const filas = document.querySelectorAll(".fila:not(.fila-header)");

    filas.forEach(fila => {
      const id = fila.querySelector(".id")?.textContent.toLowerCase() || "";
      const modelo = fila.querySelector(".modelo")?.textContent.toLowerCase() || "";

      const coincide = id.includes(filtro) || modelo.includes(filtro);
      fila.style.display = coincide ? "" : "none";
    });
  });
});