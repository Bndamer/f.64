const express = require("express");
const router = express.Router();
const { search } = require("../controller/buscador.controlador");

router.get("/", search);

module.exports = router;