(() => { ////encierro las variables para que no se mezclen con otras partes del código donde si tengo declaras el token tmb///

const token = localStorage.getItem("token");
const userId = localStorage.getItem("userId");

fetch(`http://localhost:3000/auth/user/${userId}`, {
  method: "GET",
  headers: {
    "Authorization": `Bearer ${token}`
  }
})
  .then(res => {
    if (!res.ok) throw new Error("No autorizado");
    return res.json();

  })
  .then(user => {
    document.getElementById("perfil-nombre").value = user.nombre;
    document.getElementById("perfil-alias").value = user.alias;
    document.getElementById("perfil-dni").value = user.Dni;
    document.getElementById("perfil-email").value = user.email;

    if (user.fotoPerfil) {
      document.getElementById("imgAdmin").src = `/uploads/${user.fotoPerfil}`;
    } else {
      document.getElementById("imgAdmin").src = "/images/user.png";
    }
  })
  .catch(err => {
    console.error(err);
    alert("Error cargando el perfil");
  });


  document
  .getElementById("formPerfilPropio")
  .addEventListener("submit", function (e) {

    e.preventDefault();

    const formData = new FormData();

    formData.append("nombre", document.getElementById("perfil-nombre").value);
    formData.append("alias", document.getElementById("perfil-alias").value);
    formData.append("dni", document.getElementById("perfil-dni").value);
    formData.append("email", document.getElementById("perfil-email").value);

    const password = document.getElementById("perfil-password").value;
    if (password.trim() !== "") {
      formData.append("passwordUsuario", password);
    }

    const imgInput = document.getElementById("perfil-img");
    if (imgInput.files.length > 0) {
      formData.append("img_usuarios", imgInput.files[0]);
    }

   fetch(`http://localhost:3000/auth/user/${userId}`, {
      method: "PATCH",
      headers: {
        "Authorization": `Bearer ${token}`
      },
      body: formData
    })
      .then(res => {
        if (!res.ok) throw new Error("Error al actualizar");
        return res.text();
      })
      .then(() => {
        alert("Perfil actualizado correctamente");
        location.reload();
      })
      .catch(err => {
        console.error(err);
        alert("No se pudo actualizar el perfil");
      });
  });

})();
