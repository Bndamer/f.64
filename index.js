
require("dotenv").config(); //variable de entornos
const path = require("path");


const express = require("express");
const app = express();


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


app.use(express.json()); // en el cuerpo de la peticion viene un json,lo voy a transformar
//en un objeto JS y de esa maneja lo puedo utilizar
//permite procesar datos JSON en las solicitudes POST, PUT y PATCH.
app.use(express.static(__dirname + "/public"));  //configuracion acceso a la carpeta public///

app.get("/", (req, res) => {   //Ruta Raiz del proyecto
    res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.use("/auth", require("./routers/auth.router"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`http://localhost:${PORT}`));