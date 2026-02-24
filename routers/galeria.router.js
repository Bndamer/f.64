const express = require("express");
const router = express.Router();

const controller = require("../controller/galeria.controlador");

////////////////
/// MULTER /////
////////////////

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/galeria'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

//////////////////////////////////////////////////////////
////////////// METODO GET ////////////////////////////////
// Traer todas las fotos de un usuario
// ej: /galeria/usuario/3
router.get('/usuario/:idUsuario', controller.allGalleryByUser);
// Traer una foto puntual
// ej: /galeria/5
router.get('/:id', controller.showGallery);


////////////// METODO POST ///////////////////////////////
// Subir foto
router.post('/', upload.single("imagenGaleria"), controller.storeGallery);

////////////// METODO PUT ////////////////////////////////
router.put('/:id', upload.single("imagenGaleria"), controller.updateGallery);

//////////////////////////////////////////////////////////
////////////// METODO DELETE /////////////////////////////
router.delete('/:id', controller.destroyGallery);


module.exports = router;