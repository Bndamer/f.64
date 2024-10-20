//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/marcas.controlador");



//METODO GET//
//para tooos los accesorio//
router.get('/',controller.allMarc);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showMarc);



//METODO POST//
router.post('/', controller.storeMarc);


//// METODO PUT  ////
router.put('/:id', controller.updateMarc);


///// METODO DELETE ////
router.delete('/:id', controller.destroyMarc);



//exportar las rutas,routers
module.exports= router;