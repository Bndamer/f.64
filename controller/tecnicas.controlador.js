//controlador del modulo//
const db =require("../db/db");

///CAMPOS TABLA TECNICAS//
//idTecnica
//nombreTecnica	
//descripcionTecnica
//imagenTecnica

//////////////////////////////
// GET - Todas las técnicas
const allTech = (req, res) => {
    const sql = "SELECT * FROM tecnicas";
    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        res.json(rows);
    });
};

//////////////////////////////
// GET - Técnica por ID
const showTech = (req, res) => {
    const { id } = req.params;
    const sql = "SELECT * FROM tecnicas WHERE idTecnica = ?";
    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (rows.length === 0) {
            return res.status(404).json({ error: "ERROR: La técnica no existe" });
        }
        res.json(rows[0]);
    });
};

//////////////////////////////
// POST - Crear nueva técnica
const newTech = (req, res) => {
    const { nombreTecnica, descripcionTecnica } = req.body;
    const imagenTecnica = req.file ? req.file.filename : null;

    const sql = `INSERT INTO tecnicas 
        (nombreTecnica, descripcionTecnica, imagenTecnica) 
        VALUES (?, ?, ?)`;

    db.query(sql, [nombreTecnica, descripcionTecnica, imagenTecnica], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        const tecnica = { ...req.body, idTecnica: result.insertId };
        res.status(201).json(tecnica);
    });
};

//////////////////////////////
// PUT - Modificar técnica
const updateTech = (req, res) => {
    const { id } = req.params;
    const { nombreTecnica, descripcionTecnica } = req.body;
    const nuevaImagen = req.file?.filename;

    const sqlGet = "SELECT * FROM tecnicas WHERE idTecnica = ?";
    db.query(sqlGet, [id], (err, rows) => {
        if (err) return res.status(500).json({ error: "Error al buscar la técnica" });
        if (rows.length === 0) return res.status(404).json({ error: "Técnica no encontrada" });

        const tecnicaActual = rows[0];

        const sqlUpdate = `
            UPDATE tecnicas SET 
            nombreTecnica = ?, 
            descripcionTecnica = ?, 
            imagenTecnica = ? 
            WHERE idTecnica = ?`;

        const values = [
            nombreTecnica || tecnicaActual.nombreTecnica,
            descripcionTecnica || tecnicaActual.descripcionTecnica,
            nuevaImagen || tecnicaActual.imagenTecnica,
            id
        ];

        db.query(sqlUpdate, values, (error, result) => {
            if (error) return res.status(500).json({ error: "Error al actualizar la técnica" });
            res.json({ message: "Técnica actualizada correctamente" });
        });
    });
};

//////////////////////////////
// DELETE - Eliminar técnica
const destroyTech = (req, res) => {
    const { id } = req.params;
    const sql = "DELETE FROM tecnicas WHERE idTecnica = ?";

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "ERROR: La técnica no existe" });
        }
        res.json({ mensaje: "Técnica eliminada correctamente" });
    });
};

//////////////////////////////
// Exportar funciones
module.exports = {
    allTech,
    showTech,
    newTech,
    updateTech,
    destroyTech
};