//rutas del modulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/camaras.controlador");

///MULTER///
const multer=require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname, '../public/images/camaras'));  //esta carpeta debe existir en el proyecto raiz
    },
    filename: (req, file,cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); //segundos desde 1970
    }
});
//const upload= multer({storage:"storage"}); //si son iguales simplemente lo puedeo escribir como
const upload= multer({storage});

//METODO GET//
//para tooos los accesorio//
router.get('/',controller.allCameras);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showCamera);



//METODO POST//
router.post('/', upload.single("imagenAccesorios"), controller.storeCamera);


//// METODO PUT  ////
router.put('/:id', upload.single("imagenAccesorios"), controller.updateCamera);


///// METODO DELETE ////
router.delete('/:id', controller.destroyCamera);



//exportar las rutas,routers
module.exports= router;
