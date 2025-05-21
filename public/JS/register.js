// document.getElementById("register_form").addEventListener("submit",async(e)=> {
//     e.preventDefault();
//     // console.log(e.target.elements.fullName.value);
//     // console.log(e.target.elements.email.value);
//     // console.log(e.target.elements.username.value);
//     // console.log(e.target.elements.dni.value);
//     // console.log(e.target.elements.password.value);
//     // console.log(e.target.elements.confirmPassword.value);

//     //Nos comunicamos con el backend usando fetch
//     const res = await fetch("http://localhost:3000/api/register",{
//         method:"POST",
//         headers:{
//           "Content-Type" : "application/json"
//         },
//         body: JSON.stringify({
//           fullName: e.target.elements.fullName.value,
//           email: e.target.elements.email.value,
//           username: e.target.elements.username.value,
//           dni: e.target.elements.dni.value,
//           password: e.target.elements.password.value,
//           confirmPassword : e.target.elements.confirmPassword.value
//         })
//       });
//       if(resJson.redirect){
//           window.location.href = resJson.redirect;
//       }
//     })

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById('register_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form); // ✅ Importante: cargamos los datos reales del formulario

    console.log([...formData.entries()]); // <-- para ver qué estás enviando realmente

    // Validar contraseñas antes de enviar
    if (formData.get('password') !== formData.get('confirmPassword')) {
      alert('Las contraseñas no coinciden.');
      return;
    }

    formData.delete('confirmPassword'); // ✅ No hace falta mandarla al backend

    try {
      const res = await fetch('http://localhost:3000/api/register', {
        method: 'POST',
        body: formData,
      });

      const respuesta = await res.json().catch(() => null);

      if (res.ok) {
        alert('Registro exitoso');
        window.location.href = '/login.html';
      } else {
        alert(respuesta?.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en la solicitud:', error);
      alert('Hubo un problema al conectar con el servidor.');
    }
  });
});