//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/camaras.controlador");



//METODO GET//
//para tooos los accesorio//
router.get('/',controller.allCameras);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showCamera);



//METODO POST//
router.post('/', controller.storeCamera);


//// METODO PUT  ////
router.put('/:id', controller.updateCamera);


///// METODO DELETE ////
router.delete('/:id', controller.destroyCamera);



//exportar las rutas,routers
module.exports= router;
