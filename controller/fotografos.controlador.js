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

const allPhoto = (req, res) => {
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

const showPhoto = (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    const sql = "SELECT * FROM fotografos WHERE idFotografo = ?"; // Consulta SQL para seleccionar una cámara específica
    db.query(sql, [id], (error, rows) => { // Ejecuta la consulta
        console.log(rows); // Muestra las filas en la consola para depuración
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (rows.length == 0) {
            return res.status(400).send({ error: "ERROR: No existe la cámara requerida" }); // Manejo de caso en que no se encuentra la cámara
        }
        res.json(rows[0]); // Devuelve el fotografo encontrado en la posición cero
    });
};



//////////////////////////////////////////////////////////////////////
//////////METODO POST - agregar camara nueva ////////////////////////

const storeCamera = (req, res) => {
    const { modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, precioCamaras } = req.body; // Extrae los campos del cuerpo de la solicitud
    const sql = "INSERT INTO camaras (modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, precioCamaras) VALUES (?, ?, ?, ?, ?, ?, ?)"; // Consulta SQL para insertar una nueva cámara
    db.query(sql, [modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, precioCamaras], (error, result) => { // Ejecuta la consulta
        console.log(result); // Muestra el resultado de la consulta en la consola para depuración
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        const camera = { ...req.body, idCamaras: result.insertId }; // Reconstruye el objeto de la cámara con el ID generado
        res.status(201).json(camera); // Devuelve la cámara creada con éxito
    }); 
};



////////////////////////////////////////////////////////////////////
/////////// METODO PUT  //// modificacion de camara////////////////

const updateCamera = (req, res) => {
    const { id } = req.params; // Extrae el ID del parámetro en la URL
    const { modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, precioCamaras } = req.body; // Extrae los campos del cuerpo de la solicitud

    const sql = "UPDATE camaras SET modeloCamaras = ?, tipoCamaras = ?, sensorCamaras = ?, resolucionCamaras = ?, isoMinCamaras = ?, isoMaxCamaras = ?, precioCamaras = ? WHERE idCamaras = ?"; // Consulta SQL para actualizar los datos de la cámara

    db.query(sql, [modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras, precioCamaras, id], (error, result) => { // Ejecuta la consulta
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La cámara a modificar no existe" }); // Manejo de caso en que no se encuentra la cámara
        }

        const camera = { ...req.body, idCamaras: id }; // Reconstruye el objeto de la cámara actualizada
        res.json(camera); // Devuelve el objeto actualizado
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