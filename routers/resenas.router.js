//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/resenas.controlador");



//METODO GET//
//para tooos los accesorio//
router.get('/',controller.allRes);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showRes);



//METODO POST//
router.post('/', controller.storeRes);


//// METODO PUT  ////
router.put('/:id', controller.updateRes);


///// METODO DELETE ////
router.delete('/:id', controller.destroyRes);



//exportar las rutas,routers
module.exports= router;