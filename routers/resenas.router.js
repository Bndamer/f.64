//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/resenas.controlador");


///MULTER///
const multer=require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname, '../public/images/reseñas'));  //esta carpeta debe existir en el proyecto raiz
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
router.get('/',controller.allRes);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showRes);



//METODO POST//
router.post('/', upload.single("imagenResenas"), controller.storeRes);


//// METODO PUT  ////
router.put('/:id', upload.single("imagenResenas"), controller.updateRes);


///// METODO DELETE ////
router.delete('/:id', controller.destroyRes);



//exportar las rutas,routers
module.exports= router;