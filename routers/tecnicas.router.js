const express = require("express");
const router = express.Router();

const controller = require("../controller/tecnicas.controlador"); // Asegurate que el archivo se llame así

const multer = require("multer");
const path = require("path");

// Configuración de Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/tecnicas'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage });

// GET - Todas las técnicas
router.get('/', controller.allTech);

// GET - Técnica por ID
router.get('/:id', controller.showTech);

// POST - Crear técnica
router.post('/', upload.single("imagenTecnica"), controller.newTech);

// PUT - Actualizar técnica
router.put('/:id', upload.single("imagenTecnica"), controller.updateTech);

// DELETE - Eliminar técnica
router.delete('/:id', controller.destroyTech);

module.exports = router;