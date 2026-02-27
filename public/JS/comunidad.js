(() => {
  const token = localStorage.getItem("token");
  const lista = document.getElementById("listaUsuarios");
  const buscarInput = document.getElementById("buscarUsuario");
  const modal = document.getElementById("modalCarrusel");
  const carrusel = modal.querySelector(".carrusel");
  const cerrarModal = modal.querySelector(".cerrar");

  let currentIndex = 0;
  let items = [];

  // --- Inicial oculto ---
  modal.style.display = "none";

  // --- Función para renderizar card ---
  const renderUserCard = (u) => {
  const div = document.createElement("div");
  div.classList.add("usuario-card");
  div.innerHTML = `
    <img src="${u.fotoPerfil ? `/uploads/${u.fotoPerfil.replace("img_usuarios/", "")}` : '/images/user.png'}" class="avatar" alt="Avatar de ${u.alias}">
    <h4 class="alias">${u.alias}</h4>
    <p class="foto-count">0 fotos</p> <!-- contador temporal -->
    <button class="btn-ver-fotos" data-userid="${u.id}">Ver fotos</button>
  `;
  lista.appendChild(div);

  // --- Aquí va el fetch para actualizar la cantidad de fotos ---
  fetch(`http://localhost:3000/galeria/usuario/${u.id}`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(fotos => {
      const contador = div.querySelector(".foto-count");
      contador.textContent = `${fotos.length} foto${fotos.length !== 1 ? 's' : ''}`;
    })
    .catch(err => console.error("No se pudo obtener la cantidad de fotos del usuario", err));
};

  // --- Función abrir carrusel ---
  const abrirCarrusel = (fotos) => {
    carrusel.innerHTML = ""; // limpiar siempre antes
    if (!fotos || fotos.length === 0) {
      carrusel.innerHTML = "<p>No hay fotos para este usuario.</p>";
      modal.style.display = "flex";
      return;
    }

    carrusel.innerHTML = fotos.map((f, i) => `
      <div class="carrusel-item" ${i !== 0 ? 'hidden' : ''}>
        <img src="/images/galeria/${f.imagenGaleria}" alt="${f.descripcionGaleria || 'Foto'}">
        ${f.descripcionGaleria ? `<p class="descripcion">${f.descripcionGaleria}</p>` : ''}
      </div>
    `).join('');

    items = carrusel.querySelectorAll(".carrusel-item");
    currentIndex = 0;
    items.forEach((item, i) => item.hidden = i !== 0);

    modal.style.display = "flex";
  };

  // --- Fetch usuarios ---
  fetch("http://localhost:3000/auth/users/comunidad", {
    headers: { "Authorization": `Bearer ${token}` }
  })
  .then(res => {
    if (!res.ok) throw new Error("No autorizado");
    return res.json();
  })
  .then(data => {
    const users = data.users;
    lista.innerHTML = "";

    const userIdLogueado = parseInt(localStorage.getItem("userId"));
    const indexUsuario = users.findIndex(u => u.id === userIdLogueado);
    let usuarioActual;
    if (indexUsuario !== -1) usuarioActual = users.splice(indexUsuario, 1)[0];

    if (usuarioActual) renderUserCard(usuarioActual);
    users.forEach(u => renderUserCard(u));

    // --- Listeners para ver fotos ---
    document.querySelectorAll(".btn-ver-fotos").forEach(btn => {
      btn.addEventListener("click", () => {
        const userId = btn.dataset.userid;
        fetch(`http://localhost:3000/galeria/usuario/${userId}`, {
          headers: { "Authorization": `Bearer ${token}` }
        })
        .then(res => {
          if (!res.ok) throw new Error("Error al obtener fotos");
          return res.json();
        })
        .then(fotos => abrirCarrusel(fotos))
        .catch(err => console.error(err));
      });
    });
  })
  .catch(err => console.error(err));

  // --- Flechas globales ---
  const nextBtn = document.createElement("button");
  nextBtn.className = "next";
  nextBtn.textContent = ">";
  nextBtn.addEventListener("click", () => {
    if (!items || items.length === 0) return;
    items[currentIndex].hidden = true;
    currentIndex = (currentIndex + 1) % items.length;
    items[currentIndex].hidden = false;
  });
  modal.appendChild(nextBtn);

  const prevBtn = document.createElement("button");
  prevBtn.className = "prev";
  prevBtn.textContent = "<";
  prevBtn.addEventListener("click", () => {
    if (!items || items.length === 0) return;
    items[currentIndex].hidden = true;
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    items[currentIndex].hidden = false;
  });
  modal.appendChild(prevBtn);

  // --- Filtrado rápido ---
  buscarInput.addEventListener("input", e => {
    const q = e.target.value.toLowerCase();
    document.querySelectorAll(".usuario-card").forEach(card => {
      const alias = card.querySelector(".alias").textContent.toLowerCase();
      card.style.display = alias.includes(q) ? "flex" : "none";
    });
  });

  // --- Cerrar modal ---
  cerrarModal.addEventListener("click", () => modal.style.display = "none");

})();