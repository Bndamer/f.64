document.getElementById('formLogin').addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener valores del formulario
    const email = document.getElementById('emailLog').value;
    const password = document.getElementById('passwordLog').value;

    // Validación simple
    if (!email || !password) {
        alert('Por favor, completá todos los campos.');
        return;
    }

    try {
        const res = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                password: password
            })
        });

        const respuesta = await res.json().catch(() => null);

        if (res.ok) {
            alert('Login exitoso');
            // Guardar token en localStorage si lo necesitás más adelante
            if (respuesta.token) {
                localStorage.setItem('token', respuesta.token);
            }
            // Redirigir a la página de backoffice
            window.location.href = '/backoffice.html';
        } else {
            alert(respuesta?.message || 'Credenciales incorrectas');
        }
    } catch (error) {
        console.error('Error en el login:', error);
        alert('Hubo un problema al conectar con el servidor.');
    }
});
