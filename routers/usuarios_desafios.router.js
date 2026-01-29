//rutas del mopdulo//
const express = require("express");
const router= express.Router();

const controller =require("../controller/usuarios_desafios.controlador");

///MULTER///
const multer=require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname, '../public/images/desafios'));  //esta carpeta debe existir en el proyecto raiz
    },
    filename: (req, file,cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); //segundos desde 1970
    }
});
//const upload= multer({storage:"storage"}); //si son iguales simplemente lo puedeo escribir como
const upload= multer({storage});



//METODO GET//
//para todos//
router.get('/',controller.allUserChallenge);

//para un item
router.get('/:id',controller.showUserChallenge);


//METODO POST//
router.post('/', upload.single("imagenParticipante"), controller.storeUserChallenge);


//// METODO PUT  ////
router.put('/:id', upload.single("imagenParticipante"), controller.updateUserChallenge);


///// METODO DELETE ////
router.delete('/:id', controller.destroyUserChallenge);




//exportar las rutas,routers
module.exports= router;
