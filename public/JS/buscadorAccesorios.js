document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscadoraccesorios");

  inputBuscador.addEventListener("input", () => {
    const filtro = inputBuscador.value.toLowerCase();

    const filas = document.querySelectorAll(".fila:not(.fila-header)");

    filas.forEach(fila => {
      const id = fila.querySelector(".id")?.textContent.toLowerCase() || "";
      const nombre = fila.querySelector(".nombre")?.textContent.toLowerCase() || "";
     const tipo = fila.querySelector(".tipo")?.textContent.toLowerCase() || "";


      const coincide = id.includes(filtro) || nombre.includes(filtro) || tipo.includes(filtro);
      fila.style.display = coincide ? "" : "none";
    });
  });
});