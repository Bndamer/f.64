/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();

//// AUTH ////
const controller = require("../controller/auth.controlador");
const authMiddleware = require("../middleware/auth.middleware")


//// METODO POST  ////
router.post('/register', controller.register);
router.post('/login', controller.login);

//// METODO GET ////
router.get('/user/:id', authMiddleware, controller.showUser); // Obtiene la información del usuario//
router.get('/user', authMiddleware, controller.showAllUser); // Obtiene la información del usuario//

//// METODO PUT ////
router.put('/user/:id', authMiddleware, controller.updateUser); // Actualiza la información del usuario//

//// METODO DELETE ////
router.delete('/user/:id', authMiddleware, controller.deleteUser); // Elimina el usuario//


// Ruta protegida para verificar que el middleware funciona
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hola Usuario ${req.userId}`);
});

// EXPORTAR ROUTERS
module.exports = router;