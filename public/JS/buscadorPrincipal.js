
(() => {
const searchContainer = document.querySelector(".search-container");
const searchBtn = document.getElementById("searchBtn");
const searchInput = document.getElementById("searchInput");

// Solo si existen los elementos (navbar)
if (searchBtn && searchContainer && searchInput) {
  searchBtn.addEventListener("click", function (e) {
    e.preventDefault();
    searchContainer.classList.toggle("active");
    searchInput.focus();
  });

  searchInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      const query = searchInput.value.trim();
      if (query !== "") {
        window.location.href = "/search.html?q=" + encodeURIComponent(query);
      }
    }
  });
}

document.addEventListener("DOMContentLoaded", function () {
  const params = new URLSearchParams(window.location.search);
  const query = params.get("q");

  if (query) {
    fetch(`/search?q=${encodeURIComponent(query)}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Resultados:", data);
        const contenedor = document.getElementById("contenedorResultados");

        if (data.length === 0) {
          contenedor.innerHTML = "<p>No se encontraron resultados.</p>";
          return;
        }

        data.forEach((item) => {
          const div = document.createElement("div");

          let url = "";

          switch (item.tipo) {
            case "camara":
              url = "/tables/camaras.html";
              break;
            case "lente":
              url = "/tables/lentes.html";
              break;
            case "accesorio":
              url = "/tables/accesorios.html";
              break;
            case "tecnica":
              url = "/tables/tecnicas.html";
              break;
            case "desafio":
              url = "/desafios.html";
              break;
            case "fotografo":
              url = "/tables/artistas.html";
              break;
          }

        div.innerHTML = `
  <h3>
    <a href="${url}">
      ${item.titulo}
    </a>
  </h3>
  <p class="tipo">${item.tipo.toUpperCase()}</p>
`;

          contenedor.appendChild(div);
        });
      });
  }
});
})();
