//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/lentes.controlador");

//METODO GET//
//para tooos los lentes//
router.get('/',controller.allLens);


//para un producto,item o lente en mi caso
router.get('/:id',controller.showLens);

//METODO POST//
router.post('/',controller.storeLens);

//// METODO PUT  ////
router.put('/:id', controller.updateLens);

///// METODO DELETE ////
router.delete('/:id', controller.destroyLens);


//exportar las rutas,routers
module.exports= router;
