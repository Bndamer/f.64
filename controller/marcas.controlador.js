//controlador del modulo//
const db =require("../db/db");

//////CAMPOS TABLA MARCAS/////
//idMarcas
//nombreMarcas
//paisOrigenMarcas
//añoFundacionMarcas


//////////////////////////////////////////////////////////////////////
/////////////METODO GET/// consultar todas las marcas existentes/////

const allMarc = (req, res) => {
    const sql = "SELECT * FROM marcas"; // Consulta SQL para seleccionar todas las marcas
    db.query(sql, (error, rows) => { // Ejecutar la consulta en la base de datos
        if (error) { // Manejo de errores
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows); // Retorna todas las marcas como respuesta en formato JSON
    });
};



//////////////////////////////////////////////////////////////////////
/////////////METODO GET/// consultar una marca existente/////////////

const showMarc = (req, res) => {
    const { id } = req.params; // Extrae el ID de la marca de los parámetros de la URL
    const sql = "SELECT * FROM marcas WHERE idMarcas = ?"; // Consulta SQL para seleccionar la marca por ID
    db.query(sql, [id], (error, rows) => { // Ejecutar la consulta
        console.log(rows); // muestra en consola de las filas devueltas por la consulta
        if (error) { // Manejo de errores
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length == 0) { // Verificación de si se encontró la marca
            return res.status(400).send({ error: "ERROR: No existe la marca solicitada" });
        }
        res.json(rows[0]); // Retorna la marca encontrada como respuesta en formato JSON
    });
};



///////////////////////////////////////////////////////////////////////
////////////////////METODO POST///agregar marca nueva ////////////////

const storeMarc = (req, res) => {
    const { nombreMarcas, paisOrigenMarcas, añoFundacionMarcas } = req.body; // Extrae los datos del cuerpo de la solicitud
    const sql = "INSERT INTO marcas (nombreMarcas, paisOrigenMarcas, añoFundacionMarcas) VALUES (?, ?, ?)"; // Consulta SQL para insertar una nueva marca
    db.query(sql, [nombreMarcas, paisOrigenMarcas, añoFundacionMarcas], (error, result) => { // Ejecutar la consulta
        console.log(result); // Log del resultado de la consulta
        if (error) { // Manejo de errores
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const marca = { ...req.body, idMarcas: result.insertId }; // Reconstruye el objeto de la marca con el ID asignado
        res.status(201).json(marca); // Retorna la marca creada exitosamente como respuesta en formato JSON
    }); 
};



///////////////////////////////////////////////////////////////////
/////////////// METODO PUT  /////// modificacion de marca ////////

const updateMarc = (req, res) => {
    const { id } = req.params; // El 'id' viene del parámetro en la URL
    const { nombreMarcas, paisOrigenMarcas, añoFundacionMarcas } = req.body; // Extrae los datos del cuerpo de la solicitud

    const sql = "UPDATE marcas SET nombreMarcas = ?, paisOrigenMarcas = ?, añoFundacionMarcas = ? WHERE idMarcas = ?"; // Consulta SQL para actualizar la marca

    db.query(sql, [nombreMarcas, paisOrigenMarcas, añoFundacionMarcas,id], (error, result) => { // Ejecutar la consulta y verificacion
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La marca a modificar no existe" });
        }

        const marca = { ...req.body, idMarcas: id }; // Incluyes el ID en el objeto actualizado
        res.json(marca); // Devuelves el objeto actualizado
    });
};



/////////////////////////////////////////////////////////////////
////////////// METODO DELETE //////// eliminacion de marca//////

const destroyMarc = (req, res) => {
    const { id } = req.params; // Extraemos el ID del parámetro de la URL
    const sql = "DELETE FROM marcas WHERE idMarcas = ?"; // Usamos el nombre correcto de la columna de la clave primaria

    db.query(sql, [id], (error, result) => {  //Manejo de errores,verificaciones
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La marca a borrar no existe" });
        }
        res.json({ mensaje: "Marca eliminada" }); // Mensaje de éxito
    }); 
};



//exportar todas las funciones del modulo
module.exports={
    allMarc,
    showMarc,
    storeMarc,
    updateMarc,
    destroyMarc
};