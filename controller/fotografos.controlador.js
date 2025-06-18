//controlador del modulo//
const db =require("../db/db");

///CAMPOS TABLA FOTOGRAFOS//
//idFotografo
//nombreCompleto	
//nacionalidad
//añoNacimiento
//añoFallecimiento
//estiloFotografico
//biografia
//imagenFotografo



///////////////////////////////////////////////////////////////////////
//////////////METODO GET/////// consultar todos los fotografos///////////

const allPh = (req, res) => {
    const sql = "SELECT * FROM fotografos"; // Consulta SQL para seleccionar todas las cámaras
    db.query(sql, (error, rows) => { // Ejecuta la consulta
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        res.json(rows); // Devuelve todas las filas (fotografos) en formato JSON
    });
};




/////////////////////////////////////////////////////////////////////////
//////////////METODO GET///////consultar un fotografo especifico//////////

const showPh = (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    const sql = "SELECT * FROM fotografos WHERE idFotografo = ?"; // Consulta SQL para seleccionar una cámara específica
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta
        console.log(rows); // Muestra las filas en la consola para depuración
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (rows.length == 0) {
            return res.status(400).send({ error: "ERROR: No existe el fotografo requerido" }); // Manejo de caso en que no se encuentra
        }
        res.json(rows[0]); // Devuelve el fotografo encontrado en la posición cero
    });
};



//////////////////////////////////////////////////////////////////////
//////////METODO POST - agregar nuevo fotografo ////////////////////////

const newPh = (req, res) => {
    const { nombreCompleto,nacionalidad,añoNacimiento,añoFallecimiento,estiloFotografico,biografia,imagenFotografo
    } = req.body; // Extrae los campos del cuerpo de la solicitud
    const sql = `INSERT INTO fotografos 
        (nombreCompleto, nacionalidad, añoNacimiento, añoFallecimiento, estiloFotografico, biografia, imagenFotografo) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`; // Consulta SQL para insertar un nuevo photografo
    db.query(sql, [nombreCompleto,
        nacionalidad,
        añoNacimiento,
        añoFallecimiento,
        estiloFotografico,
        biografia,
        imagenFotografo], (error, result) => { // Ejecuta la consulta
        console.log(result); // Muestra el resultado de la consulta en la consola para depuración
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        const photo = { ...req.body, idFotografo: result.insertId }; // Reconstruye el objeto de la cámara con el ID generado
        res.status(201).json(photo); // Devuelve el ph creado con exito
    }); 
};



////////////////////////////////////////////////////////////////////
/////////// METODO PUT  //// modificacion de camara////////////////

const updatePh = (req, res) => {
    const { id } = req.params;
    const {
        nombreCompleto,nacionalidad,añoNacimiento,añoFallecimiento,estiloFotografico,biografia,imagenFotografo
    } = req.body;

    const sql = `UPDATE fotografos SET 
        nombreCompleto = ?, 
        nacionalidad = ?, 
        añoNacimiento = ?, 
        añoFallecimiento = ?, 
        estiloFotografico = ?, 
        biografia = ?, 
        imagenFotografo = ?
        WHERE idFotografo = ?`;

    db.query(sql, [
        nombreCompleto,
        nacionalidad,
        añoNacimiento,
        añoFallecimiento,
        estiloFotografico,
        biografia,
        imagenFotografo,
        id
    ], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: El fotógrafo no existe" });
        }

        const photo = { ...req.body, idFotografo: id };
        res.json(photo);
    });
};


///////////////////////////////////////////////////////////////////////
//////////////////// METODO DELETE //// eliminacion de fotografo/////////

const destroyPh = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM fotografos WHERE idFotografo = ?";

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: El fotógrafo no existe" });
        }
        res.json({ mensaje: "Fotógrafo eliminado correctamente" });
    });
};


//exportar todas las funciones del modulo para las rutas
module.exports={
    allPh,
    showPh,
    newPh,
    updatePh,
    destroyPh
};