//controlador del modulo//
const db =require("../db/db");

//TABLA INSCRIPCIONES
//idInscripcion
//fkUsuario
//fkDesafio
//fechaInscripcion
//estado (pendiente, en progreso, completado, cancelado)
//progreso (0-100%)
//puntosObtenidos


/////////////////////////////////////////////////////////
//////////////////GET ALL INSCRIPCIONES/////////////////////
///////////////////////////////////////////////////////////

const allInscripciones = (req, res) => {

    const sql = `
        SELECT i.idInscripcion,i.fechaInscripcion,i.estado,i.progreso,i.puntosObtenidos,u.aliasUsuario,d.nombreDesafio FROM inscripciones i INNER JOIN usuarios u ON i.fkUsuario = u.idUsuario INNER JOIN desafios d ON i.fkDesafio = d.idDesafio ORDER BY i.fechaInscripcion DESC
    `;

    db.query(sql, (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.json(rows);
    });
};



/////////////////////////////////////////////////////////
//////////////////GET UNA INSCRIPCION POR ID/////////////////////
///////////////////////////////////////////////////////////

const showInscripcion = (req, res) => {
    const { id } = req.params;

    const sql = `
        SELECT 
            i.idInscripcion,
            i.fechaInscripcion,
            i.estado,
            i.progreso,
            i.puntosObtenidos,

            u.idUsuario,
            u.aliasUsuario,

            d.idDesafio,
            d.nombreDesafio,
            d.nivelDificultad,
            d.premioDesafio

        FROM inscripciones i
        INNER JOIN usuarios u ON i.fkUsuario = u.idUsuario
        INNER JOIN desafios d ON i.fkDesafio = d.idDesafio
        WHERE i.idInscripcion = ?
    `;

    db.query(sql, [id], (error, rows) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "No existe la inscripción" });
        }

        res.json(rows[0]);
    });
};



////////////////////////get de inscripciones por desafio,necesario para evaluacion del admin/////////////////
const inscripcionesPorDesafio = (req, res) => {
  const { idDesafio } = req.params;

  const sql = `
    SELECT i.idInscripcion, i.fechaInscripcion, i.estado, i.progreso, i.puntosObtenidos, 
           u.aliasUsuario
    FROM inscripciones i
    INNER JOIN usuarios u ON i.fkUsuario = u.idUsuario
    WHERE i.fkDesafio = ?
    ORDER BY i.fechaInscripcion DESC
  `;

  db.query(sql, [idDesafio], (error, rows) => {
    if (error) return res.status(500).json({ error: "Error al traer inscripciones" });
    res.json(rows);
  });
};


/////////////////////////////////////////////////////////
//////////////////POST - INSCRIPCION NUEVA/////////////////////
///////////////////////////////////////////////////////////
const newInscripcion = (req, res) => {

    const { idUsuario, idDesafio } = req.body;

    const sql = `
        INSERT INTO inscripciones (fkUsuario, fkDesafio)
        VALUES (?, ?)
    `;

    db.query(sql, [idUsuario, idDesafio], (error, result) => {

        if (error) {

            console.log("ERROR SQL:", error);

            if (error.code === "ER_DUP_ENTRY") {
                return res.status(400).json({ error: "El usuario ya está inscrito en este desafío" });
            }

            return res.status(500).json({ error: error.message });
        }

        res.status(201).json({
            mensaje: "Inscripción realizada correctamente",
            idInscripcion: result.insertId
        });
    });
};



/////////////////////////////////////////////////////////////////////////////
//////////////////Método GET → Mis desafíos (clave para frontend)////////////
////////////////////////////////////////////////////////////////////////

const misDesafios = (req, res) => {

    const { idUsuario } = req.params;
    const { estado } = req.query;

    let sql = `
        SELECT 
            i.idInscripcion,
            i.estado,
            i.progreso,
            i.puntosObtenidos,
            i.fechaInscripcion,

            d.idDesafio,
            d.nombreDesafio,
            d.nivelDificultad,
            d.tiempoVigenciaDias,
            d.premioDesafio,
            d.fechaCreacion

        FROM inscripciones i
        INNER JOIN desafios d ON i.fkDesafio = d.idDesafio
        WHERE i.fkUsuario = ?
    `;

    const values = [idUsuario];

    if (estado) {
        sql += " AND i.estado = ?";
        values.push(estado);
    }

    db.query(sql, values, (error, rows) => {

        if (error) {
            console.log(error); // 👈 importante para debug
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.json(rows);
    });
};



////////////////////////////////////////////////////////////
///////////////METODO PUT – actualizar inscripción///////////
/////////////////////////////////////////////////////////////
const updateInscripcion = (req, res) => {

    const { id } = req.params;
    let { estado, progreso, puntosObtenidos } = req.body;

    // 🔎 Validar que exista la inscripción primero
    const checkSql = "SELECT * FROM inscripciones WHERE idInscripcion = ?";

    db.query(checkSql, [id], (error, rows) => {

        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "No existe la inscripción" });
        }

        const inscripcionActual = rows[0];

        // 🧠 Si no mandan algún campo, mantener el valor actual
        estado = estado ?? inscripcionActual.estado;
        progreso = progreso ?? inscripcionActual.progreso;
        puntosObtenidos = puntosObtenidos ?? inscripcionActual.puntosObtenidos;

        // 🚦 Validar rango de progreso
        if (progreso < 0 || progreso > 100) {
            return res.status(400).json({ error: "El progreso debe estar entre 0 y 100" });
        }

        // 🎯 Si progreso llega a 100, forzar estado completado
        if (progreso === 100) {
            estado = "completado";
        }

        // 🛡 Validar estados permitidos
        const estadosValidos = ["activo", "completado", "abandonado"];

        if (!estadosValidos.includes(estado)) {
            return res.status(400).json({ error: "Estado inválido" });
        }

        const updateSql = `
            UPDATE inscripciones SET
            estado = ?,
            progreso = ?,
            puntosObtenidos = ?
            WHERE idInscripcion = ?
        `;

        const values = [estado, progreso, puntosObtenidos, id];

        db.query(updateSql, values, (error, result) => {

            if (error) {
                return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
            }

            res.json({
                mensaje: "Inscripción actualizada correctamente",
                idInscripcion: id,
                estado,
                progreso,
                puntosObtenidos
            });
        });

    });
};



////////////////////////////////////////////////////////////
///////////////METODO DELETE - ELIMINAR INSCRIPCION///////////
/////////////////////////////////////////////////////////////
const destroyInscripcion = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM inscripciones WHERE idInscripcion = ?";

    db.query(sql, [id], (error, result) => {

        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "No existe la inscripción" });
        }

        res.json({ mensaje: "Inscripción eliminada correctamente" });
    });
};


module.exports = {
    allInscripciones,
    showInscripcion,
    newInscripcion,
    misDesafios,
    updateInscripcion,
    destroyInscripcion,
    inscripcionesPorDesafio
};