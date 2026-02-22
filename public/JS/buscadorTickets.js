document.addEventListener("DOMContentLoaded", () => {
  const inputBuscador = document.getElementById("buscadorTickets");

  inputBuscador.addEventListener("input", () => {
    const filtro = inputBuscador.value.toLowerCase().trim();

    const filas = document.querySelectorAll(".fila:not(.fila-header)");

    filas.forEach(fila => {
      const id = fila.querySelector(".id")?.textContent.toLowerCase() || "";
      const usuario = fila.querySelector(".usuario")?.textContent.toLowerCase() || "";
      const admin = fila.querySelector(".admin")?.textContent.toLowerCase() || "";
      const estado = fila.querySelector(".estado")?.textContent.toLowerCase() || "";
      const fecha = fila.querySelector(".fecha")?.textContent.toLowerCase() || "";

      const coincide =
        id.includes(filtro) ||
        usuario.includes(filtro) ||
        admin.includes(filtro) ||
        estado.includes(filtro) ||
        fecha.includes(filtro);

      fila.style.display = coincide ? "" : "none";
    });
  });
});