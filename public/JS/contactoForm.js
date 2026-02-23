
document.getElementById("formContacto").addEventListener("submit", function(e) {
  e.preventDefault();

  const nombre = document.getElementById("nombre").value;
  const email = document.getElementById("email").value;
  const mensaje = document.getElementById("mensaje").value;

  fetch("http://localhost:3000/contacto", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ nombre, email, mensaje })
  })
  .then(function(res) {
    if (!res.ok) {
      throw new Error("Error en la respuesta");
    }
    return res.json();
  })
  .then(function() {
    alert("Mensaje enviado correctamente 📩");
    document.getElementById("formContacto").reset();
  })
  .catch(function() {
    alert("Error al enviar el mensaje.");
  });
});