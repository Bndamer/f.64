// document.addEventListener("DOMContentLoaded", function () {

//   const loginLink = document.getElementById("loginLink");
//   const loginIcon = document.getElementById("loginIcon");

//   const token = localStorage.getItem("token");
//   const esAdmin = localStorage.getItem("esAdmin");

//   if (token) {

//     // Cambiar visualmente el icono
//     if (esAdmin === "1") {
//       loginIcon.classList.add("admin-activo");
//   } else {
//       loginIcon.classList.add("usuario-activo");
//   }
//     loginLink.addEventListener("click", function (e) {
//       e.preventDefault();

//       if (esAdmin === "1") {
//         window.location.href = "/admin/adminMain.html";
//       } else {
//         window.location.href = "/regularUser/backoffice.html";
//       }
//     });

//   } else {

//     loginIcon.style.opacity = "0.6";

//     loginLink.addEventListener("click", function (e) {
//       e.preventDefault();
//       window.location.href = "/login.html";
//     });

//   }

// });




///////////////////////////////////////////////////////////////////////////////


// const token = localStorage.getItem("token");
// const esAdmin = localStorage.getItem("esAdmin");

// const loginLink = document.getElementById("loginLink");
// const dropdown = document.getElementById("userDropdown");
// const loginIcon = document.getElementById("loginIcon");
// const logoutBtn = document.getElementById("logoutBtn");
// const miCuentaBtn = document.getElementById("miCuentaBtn");
// const userMenu = document.querySelector(".user-menu");

// if (token && loginLink && dropdown && loginIcon) {

//   // Cambiar color icono
//   loginIcon.classList.add("usuario-activo");

//   // Evitar que vaya a login
//   loginLink.href = "#";

//   // Mostrar dropdown al click
//   loginLink.addEventListener("click", function(e) {
//   e.preventDefault();
//   e.stopPropagation(); // 🔥 CLAVE
//   dropdown.classList.toggle("active");
// });

//   // Mi cuenta redirige según rol
//   if (miCuentaBtn) {
//     miCuentaBtn.addEventListener("click", function(e) {
//       e.preventDefault();

//       if (esAdmin === "1") {
//         window.location.href = "/admin/adminMain.html";
//       } else {
//         window.location.href = "/regularUser/backoffice.html";
//       }
//     });
//   }

//   // Logout
//   if (logoutBtn) {
//     logoutBtn.addEventListener("click", function(e) {
//       e.preventDefault();

//       localStorage.removeItem("token");
//       localStorage.removeItem("userId");
//       localStorage.removeItem("esAdmin");

//       alert('Desconexión exitosa');
//       window.location.href = "/index.html";
//     });
//   }

//   // 🔥 Cerrar dropdown si clickean afuera
//   document.addEventListener("click", function(e) {
//   if (userMenu && !userMenu.contains(e.target)) {
//     dropdown.classList.remove("active");
//   }
// });

// } else {
//   if (dropdown) {
//     dropdown.style.display = "none";
//   }
// }

const token = localStorage.getItem("token");
const esAdmin = localStorage.getItem("esAdmin");

const loginLink = document.getElementById("loginLink");
const dropdown = document.getElementById("userDropdown");
const loginIcon = document.getElementById("loginIcon");
const logoutBtn = document.getElementById("logoutBtn");
const miCuentaBtn = document.getElementById("miCuentaBtn");
const userMenu = document.querySelector(".user-menu");

if (loginLink && dropdown && loginIcon) {

  // Si está logueado
  if (token) {
    loginIcon.classList.add("usuario-activo");
    loginLink.href = "#";
  }

  // 🔥 SIEMPRE agregamos el click
  loginLink.addEventListener("click", function(e) {

    if (token) {
      e.preventDefault();
      e.stopPropagation();
      dropdown.classList.toggle("active");
    }
    // Si no hay token, deja que vaya a login.html
  });

}

// Mi cuenta
if (miCuentaBtn) {
  miCuentaBtn.addEventListener("click", function(e) {
    e.preventDefault();

    if (esAdmin === "1") {
      window.location.href = "/admin/adminMain.html";
    } else {
      window.location.href = "/regularUser/backoffice.html";
    }
  });
}

// Logout
if (logoutBtn) {
  logoutBtn.addEventListener("click", function(e) {
    e.preventDefault();

    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("esAdmin");

    alert('Desconexión exitosa');
    window.location.href = "/index.html";
  });
}

// Cerrar si clickean afuera
document.addEventListener("click", function(e) {
  if (userMenu && !userMenu.contains(e.target)) {
    dropdown.classList.remove("active");
  }
});