
const express = require("express");
const app = express();

// Ruta estática si aún deseas que algunos archivos sean accesibles públicamente (opcional)
app.use(express.json()); // Esto hace accesibles todos los archivos en la misma carpeta


app.get("/", (req, res) => {  // Ruta raíz principal del proyecto
    res.send("¡Hola Express!/-*-/*/!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));