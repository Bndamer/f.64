//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/accesorios.controlador");



//METODO GET//
//para tooos los accesorio//
router.get('/',controller.allAccesories);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showAccesories);



//METODO POST//
router.post('/', controller.storeAccesories);


//// METODO PUT  ////
router.put('/:id', controller.updateAccesories);


///// METODO DELETE ////
router.delete('/:id', controller.destroyAccesories);



//exportar las rutas,routers
module.exports= router;
