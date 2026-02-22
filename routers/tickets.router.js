// rutas del modulo TICKETS
const express = require("express");
const router = express.Router();

const controller = require("../controller/tickets.controlador");

/// MULTER ///
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '../public/images/tickets'));
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ storage });

///////////////////////////////////////////////////////////
///////////////////// TICKETS /////////////////////////////

// GET - todos los tickets (backoffice admin)
router.get('/', controller.allTickets);

// GET - un ticket específico
router.get('/:id', controller.showTicket);

// POST - crear ticket (usuario común)
router.post('/', upload.single("evidencia"), controller.storeTicket);

// PUT - actualizar ticket (admin)
router.put('/:id', controller.updateTicket);

//PUT - tomar y cerrar ticket (admin)
router.put('/:id/cerrar', controller.cerrarTicket);
router.put('/:id/tomar', controller.tomarTicket);   



// DELETE - eliminar ticket (admin)
router.delete('/:id', controller.destroyTicket);

module.exports = router;