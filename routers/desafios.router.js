//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/desafios.controlador");



//METODO GET//
//para tooos los accesorio//
router.get('/',controller.allChallenge);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showChallenge);
//METODO POST//
router.post('/', controller.storeChallenge);


//// METODO PUT  ////
router.put('/:id', controller.updateChallenge);

///// METODO DELETE ////
router.delete('/:id', controller.destroyChallenge);

//exportar las rutas,routers
module.exports= router;