// Controlador del módulo para manejar las reseñas
const db = require("../db/db");

//CAMPOS DE LA TABLA RESEÑAS/////
//idReseñas
//fkUsuarioReseñas
//comentarioReseñas
//fechaComentarioReseñas
//imagenReseñas
//fkLentes
//fkAccesorios
//fkCamaras



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
    const { fkUsuarioReseñas, comentarioReseñas, fechaComentarioReseñas, imagenReseñas, fkLentes, fkAccesorios, fkCamaras } = req.body;

    const sql = `
        INSERT INTO reseñas 
        (fkUsuarioReseñas, comentarioReseñas, fechaComentarioReseñas, imagenReseñas, fkLentes, fkAccesorios, fkCamaras) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        fkUsuarioReseñas,
        comentarioReseñas,
        fechaComentarioReseñas,
        imagenReseñas,
        fkLentes || null,
        fkAccesorios || null,
        fkCamaras || null
    ];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error("Error al insertar reseña:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const resena = { ...req.body, idReseñas: result.insertId };
        res.status(201).json(resena);
    });
};




////////////////////////////////////////////////////////////////////////////////
//////// Método PUT para modificar datos existentes de una reseña//////////////

const updateRes = (req, res) => {
    const { id } = req.params;
    const { comentarioReseñas, fechaComentarioReseñas, imagenReseñas, fkLentes, fkAccesorios, fkCamaras } = req.body;

    const sql = `
        UPDATE reseñas SET 
        comentarioReseñas = ?, 
        fechaComentarioReseñas = ?, 
        imagenReseñas = ?, 
        fkLentes = ?, 
        fkAccesorios = ?, 
        fkCamaras = ? 
        WHERE idReseñas = ?`;

    const values = [
        comentarioReseñas,
        fechaComentarioReseñas,
        imagenReseñas,
        fkLentes || null,
        fkAccesorios || null,
        fkCamaras || null,
        id
    ];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error("Error al actualizar reseña:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La reseña a modificar no existe" });
        }

        const resena = { ...req.body, idReseñas: id };
        res.json(resena);
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