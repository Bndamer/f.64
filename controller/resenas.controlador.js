// Controlador del módulo para manejar las reseñas
const db = require("../db/db");

//CAMPOS DE LA TABLA RESENAS/////
//idReseñas
//fkUsuarioReseñas
//comentarioReseñas
//imagenReseñas



////////////////////////////////////////////////////////////////////////////
//////// Método GET para consultar todos las reseñas existentes//////////////

const allRes = (req, res) => {
    const sql = "SELECT * FROM reseñas"; // Consulta SQL para seleccionar todas las reseñas
    db.query(sql, (error, rows) => {
        if (error) {
            // Si hay un error en la consulta, responde con un error 500
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        // Responde con todas las filas de reseñas encontradas
        res.json(rows);
    });
};



//////////////////////////////////////////////////////////////////////////////////
///////////// Método GET para consultar una reseña específica por ID/////////////

const showRes = (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la ruta
    const sql = "SELECT * FROM reseñas WHERE idReseñas = ?"; // Consulta SQL para seleccionar una reseña por su ID
    db.query(sql, [id], (error, rows) => {
        console.log(rows); // Muestra en consola las filas obtenidas
        if (error) {
            // Si hay un error en la consulta, responde con un error 500
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length == 0) {
            // Si no se encuentra ninguna reseña, responde con un error 400
            return res.status(400).send({ error: "ERROR: No existe la reseña solicitada" });
        }
        // Devuelve la primera fila de resultados (la reseña encontrada)
        res.json(rows[0]);
    });
};



/////////////////////////////////////////////////////////////////////
//////// Método POST para agregar una nueva reseña///////////

const storeRes = (req, res) => {
    const { comentarioReseñas, fechaComentarioReseñas, imagenReseñas } = req.body; // Extrae los campos del cuerpo de la solicitud
    const sql = "INSERT INTO reseñas (comentarioReseñas, fechaComentarioReseñas, imagenReseñas) VALUES (?, ?, ?)"; // Consulta SQL para insertar una nueva reseña
    db.query(sql, [comentarioReseñas, fechaComentarioReseñas, imagenReseñas], (error, result) => {
        console.log(result); // Muestra en consola el resultado de la inserción
        if (error) {
            // Si hay un error en la consulta, responde con un error 500
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        // Reconstruye el objeto de reseña incluyendo el ID generado
        const resena = { ...req.body, idReseñas: result.insertId }; // ... permite crear un nuevo objeto combinando propiedades
        // Responde con el objeto de reseña creado
        res.status(201).json(resena); // Código 201 indica que se creó el recurso exitosamente
    });
};




////////////////////////////////////////////////////////////////////////////////
//////// Método PUT para modificar datos existentes de una reseña//////////////

const updateRes = (req, res) => {
    const { id } = req.params; // Extrae el ID de los parámetros de la URL
    const { comentarioReseñas, fechaComentarioReseñas, imagenReseñas } = req.body; // Extrae los campos del cuerpo de la solicitud

    const sql = "UPDATE reseñas SET comentarioReseñas = ?, fechaComentarioReseñas = ?, imagenReseñas = ? WHERE idReseñas = ?"; // Consulta SQL para actualizar una reseña

    db.query(sql, [comentarioReseñas, fechaComentarioReseñas, imagenReseñas, id], (error, result) => {
        if (error) {
            // Si hay un error en la consulta, responde con un error 500
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            // Si no se afectaron filas, significa que la reseña no existe
            return res.status(404).send({ error: "ERROR: La reseña a modificar no existe" });
        }
        // Devuelve el objeto de reseña actualizado
        const resena = { ...req.body, idReseñas: id }; // Incluye el ID en el objeto actualizado
        res.json(resena); // Responde con el objeto actualizado
    });
};



/////////////////////////////////////////////////////////////////////
//////// Método DELETE para eliminar una reseña//////////////////////

const destroyRes = (req, res) => {
    const { id } = req.params; // Extrae el ID del parámetro de la URL
    const sql = "DELETE FROM reseñas WHERE idReseñas = ?"; // Consulta SQL para eliminar una reseña por su ID

    db.query(sql, [id], (error, result) => {
        if (error) {
            // Si hay un error en la consulta, responde con un error 500
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            // Si no se afectaron filas, significa que la reseña no existe
            return res.status(404).send({ error: "ERROR: La reseña a borrar no existe" });
        }
        // Mensaje de éxito al eliminar la reseña
        res.json({ mensaje: "Reseña eliminada" });
    });
};


// Exportar todas las funciones del módulo para ser usadas por las rutas
module.exports = {
    allRes,
    showRes,
    storeRes,
    updateRes,
    destroyRes
};