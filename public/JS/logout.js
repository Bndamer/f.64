document.getElementById('logoutBtn').addEventListener('click', () => {
    const token = localStorage.getItem('token');

    if (token) {
        localStorage.removeItem('token');
        alert('Desconexión exitosa');
    } else {
        alert('No hay sesión activa');
    }

    window.location.href = '/login.html';
    console.log('Usuario desconectado exitosamente');
});