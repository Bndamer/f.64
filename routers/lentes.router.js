//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/lentes.controlador");

//metodo get//
//para tooos los lentes//
router.get('/',controller.allLens);

//exportar las rutas,routers
module.exports= router;
