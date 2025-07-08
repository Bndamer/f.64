//controlador del modulo//
const db =require("../db/db");

///CAMPOS TABLA CAMARAS//
//idCamaras
//modeloCamaras
//tipoCamaras
//sensorCamaras
//resolucionCamaras
//isoMinCamaras
//isoMaxCamaras
//marca_id
//precioCamaras
//imagenCamaras


///////////////////////////////////////////////////////////////////////
//////////////METODO GET/////// consultar todas las camaras///////////

const allCameras = (req, res) => {
    const sql = "SELECT * FROM camaras"; // Consulta SQL para seleccionar todas las cámaras
    db.query(sql, (error, rows) => { // Ejecuta la consulta
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        res.json(rows); // Devuelve todas las filas (cámaras) en formato JSON
    });
};




/////////////////////////////////////////////////////////////////////////
//////////////METODO GET///////consultar una cámara especifica//////////

const showCamera = (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    const sql = "SELECT * FROM camaras WHERE idCamaras = ?"; // Consulta SQL para seleccionar una cámara específica
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta
        console.log(rows); // Muestra las filas en la consola para depuración
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (rows.length == 0) {
            return res.status(400).send({ error: "ERROR: No existe la cámara requerida" }); // Manejo de caso en que no se encuentra la cámara
        }
        res.json(rows[0]); // Devuelve la cámara encontrada en la posición cero
    });
};



//////////////////////////////////////////////////////////////////////
//////////METODO POST - agregar camara nueva ////////////////////////

const storeCamera = (req, res) => {
    const { modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, precioCamaras, marca_id } = req.body;
const imagenCamaras = req.file ? req.file.filename : null;

    const sql = `
        INSERT INTO camaras 
        (modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, marca_id, precioCamaras, imagenCamaras) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, marca_id, precioCamaras, imagenCamaras];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
const camera = { ...req.body, idCamaras: result.insertId, imagenCamaras };
        res.status(201).json(camera);
    });
};



////////////////////////////////////////////////////////////////////
/////////// METODO PUT  //// modificacion de camara////////////////

const updateCamera = (req, res) => {
    const { id } = req.params;
    const { modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, precioCamaras, marca_id } = req.body;
    const nuevaImagen = req.file?.filename;

    let sql = `
        UPDATE camaras SET 
        modeloCamaras = ?, 
        tipoCamaras = ?, 
        sensorCamaras = ?, 
        resolucionCamaras = ?, 
        isoMinCamaras = ?, 
        isoMaxCamaras = ?, 
        marca_id = ?, 
        precioCamaras = ?`;

    const values = [modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, marca_id, precioCamaras];

    if (nuevaImagen) {
        sql += `, imagenCamaras = ?`;
        values.push(nuevaImagen);
    }

    sql += ` WHERE idCamaras = ?`;
    values.push(id);

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: La cámara a modificar no existe" });
        }

        const camera = { ...req.body, idCamaras: id, imagenCamaras: nuevaImagen };
        res.json(camera);
    });
};


///////////////////////////////////////////////////////////////////////
//////////////////// METODO DELETE //// eliminacion de cámara/////////

const destroyCamera = (req, res) => {
    const { id } = req.params; // Extrae el ID del parámetro de la URL
    const sql = "DELETE FROM camaras WHERE idCamaras = ?"; // Consulta SQL para eliminar la cámara

    db.query(sql, [id], (error, result) => { // Ejecuta la consulta
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La cámara a borrar no existe" }); // Manejo de caso en que no se encuentra la cámara
        }
        res.json({ mensaje: "Cámara eliminada" }); // Mensaje de éxito
    }); 
};


//exportar todas las funciones del modulo para las rutas
module.exports={
    allCameras,
    showCamera,
    storeCamera,
    updateCamera,
    destroyCamera
};