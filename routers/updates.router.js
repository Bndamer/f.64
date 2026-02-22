const express = require("express");
const router = express.Router();

const controller = require("../controller/tickets.controlador");


///////////////////////////////////////////////////////////
//////////////// ACTUALIZACIONES //////////////////////////

// POST - agregar actualización
router.post('/', controller.addUpdate);

// GET - traer actualizaciones de un ticket
router.get('/:id', controller.getUpdatesByTicket);

module.exports = router;