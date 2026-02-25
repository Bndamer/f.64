

// document.getElementById('register_form').addEventListener('submit', async (e) => {
//     e.preventDefault();

    
//     const formData = new FormData();
    
//     // Obtener valores del formulario
//     const fullName = document.getElementById('fullName').value;
//     const email = document.getElementById('emailUsuario').value;
//     const username = document.getElementById('username').value;
//     const dni = document.getElementById('dni').value;
//     const password = document.getElementById('passwordUser').value;
//     const confirmPassword = document.getElementById('confirmPassword').value;
//     const imageInput = document.getElementById('img_usuarios'); // Input de imagen

//     console.log("Contraseña:", password);
    
//     // Validar contraseñas antes de enviar
//     if (password !== confirmPassword) {
//         alert('Las contraseñas no coinciden.');
//         return;
//     }

//     // Agregar datos al FormData
//     formData.append('nombreCompletoUsuario', fullName);
//     formData.append('emailUsuario', email);
//     formData.append('aliasUsuario', username);
//     formData.append('DniUsuario', dni);
//     formData.append('password', password);

//     // Verificar si el usuario seleccionó un archivo antes de enviarlo
//     if (imageInput.files.length > 0) {
//         formData.append('img_usuarios', imageInput.files[0]); // Agregar la imagen al FormData
//     } else {
//         console.log("No se seleccionó una imagen.");
//     }

//     // Verificar qué datos se están enviando
//     formData.forEach((value, key) => {
//         console.log(`${key}:`, value);
//     });

//     try {
//         const res = await fetch('/api/register', {
//             method: 'POST',
//             body: formData // 🚀 Enviamos `FormData` para soportar imagen y texto
//         });

//         const respuesta = await res.json().catch(() => null);
//         if (res.ok) {
//             alert('Registro exitoso');
//             window.location.href = '/login.html';
//         } else {
//             alert(respuesta?.message || 'Error en el registro');
//         }
//     } catch (error) {
//         console.error('Error en la solicitud:', error);
//         alert('Hubo un problema al conectar con el servidor.');
//     }
// });

document.getElementById('register_form').addEventListener('submit', function (e) {
    e.preventDefault();

    console.log("SUBMIT DETECTADO");

    const formData = new FormData();

    const fullName = document.getElementById('fullName').value.trim();
    const email = document.getElementById('emailUsuario').value.trim();
    const username = document.getElementById('username').value.trim();
    const dni = document.getElementById('dni').value.trim();
    const password = document.getElementById('passwordUser').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const imageInput = document.getElementById('img_usuarios');

    if (!fullName || !email || !username || !dni || !password || !confirmPassword) {
        alert("Todos los campos son obligatorios.");
        return;
    }

    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    formData.append('nombreCompletoUsuario', fullName);
    formData.append('emailUsuario', email);
    formData.append('aliasUsuario', username);
    formData.append('DniUsuario', dni);
    formData.append('password', password);

    if (imageInput.files.length > 0) {
        formData.append('img_usuarios', imageInput.files[0]);
    }

    fetch('/api/register', {
        method: 'POST',
        body: formData
    })
    .then(function(res) {
        return res.text();
    })
    .then(function(data) {
        console.log("RESPUESTA:", data);

        if (data.includes("Registro") || data.includes("auth")) {
            alert("Registro exitoso");
            window.location.href = '/login.html';
        } else {
            alert(data);
        }
    })
    .catch(function(error) {
        console.error("Error:", error);
        alert("Error al conectar con el servidor.");
    });
});