const db = require("../db/db");



///////TABLA TICKETS/////
//idTicket
//categoriaTicket
//tituloTicket
//descripcionTicket
//evidenciaTicket
//fechaHoraCreacionTicket
//idUsuarioCreadorTicket
//idAdminAsignado
//estadoTicket

////TABLA TICKET_ACTUALIZACIONES////
//idActualizacion
//fkTicket
//fkUsuarioAutor
//mensajeActualizacion
//fechaHoraActualizacion



////////////////////////////////////////////////////////////
////////////// METODO GET - todos los tickets /////////////

const allTickets = (req, res) => {

    const sql = `
        SELECT 
            t.idTicket,
            t.categoriaTicket,
            t.tituloTicket,
            t.descripcionTicket,
            t.evidenciaTicket,
            t.datetimeCreacionTicket,
            t.idUsuarioCreadorTicket,
            t.idAdminAsignado,
            t.estadoTicket,

            u.aliasUsuario AS creadorAlias,
            a.aliasUsuario AS adminAlias,

            COUNT(ta.idActualizacion) AS cantidadRespuestas

        FROM tickets t

        JOIN usuarios u 
            ON t.idUsuarioCreadorTicket = u.idUsuario

        LEFT JOIN usuarios a 
            ON t.idAdminAsignado = a.idUsuario

        LEFT JOIN ticket_actualizaciones ta 
            ON t.idTicket = ta.fkTicket

        GROUP BY t.idTicket

    `;

    db.query(sql, (error, rows) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        res.json(rows);
    });
};

////////////////////////////////////////////////////////////
////////////// METODO GET - un ticket /////////////////////

const showTicket = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT 
            t.idTicket,
            t.categoriaTicket,
            t.tituloTicket,
            t.descripcionTicket,
            t.evidenciaTicket,
            t.datetimeCreacionTicket,
            t.idUsuarioCreadorTicket,
            t.idAdminAsignado,
            t.estadoTicket,

            u.aliasUsuario AS creadorAlias,
            a.aliasUsuario AS adminAlias,

            COUNT(ta.idActualizacion) AS cantidadRespuestas

        FROM tickets t

        JOIN usuarios u 
            ON t.idUsuarioCreadorTicket = u.idUsuario

        LEFT JOIN usuarios a 
            ON t.idAdminAsignado = a.idUsuario

        LEFT JOIN ticket_actualizaciones ta 
            ON t.idTicket = ta.fkTicket
        WHERE t.idTicket = ?
    `;

    db.query(sql, [id], (error, rows) => {

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Ticket no encontrado" });
        }

        res.json(rows[0]);
    });
};

////////////////////////////////////////////////////////////
//////////////////// METODO POST ///////////////////////////

const storeTicket = (req, res) => {

    const {
        categoria,
        titulo,
        descripcion,
        idUsuarioCreador
    } = req.body;

    const evidencia = req.file?.filename || null;

    const sql = `
        INSERT INTO tickets 
        (categoriaTicket, tituloTicket, descripcionTicket, evidenciaTicket, idUsuarioCreadorTicket) 
        VALUES (?, ?, ?, ?, ?)
    `;

    const values = [
        categoria,
        titulo,
        descripcion,
        evidencia,
        idUsuarioCreador
    ];

    db.query(sql, values, (error, result) => {

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR al crear el ticket" });
        }

        res.status(201).json({
            message: "Ticket creado correctamente",
            idTicket: result.insertId
        });
    });
};

////////////////////////////////////////////////////////////
//////////////////// METODO PUT ////////////////////////////

const updateTicket = (req, res) => {

    const { id } = req.params;
    const {
        categoria,
        titulo,
        descripcion,
        estado,
        idAdminAsignado
    } = req.body;

    const sql = `
        UPDATE tickets SET
        categoriaTicket = ?,
        tituloTicket = ?,
        descripcionTicket = ?,
        estadoTicket = ?,
        idAdminAsignado = ?
        WHERE idTicket = ?
    `;

    const values = [
        categoria,
        titulo,
        descripcion,
        estado,
        idAdminAsignado,
        id
    ];

    db.query(sql, values, (error, result) => {

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR al actualizar el ticket" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Ticket no encontrado" });
        }

        res.json({ message: "Ticket actualizado correctamente" });
    });
};



////////////METODO PUT - tomar ticket (cambia estado a 'Asignado' y asigna admin al ticket) ////////////
const tomarTicket = (req, res) => {
  const { id } = req.params;
  const { idAdminAsignado } = req.body;

  if (!idAdminAsignado) {
    return res.status(400).json({ error: "Falta idAdminAsignado" });
  }

  const sql = `
    UPDATE tickets
    SET idAdminAsignado = ?, estadoTicket = 'abierto'
    WHERE idTicket = ?
  `;

  db.query(sql, [idAdminAsignado, id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al asignar ticket" });
    }

    res.json({ message: "Ticket asignado correctamente" });
  });
};



/////////////METODO PUT - cerrar ticket (cambia estado a 'Cerrado' cuando se termina de resolver un ticket o reporte) ////////////

const cerrarTicket = (req, res) => {
  const { id } = req.params;

  const sql = `
    UPDATE tickets
    SET estadoTicket = 'Finalizado'
    WHERE idTicket = ?
  `;

  db.query(sql, [id], (error, result) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: "Error al cerrar el ticket" });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Ticket no encontrado" });
    }

    res.json({ message: "Ticket cerrado correctamente" });
  });
};



////////////////////////////////////////////////////////////
//////////////////// METODO DELETE /////////////////////////

const destroyTicket = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM tickets WHERE idTicket = ?";

    db.query(sql, [id], (error, result) => {

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR al eliminar el ticket" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: "Ticket no encontrado" });
        }

        res.json({ message: "Ticket eliminado correctamente" });
    });
};

////////////////////////////////////////////////////////////
//////////////// AGREGAR ACTUALIZACIONES ///////////////////////////

const addUpdate = (req, res) => {


    const { fkTicket, mensajeActualizacion, fkUsuarioAutor } = req.body;

    const sqlCheck = `
        SELECT idAdminAsignado, idUsuarioCreadorTicket
        FROM tickets
        WHERE idTicket = ?
    `;

    db.query(sqlCheck, [fkTicket], (err, result) => {

        if (err) return res.status(500).json({ error: "Error servidor" });

        if (result.length === 0) {
            return res.status(404).json({ error: "Ticket no encontrado" });
        }

        const { idAdminAsignado, idUsuarioCreadorTicket} = result[0];

        const autorizado =
            fkUsuarioAutor == idAdminAsignado ||
            fkUsuarioAutor == idUsuarioCreadorTicket;
        if (!autorizado) {
            return res.status(403).json({ error: "No autorizado para actualizar este ticket" });
        }

        const sqlInsert = `
            INSERT INTO ticket_actualizaciones
            (fkTicket, fkUsuarioAutor, mensajeActualizacion)
            VALUES (?, ?, ?)
        `;

        db.query(sqlInsert, [fkTicket, fkUsuarioAutor, mensajeActualizacion],
            (error, resultInsert) => {

                if (error) {
                    return res.status(500).json({ error: "Error al agregar actualización" });
                }

                res.status(201).json({
                    message: "Actualización agregada correctamente",
                    idActualizacion: resultInsert.insertId
                });
        });
    });
};

////////////////////////////////////////////////////////////
//////////////// GET ACTUALIZACIONES ///////////////////////

const getUpdatesByTicket = (req, res) => {

    const { id } = req.params;

    const sql = `
        SELECT ta.idActualizacion,
               ta.mensajeActualizacion,
               ta.fechaHoraActualizacion,
               u.aliasUsuario
        FROM ticket_actualizaciones ta
        JOIN usuarios u ON ta.fkUsuarioAutor = u.idUsuario
        WHERE ta.fkTicket = ?
        ORDER BY ta.fechaHoraActualizacion ASC
    `;

    db.query(sql, [id], (error, rows) => {

        if (error) {
            console.error(error);
            return res.status(500).json({ error: "Error al traer actualizaciones" });
        }

        res.json(rows);
    });
};

////////////////////////////////////////////////////////////

module.exports = {
    allTickets,
    showTicket,
    storeTicket,
    updateTicket,
    tomarTicket,
    cerrarTicket,
    destroyTicket,
    addUpdate,
    getUpdatesByTicket
};
