/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controller/auth.controlador");
const authMiddleware = require("../middleware/auth.middleware")


//// METODO POST  ////
router.post('/register', controller.register);
router.post('/login', controller.login);

router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hola Usuario ${req.userId}`);
});

// EXPORTAR ROUTERS
module.exports = router;