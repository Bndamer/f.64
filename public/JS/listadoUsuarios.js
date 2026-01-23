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
  formData.append("nombreCompletoUsuario", document.getElementById("edit-nombreCompleto").value);
  formData.append("aliasUsuario", document.getElementById("edit-alias").value);
  formData.append("dniUsuario", document.getElementById("edit-dni").value);
  formData.append("ultimoLogeoUsuario", document.getElementById("edit-ultimoLogeo").value);
  formData.append("emailUsuario", document.getElementById("edit-email").value);
  formData.append("passwordUsuario", document.getElementById("edit-password").value);
  formData.append("img_usuarios", document.getElementById("edit-img").value);
  formData.append("edAdmin", document.getElementById("edit-admin").checked);
  
  const imagen = document.getElementById("edit-img").files[0];
  if (imagen) formData.append("imagenUsuarios", imagen);

  fetch(`http://localhost:3000/auth/user/${idUsuario}`, {
    method: "PUT",
    body: formData
  })
    .then(res => {
      if (!res.ok) throw new Error("Error al actualizar");
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
        abrirModal('modalEditarUsuario', usuario.idUsuario);

        fetch(`http://localhost:3000/auth/user/${usuario.idUsuario}`)
          .then(res => res.json())
          .then(data => {
            document.getElementById("edit-nombreCompleto").value = data.nombre;
            document.getElementById("edit-alias").value = data.alias;
            document.getElementById("edit-dni").value = data.Dni;
            document.getElementById("edit-ultimoLogeo").value = data.ultimoLogeoUsuario;
            document.getElementById("edit-email").value = data.email;
            document.getElementById("edit-password").value = data.passwordUsuario;

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

