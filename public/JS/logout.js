document.getElementById('logoutBtn').addEventListener('click', () => {
    const token = localStorage.getItem('token');

    if (token) {
        localStorage.removeItem('token');
        localStorage.removeItem("userId");
        localStorage.removeItem("esAdmin");
        alert('Desconexión exitosa');
    } else {
        alert('No hay sesión activa');
    }

    window.location.href = '/index.html';
    console.log('Usuario desconectado exitosamente');
});