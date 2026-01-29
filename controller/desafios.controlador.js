//controlador del modulo//
const db =require("../db/db");

///CAMPOS TABLA DESAFIOS//
//idDesafio
//nombreDesafio
//consignaDesafio
//nivelDificultad
//tiempoVigenciaDias
//premioDesafio
//fechaCreacion

//NOTA : esta tabla no lleva multer dado que no tiene carga de imagenes

///////////////////////////////////////////////////////////////////////
//////////////METODO GET/////// consultar todas los desafios///////////

const allChallenge = (req, res) => {
    const sql = "SELECT * FROM desafios"; // Consulta SQL para seleccionar todas las cámaras
    db.query(sql, (error, rows) => { // Ejecuta la consulta
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        res.json(rows); // Devuelve todas las filas (desafios) en formato JSON
    });
};




/////////////////////////////////////////////////////////////////////////
//////////////METODO GET///////consultar una cámara especifica//////////

const showChallenge = (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la solicitud
    const sql = "SELECT * FROM desafios WHERE idDesafio = ?"; // Consulta SQL para seleccionar un deafio específico
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



///////////////////////////////////////////////////////////////////////
////////////////////METODO POST///agregar nuevo desafio ////////////////

const storeChallenge = (req, res) => {
    const { nombreDesafio, consignaDesafio, nivelDificultad, tiempoVigenciaDias, premioDesafio } = req.body; // Extrae los datos del cuerpo de la solicitud
    const sql = "INSERT INTO desafios (nombreDesafio, consignaDesafio, nivelDificultad, tiempoVigenciaDias, premioDesafio) VALUES (?, ?, ?, ?, ?)"; // Consulta SQL para insertar un nuevo desafío
    db.query(sql, [nombreDesafio, consignaDesafio, nivelDificultad, tiempoVigenciaDias, premioDesafio], (error, result) => { // Ejecutar la consulta
        console.log(result); // Log del resultado de la consulta
        if (error) { // Manejo de errores
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const desafio = { ...req.body, idDesafio: result.insertId }; // Reconstruye el objeto de la marca con el ID asignado
        res.status(201).json(desafio); // Retorna la marca creada exitosamente como respuesta en formato JSON
    }); 
};



///////////////////////////////////////////////////////////////////
/////////////// METODO PUT  /////// modificacion de desafio ////////

const updateChallenge = (req, res) => {
    const { id } = req.params; // El 'id' viene del parámetro en la URL
    const { nombreDesafio, consignaDesafio, nivelDificultad, tiempoVigenciaDias, premioDesafio } = req.body; // Extrae los datos del cuerpo de la solicitud

    const sql = "UPDATE desafios SET nombreDesafio = ?, consignaDesafio = ?, nivelDificultad = ?, tiempoVigenciaDias = ?, premioDesafio = ? WHERE idDesafio = ?"; // Consulta SQL para actualizar el desafío
    db.query(sql, [nombreDesafio, consignaDesafio, nivelDificultad, tiempoVigenciaDias, premioDesafio, id], (error, result) => { // Ejecutar la consulta y verificacion
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La marca a modificar no existe" });
        }

        const desafio = { ...req.body, idDesafio: id }; // Incluyes el ID en el objeto actualizado
        res.json(desafio); // Devuelves el objeto actualizado
    });
};



/////////////////////////////////////////////////////////////////
////////////// METODO DELETE //////// eliminacion de desafio//////

const destroyChallenge = (req, res) => {
    const { id } = req.params; // Extraemos el ID del parámetro de la URL
    const sql = "DELETE FROM desafios WHERE idDesafio = ?"; // Usamos el nombre correcto de la columna de la clave primaria
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
    allChallenge,
    showChallenge,
    storeChallenge,
    updateChallenge,
    destroyChallenge
};