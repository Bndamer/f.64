//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/lentes.controlador");

///MULTER///
const multer=require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname, '../public/images/lentes'));  //esta carpeta debe existir en el proyecto raiz
    },
    filename: (req, file,cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); //segundos desde 1970
    }
});
//const upload= multer({storage:"storage"}); //si son iguales simplemente lo puedeo escribir como
const upload= multer({storage});


// METODO GET Ruta para traer solo id y nombre///////
router.get('/id-nombre', controller.idModelLens);

//METODO GET//
//para tooos los lentes//
router.get('/',controller.allLens);

//para un producto,item o lente en mi caso
router.get('/:id',controller.showLens);



//METODO POST//
router.post('/', upload.single("imagenLentes"), controller.storeLens);


//// METODO PUT  ////
router.put('/:id', upload.single("imagenLentes"), controller.updateLens);


///// METODO DELETE ////
router.delete('/:id', controller.destroyLens);





//exportar las rutas,routers
module.exports= router;
