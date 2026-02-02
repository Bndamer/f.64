/// RUTAS DEL MODULO ///
const express = require("express");
const router = express.Router();
const uploads = require("../middleware/multer.middleware")

//// AUTH ////
const controller = require("../controller/auth.controlador");
const authMiddleware = require("../middleware/auth.middleware")


//// METODO POST  ////
router.post('/register',uploads.single('img_usuarios'), controller.register);
router.post('/login', controller.login);

//// METODO GET ////
router.get('/user/:id', authMiddleware, controller.showUser); // Obtiene la información del usuario//
router.get('/user', authMiddleware, controller.showAllUser); // Obtiene la información del usuario//

//// METODO PUT ////
router.put('/user/:id',uploads.single('img_usuarios'), authMiddleware, controller.updateUser); // Actualiza la información del usuario//

//// METODO DELETE ////
router.delete('/user/:id', authMiddleware, controller.deleteUser); // Elimina el usuario//

////METODO PATCH/////
router.patch('/user/:id',uploads.single('img_usuarios'), authMiddleware, controller.UpdateOneParameterUser); // Actualiza parametros determinados del usuario//

//// CAMBIO DE CONTRASEÑA POR EL USUARIO (requiere estar logueado) ////
router.patch('/user/password/change', authMiddleware, controller.changePassword);

//// RESETEO DE CONTRASEÑA POR EL ADMINISTRADOR (requiere ser admin) ////
router.patch('/user/password/reset/:id', authMiddleware, controller.resetPasswordByAdmin);


// Ruta protegida para verificar que el middleware funciona
router.get("/protected", authMiddleware, (req, res) => {
    res.status(200).send(`Hola Usuario ${req.userId}`);
});

// EXPORTAR ROUTERS
module.exports = router;