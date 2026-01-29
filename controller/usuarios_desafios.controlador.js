//controlador del modulo//
const db =require("../db/db");

//////CAMPOS TABLA usuarios_desafios //////
//idUsuarioDesafio
//fkDesafio
//fkUsuario
//fechaParticipacion
//imagenParticipante
//comentarioDesafio
//estado
//devolucionModerador

//NOTA: esta tabla es una tabla intermedia,a la cual se le agregan las funcionalidades de CRUD 
// dado que contiene campos adicionales que incorporan informacion,a diferencia de las otras 3 tablas intermedias
//  del proyecto que solo contienen las claves foraneas de las tablas que asisten.


/////////////////////////////////////////////////////////////////
//////METODO GET//para todas los elementos/////////////////////////

const allUserChallenge = (req, res) => {
    const sql = "SELECT * FROM usuarios_desafios"; // Consulta SQL para seleccionar todos los registros
    db.query(sql, (error, rows) => { // Ejecutar la consulta
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        res.json(rows); // Devuelve en formato JSON
    });
};



////////////////////////////////////////////////////////////////////
//////////////METODO GET para un item //////////////////////

const showUserChallenge = (req, res) => {
    const { id } = req.params; // Extraer el ID de los parámetros de la solicitud
    const sql = "SELECT * FROM usuarios_desafios WHERE idUsuarioDesafio = ?"; // Consulta SQL para buscar un registro por ID
    db.query(sql, [id], (error, rows) => { // Ejecutar la consulta
        console.log(rows); // Mostrar las filas obtenidas en la consola
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (rows.length == 0) {
            return res.status(400).send({ error: "ERROR: No existe el registro requerido" }); // Si no se encuentra el registro
        }
        res.json(rows[0]); // Devuelve el primer registro encontrado en formato JSON
    });
};

/////////////////
//METODO POST///
const storeUserChallenge = (req, res) => {
    const {
   fkUsuario,
   fkDesafio,
   fechaParticipacion,
   comentarioDesafio,
   estado,
   devolucionModerador
} = req.body;
    const imagenParticipante = req.file?.filename ? req.file.filename : null;

    const sql = `
        INSERT INTO usuarios_desafios 
        (fkUsuario, fkDesafio,fechaParticipacion, imagenParticipante, comentarioDesafio, estado, devolucionModerador) 
        VALUES (?, ?, ?, ?, ?, ?, ?)`;

    const values = [
  fkUsuario,
  fkDesafio,
  fechaParticipacion,
  imagenParticipante,
  comentarioDesafio,
  estado,
  devolucionModerador
];
    db.query(sql, values, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        const participante = { ...req.body, imagenParticipante, id: result.insertId };
        res.status(201).json(participante);
    });
};



///////////////////////////////////////
//// METODO PUT - modificar participante ////
const updateUserChallenge = (req, res) => {
    const { id } = req.params;
    const {
  fechaParticipacion,
  comentarioDesafio,
  estado,
  devolucionModerador
} = req.body;
    const nuevaImagenParticipante = req.file?.filename ? req.file.filename : null;

    // Traer primero el actual
    const sqlGet = "SELECT * FROM usuarios_desafios WHERE idUsuarioDesafio = ?";
    db.query(sqlGet, [id], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al buscar el participante existente" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Participante no encontrado" });
        }

        const participanteActual = rows[0];

        // Usar los valores existentes si no se mandó algo nuevo
        const sqlUpdate = `
            UPDATE usuarios_desafios SET 
            fechaParticipacion = ?, 
            imagenParticipante = ?, 
            comentarioDesafio = ?, 
            estado = ?, 
            devolucionModerador = ?
            WHERE idUsuarioDesafio = ?
        `;

        const values = [
            fechaParticipacion || participanteActual.fechaParticipacion,
            nuevaImagenParticipante || participanteActual.imagenParticipante,
            comentarioDesafio || participanteActual.comentarioDesafio,
            estado || participanteActual.estado,
            devolucionModerador || participanteActual.devolucionModerador,
            id
        ];

        db.query(sqlUpdate, values, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Error al actualizar el participante" });
            }

            res.json({ message: "Participante actualizado correctamente" });
        });
    });
};



////////////////////////
//// METODO DELETE - eliminar ////
const destroyUserChallenge = (req, res) => {
    const { id } = req.params; // Extraer el ID de los parámetros de la solicitud
    const sql = "DELETE FROM usuarios_desafios WHERE idUsuarioDesafio = ?"; // Consulta SQL para eliminar un participante por ID
    db.query(sql, [id], (error, result) => { // Ejecutar la consulta
        console.log(result); // Mostrar el resultado de la consulta en la consola
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: El participante a borrar no existe" }); // Si no se eliminó ninguna fila
        }
        res.json({ mensaje: "Participante eliminado" }); // Mensaje de éxito
    }); 
};




//exportar todas las funciones del modulo
module.exports={
    allUserChallenge,
    showUserChallenge,
    storeUserChallenge,
    updateUserChallenge,
    destroyUserChallenge
};