// MODALES
function abrirModal(id, usuarioId = null) {
  const modal = document.getElementById(id);
  modal.classList.remove("hidden");
  if (usuarioId !== null) modal.dataset.usuarioId = usuarioId;
}

function cerrarModal(id) {
  document.getElementById(id).classList.add("hidden");
}

// NUEVO INGRESO
document.querySelector('.nuevoBtn').addEventListener('click', () => {
  abrirModal('modalNuevoUsuario');
});

// FORMULARIO DE UPDATE - evento ÚNICO
document.getElementById("formEditarUsuario").addEventListener("submit", function (e) {
  e.preventDefault();
  const modal = document.getElementById("modalEditarUsuario");
  const idUsuario = modal.dataset.usuarioId;

  const formData = new FormData();
  
  // Mandamos los nombres EXACTOS que espera el controlador
  formData.append("nombre", document.getElementById("edit-nombreCompleto").value);
  formData.append("alias", document.getElementById("edit-alias").value);
  formData.append("dni", document.getElementById("edit-dni").value);
  formData.append("email", document.getElementById("edit-email").value);
  
  // El checkbox de Admin (mandamos 1 o 0 para que sea más fácil en el back)
  const esAdmin = document.getElementById("edit-admin").checked ? 1 : 0;
  formData.append("esAdmin", esAdmin);

  // La imagen: SOLO si el usuario eligió un archivo nuevo
  const inputImg = document.getElementById("edit-img");
  if (inputImg.files.length > 0) {
    // El nombre "img_usuarios" debe coincidir con lo que pusiste en upload.single()
    formData.append("img_usuarios", inputImg.files[0]);
  }

  fetch(`http://localhost:3000/auth/user/${idUsuario}`, {
    method: "PUT",
    headers: {
      "Authorization": `Bearer ${token}` // ¡No te olvides del token!
    },
    body: formData // Al usar FormData, NO pongas Content-Type manualmente
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
      return res.text();
    })
    .then(() => {
      cerrarModal("modalEditarUsuario");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo actualizar el usuario.");
    });
});

// CONFIRMAR ELIMINACIÓN (evento único)
document.getElementById("confirmarEliminar").addEventListener("click", () => {
  const modal = document.getElementById("modalConfirmarEliminacion");
  const idUsuario = modal.dataset.usuarioId;

  fetch(`http://localhost:3000/auth/user/${idUsuario}`, {
  method: "DELETE",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(async res => {
    const data = await res.text(); // leemos la respuesta cruda
    if (!res.ok) {
      throw new Error(`Error ${res.status}: ${data}`);
    }
    console.log("Usuario eliminado:", data);
    cerrarModal("modalConfirmarEliminacion");
    location.reload();
  })
  .catch(err => {
    console.error("Error en DELETE:", err);
    alert("No se pudo eliminar el usuario: " + err.message);
  });
});


//////////////////
/// MOSTRAR LISTA
const token = localStorage.getItem("token"); // Asegurate de haber guardado el token antes

fetch("http://localhost:3000/auth/user", {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => res.json())
  .then(res => {
  const usuarios = res.users; // <- accedemos al array dentro del objeto
  const contenedor = document.querySelector(".usuario-lista");
  const template = document.getElementById("template-usuario");

    usuarios.forEach(usuario => {
      const clone = template.content.cloneNode(true);
      

      clone.querySelector(".id").textContent = usuario.id;
      clone.querySelector(".nombreCompleto").textContent = usuario.nombre;
      clone.querySelector(".alias").textContent = usuario.alias;
      clone.querySelector(".dni").textContent = usuario.Dni;
      clone.querySelector(".ultimoLogeo").textContent = usuario.ultimoLogeo;
      clone.querySelector(".email").textContent = usuario.email;
      clone.querySelector(".esAdmin").textContent = usuario.esAdmin;
      clone.querySelector(".thumb").src = `/uploads/${usuario.fotoPerfil}`;

      const btnUpload = clone.querySelector(".upload");
      const btnDelete = clone.querySelector(".delete");

      btnUpload.dataset.id = usuario.id;
      btnDelete.dataset.id = usuario.id;

      btnUpload.addEventListener("click", () => {
  // Usamos usuario.id porque así viene del mapeo del controlador
  abrirModal('modalEditarUsuario', usuario.id); 

  fetch(`http://localhost:3000/auth/user/${usuario.id}`, {
    headers: { "Authorization": `Bearer ${token}` }
  })
    .then(res => res.json())
    .then(data => {
      // Usamos los nombres que devuelve tu showUser
      document.getElementById("edit-nombreCompleto").value = data.nombre;
      document.getElementById("edit-alias").value = data.alias;
      document.getElementById("edit-dni").value = data.Dni;
      document.getElementById("edit-ultimoLogeo").textContent = data.ultimoLogeo || "Sin registros";
      document.getElementById("edit-email").value = data.email;
      document.getElementById("edit-admin").checked = (data.esAdmin == 1);
    });
});

      btnDelete.addEventListener("click", () => {
        abrirModal('modalConfirmarEliminacion', usuario.id);
      });

      contenedor.appendChild(clone);
    });
  });


// //NUEVO INGRESO
  document.getElementById("formNuevoUsuario").addEventListener("submit", function (e) {
      console.log("Submit del formulario ejecutado");

  e.preventDefault();

  const formData = new FormData();
  formData.append("nombreCompletoUsuario", document.getElementById("nuevo-nombre").value);
  formData.append("aliasUsuario", document.getElementById("nuevo-alias").value);
  formData.append("DniUsuario", document.getElementById("nuevo-dni").value);
  formData.append("emailUsuario", document.getElementById("nuevo-email").value);
  formData.append("password", document.getElementById("nuevo-password").value);

  formData.append("img_usuarios", document.getElementById("nuevo-img").files[0]);

  fetch("http://localhost:3000/auth/register", {
    method: "POST",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al guardar");
      return res.json();
    })
  
    .then(() => {
      cerrarModal("modalNuevoUsuario");
      location.reload();
    })
    .catch(err => {
      console.error(err);
      alert("No se pudo guardar el usuario.");
    });
});

