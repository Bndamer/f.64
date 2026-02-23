document.addEventListener("DOMContentLoaded", () => {

  const botones = document.querySelectorAll(".btnParticipar");

  botones.forEach(boton => {
    boton.addEventListener("click", () => {

      const userId = localStorage.getItem("userId");

      if (userId) {
        // Está logueado
        window.location.href = "http://localhost:3000/regularUser/progreso.html";
      } else {
        // No está logueado
        window.location.href = "http://localhost:3000/login.html";
      }

    });
  });

});