const db = require("../db/db");

/////////////////////////////////////////////////////////
////////////////////// GET ALL //////////////////////////
/////////////////////////////////////////////////////////

const allEvidencias = (req, res) => {

    const sql = `
        SELECT 
            e.idEvidencia,
            e.nombreArchivo,
            e.descripcion,
            e.fechaSubida,
            e.estado,
            e.observacionAdmin,
            i.idInscripcion,
            i.estado AS estadoInscripcion
        FROM evidencias_desafio e
        INNER JOIN inscripciones i 
            ON e.fkInscripcion = i.idInscripcion
        ORDER BY e.fechaSubida DESC
    `;

    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.json(rows);
    });
};

/////////////////////////////////////////////////////////
////////////////////// GET ONE //////////////////////////
/////////////////////////////////////////////////////////

const showEvidencia = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT * 
        FROM evidencias_desafio 
        WHERE idEvidencia = ?
    `;

    db.query(sql, [id], (error, rows) => {

        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Evidencia no encontrada" });
        }

        res.json(rows[0]);
    });
};

/////////////////////////////////////////////////////////
////////////////////// GET POR INSCRIPCION /////////////
/////////////////////////////////////////////////////////

const evidenciasPorInscripcion = (req, res) => {

    const { idInscripcion } = req.params;

    const sql = `
        SELECT *
        FROM evidencias_desafio
        WHERE fkInscripcion = ?
        ORDER BY fechaSubida DESC
    `;

    db.query(sql, [idInscripcion], (error, rows) => {

        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.json(rows);
    });
};

/////////////////////////////////////////////////////////
////////////////////// POST /////////////////////////////
/////////////////////////////////////////////////////////

const newEvidencia = (req, res) => {

    const { fkInscripcion, descripcion } = req.body;

    // 📸 El nombre ahora viene desde multer
    const nombreArchivo = req.file ? req.file.filename : null;

    // 🔎 Validaciones
    if (!fkInscripcion || !nombreArchivo) {
        return res.status(400).json({
            error: "fkInscripcion y la imagen son obligatorios"
        });
    }

    const sql = `
        INSERT INTO evidencias_desafio 
        (fkInscripcion, nombreArchivo, descripcion, estado)
        VALUES (?, ?, ?, 'pendiente')
    `;

    const values = [
        fkInscripcion,
        nombreArchivo,
        descripcion || null
    ];

    db.query(sql, values, (error, result) => {

        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.status(201).json({
            mensaje: "Evidencia subida correctamente",
            idEvidencia: result.insertId,
            archivo: nombreArchivo
        });
    });
};

/////////////////////////////////////////////////////////
////////////////////// PUT //////////////////////////////
/////////////////////////////////////////////////////////

const updateEvidencia = (req, res) => {

    const { id } = req.params;
    let { estado, observacionAdmin } = req.body;

    const estadosValidos = ["pendiente", "aprobada", "rechazada"];

    if (estado && !estadosValidos.includes(estado)) {
        return res.status(400).json({ error: "Estado inválido" });
    }

    const sql = `
        UPDATE evidencias_desafio
        SET estado = COALESCE(?, estado),
            observacionAdmin = COALESCE(?, observacionAdmin)
        WHERE idEvidencia = ?
    `;

    db.query(sql, [estado, observacionAdmin, id], (error, result) => {

        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Evidencia no encontrada" });
        }

        res.json({
            mensaje: "Evidencia actualizada correctamente"
        });
    });
};

/////////////////////////////////////////////////////////
////////////////////// DELETE ///////////////////////////
/////////////////////////////////////////////////////////

const destroyEvidencia = (req, res) => {

    const { id } = req.params;

    const sql = `
        DELETE FROM evidencias_desafio
        WHERE idEvidencia = ?
    `;

    db.query(sql, [id], (error, result) => {

        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Evidencia no encontrada" });
        }

        res.json({
            mensaje: "Evidencia eliminada correctamente"
        });
    });
};

module.exports = {
    allEvidencias,
    showEvidencia,
    evidenciasPorInscripcion,
    newEvidencia,
    updateEvidencia,
    destroyEvidencia
};