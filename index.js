
const express = require("express");
const app = express();


app.use(express.json()); // en el cuerpo de la peticion viene un json,lo voy a transformar
//en un objeto JS y de esa maneja lo puedo utilizar

// Rutas para lentes
const lentesRouter = require('./routers/lentes.router');
app.use('/lentes', lentesRouter);

// Rutas para cámaras
const camarasRouter = require('./routers/camaras.router');
app.use('/camaras', camarasRouter);

// Rutas para marcas
const marcasRouter = require('./routers/marcas.router');
app.use('/marcas', marcasRouter);

// Rutas para accesorios
const accesoriosRouter = require('./routers/accesorios.router');
app.use('/accesorios', accesoriosRouter);

//Rutas para reseñas
const resenasRouter =require('./routers/resenas.router');
app.use('/resenas',resenasRouter);

app.get("/", (req, res) => {  // Ruta raíz principal del proyecto
    res.send("¡Hola Express!/-*-/*/!");
});

const PORT = 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));