//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/accesorios.controlador");

///MULTER///
const multer=require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname, '../public/images/accesorios'));  //esta carpeta debe existir en el proyecto raiz
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
router.get('/',controller.allAccesories);

//para un producto,item o accesorio en mi caso
router.get('/:id',controller.showAccesories);



//METODO POST//
router.post('/', upload.single("imagenAccesorios"), controller.storeAccesories);


//// METODO PUT  ////
router.put('/:id', upload.single("imagenAccesorios"), controller.updateAccesories);


///// METODO DELETE ////
router.delete('/:id', controller.destroyAccesories);



//exportar las rutas,routers
module.exports= router;
