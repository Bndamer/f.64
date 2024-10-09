
const express = require("express");
const app = express();


app.use(express.json()); // en el cuerpo de la peticion viene un json,lo voy a transformar
//en un objeto JS y de esa maneja lo puedo utilizar

const lentesRouter = require('./routers/lentes.router');
app.use('/lentes',lentesRouter);
//Siempre me refiera a lentes le coloco el prefijo//

app.get("/", (req, res) => {  // Ruta raíz principal del proyecto
    res.send("¡Hola Express!/-*-/*/!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));