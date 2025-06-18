const express = require("express");
const router = express.Router();

const controller = require("../controller/fotografos.controlador");

// GET - Todos los fotógrafos
router.get('/', controller.allPh);

// GET - Un fotógrafo por ID
router.get('/:id', controller.showPh);

// POST - Crear fotógrafo
router.post('/', controller.newPh);

// PUT - Actualizar fotógrafo
router.put('/:id', controller.updatePh);

// DELETE - Eliminar fotógrafo
router.delete('/:id', controller.destroyPh);

module.exports = router;