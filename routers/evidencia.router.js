const express = require("express");
const router = express.Router();

const controller = require("../controller/evidencia.controlador");

///////////////////////
/////// MULTER ////////
///////////////////////

const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, "../public/images/evidencias"));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

/////////////////////////////////////////////////////////
////////////////////// GET //////////////////////////////
/////////////////////////////////////////////////////////

// Traer todas las evidencias
router.get("/", controller.allEvidencias);

// Traer una evidencia específica
router.get("/:id", controller.showEvidencia);

// Traer evidencias por inscripción
router.get("/inscripcion/:idInscripcion", controller.evidenciasPorInscripcion);

/////////////////////////////////////////////////////////
////////////////////// POST /////////////////////////////
/////////////////////////////////////////////////////////

// Subir nueva evidencia (con imagen)
router.post("/", upload.single("evidencia"), controller.newEvidencia);

/////////////////////////////////////////////////////////
////////////////////// PUT //////////////////////////////
/////////////////////////////////////////////////////////

// Actualizar estado u observación (admin)
router.put("/:id", controller.updateEvidencia);

/////////////////////////////////////////////////////////
////////////////////// DELETE ///////////////////////////
/////////////////////////////////////////////////////////

router.delete("/:id", controller.destroyEvidencia);

module.exports = router;