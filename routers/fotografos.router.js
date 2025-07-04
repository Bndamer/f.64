const express = require("express");
const router = express.Router();

const controller = require("../controller/fotografos.controlador");

///MULTER///
const multer=require("multer");
const path =require("path");
const storage =multer.diskStorage({
    destination:(req,file,cb) => {
        cb(null, path.join(__dirname, '../public/images/fotografos'));  //esta carpeta debe existir en el proyecto raiz
    },
    filename: (req, file,cb) =>{
        console.log(file);
        cb(null, Date.now() + path.extname(file.originalname)); //segundos desde 1970
    }
});
//const upload= multer({storage:"storage"}); //si son iguales simplemente lo puedeo escribir como
const upload= multer({storage});

// GET - Todos los fotógrafos
router.get('/', controller.allPh);

// GET - Un fotógrafo por ID
router.get('/:id', controller.showPh);

// POST - Crear fotógrafo
router.post('/', upload.single("imagenFotografo"), controller.newPh);

// PUT - Actualizar fotógrafo
router.put('/:id', upload.single("imagenFotografo"), controller.updatePh);

// DELETE - Eliminar fotógrafo
router.delete('/:id', controller.destroyPh);

module.exports = router;