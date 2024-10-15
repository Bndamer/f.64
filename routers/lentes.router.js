//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/lentes.controlador");

///MULTER///
const multer=require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, 'uploads');  //esta carpeta debe existir en el proyecto raiz
    },
    filename: (req, file,cb) =>{
        console.log(file);
        cb(null, Date,now() + path.extname(file.originalname)); //segundos desde 1970
    }
});
//const upload= multer({storage:"storage"}); //si son iguales simplemente lo puedeo escribir como
const upload= multer({storage});



//METODO GET//
//para tooos los lentes//
router.get('/',controller.allLens);

//para un producto,item o lente en mi caso
router.get('/:id',controller.showLens);



//METODO POST//
router.post('/', controller.storeLens);


//// METODO PUT  ////
router.put('/:id', controller.updateLens);


///// METODO DELETE ////
router.delete('/:id', controller.destroyLens);



//exportar las rutas,routers
module.exports= router;
