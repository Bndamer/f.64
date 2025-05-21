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







// document.addEventListener("DOMContentLoaded", () => {
//   document.getElementById('register_form').addEventListener('submit', async (e) => {
//     e.preventDefault();

//     const form = e.target;
//     const formData = new FormData(form); // ✅ Importante: cargamos los datos reales del formulario

//     console.log('Datos enviados:',[...formData.entries()]); // <-- para ver qué estás enviando realmente

//     // Validar contraseñas antes de enviar
//     if (formData.get('password') !== formData.get('confirmPassword')) {
//       alert('Las contraseñas no coinciden.');
//       return;
//     }

//     formData.delete('confirmPassword'); // ✅ No hace falta mandarla al backend
//     console.log('Datos enviados:', [...formData.entries()]);

//     try {
//       const res = await fetch('http://localhost:3000/api/register', {
//         method: 'POST',
//         body: formData,
//       });

//       const respuesta = await res.json().catch(() => null);

//       if (res.ok) {
//         alert('Registro exitoso');
//         window.location.href = '/login.html';
//       } else {
//         alert(respuesta?.message || 'Error en el registro');
//       }
//     } catch (error) {
//       console.error('Error en la solicitud:', error);
//       alert('Hubo un problema al conectar con el servidor.');
//     }
//   });
// });






document.getElementById('register_form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    // Obtener valores del formulario
    const fullName = document.getElementById('fullName').value;
    const email = document.getElementById('email').value;
    const username = document.getElementById('username').value;
    const dni = document.getElementById('dni').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const imageInput = document.getElementById('img_usuarios'); // Input de imagen

    console.log("Contraseña:", password);
    
    // Validar contraseñas antes de enviar
    if (password !== confirmPassword) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    // Agregar datos al FormData
    formData.append('nombreCompletoUsuario', fullName);
    formData.append('emailUsuario', email);
    formData.append('aliasUsuario', username);
    formData.append('DniUsuario', dni);
    formData.append('password', password);

    // Verificar si el usuario seleccionó un archivo antes de enviarlo
    if (imageInput.files.length > 0) {
        formData.append('img_usuarios', imageInput.files[0]); // Agregar la imagen al FormData
    } else {
        console.error("No se seleccionó una imagen.");
    }

    // Verificar qué datos se están enviando
    formData.forEach((value, key) => {
        console.log(`${key}:`, value);
    });

    try {
        const res = await fetch('/api/register', {
            method: 'POST',
            body: formData // 🚀 Enviamos `FormData` para soportar imagen y texto
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

