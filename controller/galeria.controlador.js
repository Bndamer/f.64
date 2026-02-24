const db = require("../db/db");

///////////////////////////////////////////////////////////////
////////////// GET - Todas las fotos del usuario /////////////
///////////////////////////////////////////////////////////////

const allGalleryByUser = (req, res) => {
    const { idUsuario } = req.params;

    const sql = `
        SELECT 
            g.*, 
            c.modeloCamaras, 
            l.modeloLentes, 
            GROUP_CONCAT(t.nombreTecnica SEPARATOR ', ') AS tecnicas
        FROM galeria_fotos g
        LEFT JOIN camaras c ON g.fk_camara = c.idCamaras
        LEFT JOIN lentes l ON g.fk_lente = l.idLentes
        LEFT JOIN galeria_tecnicas gt ON g.idGaleria = gt.fk_galeria
        LEFT JOIN tecnicas t ON gt.fk_tecnica = t.idTecnica
        WHERE g.fk_usuario = ?
        GROUP BY g.idGaleria
        ORDER BY g.fecha_subidaGaleria DESC
    `;

    db.query(sql, [idUsuario], (error, rows) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR: Intente más tarde" });
        }

        res.json(rows);
    });
};

///////////////////////////////////////////////////////////////
////////////// GET - Una sola foto ////////////////////////////
///////////////////////////////////////////////////////////////

const showGallery = (req, res) => {
    const { id } = req.params;

   const sql = ` SELECT g.*, c.modeloCamaras, l.modeloLentes, GROUP_CONCAT(t.nombreTecnica SEPARATOR ', ') AS tecnicas FROM galeria_fotos g LEFT JOIN camaras c ON g.fk_camara = c.idCamaras LEFT JOIN lentes l ON g.fk_lente = l.idLentes LEFT JOIN galeria_tecnicas gt ON g.idGaleria = gt.fk_galeria LEFT JOIN tecnicas t ON gt.fk_tecnica = t.idTecnica WHERE g.idGaleria = ? GROUP BY g.idGaleria ORDER BY g.fecha_subidaGaleria DESC;
  `;

    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Foto no encontrada" });
        }

        res.json(rows[0]);
    });
};

///////////////////////////////////////////////////////////////
///////////////////// POST - Crear foto ///////////////////////
///////////////////////////////////////////////////////////////

const storeGallery = (req, res) => {

    const {
        fk_usuario,
        descripcionGaleria,
        fk_camara,
        fk_lente,
        tecnicas
    } = req.body;

    const imagen = req.file?.filename;

    const sql = `
        INSERT INTO galeria_fotos
        (fk_usuario, imagenGaleria, descripcionGaleria, fecha_subidaGaleria, fk_camara, fk_lente)
        VALUES (?, ?, ?, NOW(), ?, ?)
    `;

    const values = [
        fk_usuario,
        imagen,
        descripcionGaleria,
        fk_camara || null,
        fk_lente || null
    ];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al subir la foto" });
        }

        const idGaleria = result.insertId;

        // 🔥 Si no hay técnicas, terminamos acá
        if (!tecnicas) {
            return res.status(201).json({
                message: "Foto subida correctamente",
                idGaleria
            });
        }

        const tecnicasArray = JSON.parse(tecnicas);

        if (tecnicasArray.length === 0) {
            return res.status(201).json({
                message: "Foto subida correctamente",
                idGaleria
            });
        }

        const insertTecnicas = `
            INSERT INTO galeria_tecnicas (fk_galeria, fk_tecnica)
            VALUES ?
        `;

        const valuesTecnicas = tecnicasArray.map(idTecnica => [
            idGaleria,
            idTecnica
        ]);

        db.query(insertTecnicas, [valuesTecnicas], (err) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: "Error al guardar técnicas" });
            }

            return res.status(201).json({
                message: "Foto subida correctamente",
                idGaleria
            });
        });
    });
};

///////////////////////////////////////////////////////////////
///////////////////// PUT - Editar foto ///////////////////////
///////////////////////////////////////////////////////////////

const updateGallery = (req, res) => {
    const { id } = req.params;
    const {
        descripcionGaleria,
        fk_camara,
        fk_lente,
        tecnicas
    } = req.body;

    const sqlUpdate = `
        UPDATE galeria_fotos SET
            descripcionGaleria = ?,
            fk_camara = ?,
            fk_lente = ?
        WHERE idGaleria = ?
    `;

    db.query(sqlUpdate, [
        descripcionGaleria,
        fk_camara || null,
        fk_lente || null,
        id
    ], (error) => {

        if (error) {
            return res.status(500).json({ error: "Error al actualizar la foto" });
        }

        // 🔥 Ahora actualizar técnicas
        actualizarTecnicas(id, tecnicas, res);
    });
};

/////funcion auxiliar para actualizar técnicas al editar foto (primero borra todas las relaciones y luego inserta las nuevas)/////
function actualizarTecnicas(idGaleria, tecnicas, res) {

    const tecnicasArray = JSON.parse(tecnicas || "[]");

    // 1️⃣ borrar relaciones actuales
    const sqlDelete = "DELETE FROM galeria_tecnicas WHERE fk_galeria = ?";

    db.query(sqlDelete, [idGaleria], (err) => {

        if (err) {
            return res.status(500).json({ error: "Error limpiando técnicas" });
        }

        // 2️⃣ si no hay técnicas nuevas, terminar
        if (tecnicasArray.length === 0) {
            return res.json({ message: "Foto actualizada correctamente" });
        }

        // 3️⃣ insertar nuevas
        const values = tecnicasArray.map(idTecnica => [idGaleria, idTecnica]);

        const sqlInsert = `
            INSERT INTO galeria_tecnicas (fk_galeria, fk_tecnica)
            VALUES ?
        `;

        db.query(sqlInsert, [values], (error) => {
            if (error) {
                return res.status(500).json({ error: "Error actualizando técnicas" });
            }

            res.json({ message: "Foto actualizada correctamente" });
        });
    });
}

///////////////////////////////////////////////////////////////
//////////////////// DELETE - Eliminar foto ///////////////////
///////////////////////////////////////////////////////////////

const destroyGallery = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM galeria_fotos WHERE idGaleria = ?";

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "Error al eliminar la foto" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Foto no encontrada" });
        }

        res.json({ message: "Foto eliminada correctamente" });
    });
};

///////////////////////////////////////////////////////////////

module.exports = {
    allGalleryByUser,
    showGallery,
    storeGallery,
    updateGallery,
    destroyGallery
};