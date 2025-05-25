if (!localStorage.getItem('token')) {
    window.location.href = '/login.html';
} //protocolo que protege que haya acceso a backoffice.hmtl Eso evita que un usuario
//  sin login entre manualmente escribiendo la URL del backoffice.
