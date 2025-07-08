//controlador del modulo//
const db =require("../db/db");

//////CAMPOS TABLA LENTES //////
//idLentes
//modeloLentes
//tipolentes
//aperturaMinLentes
//aperturaMaxLentes
//distanciaFocalLentes
//marca_id
//precioLentes
//descripcionLentes
//imagenLentes


/////////////////////////////////////////////////////////////////
//////METODO GET//para todas las lentes/////////////////////////

const allLens = (req, res) => {
    const sql = "SELECT lentes.*, marcas.nombreMarcas FROM lentes JOIN marcas ON lentes.marca_id = marcas.idMarcas"; // Consulta SQL para seleccionar todas las lentes
    db.query(sql, (error, rows) => { // Ejecutar la consulta
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        res.json(rows); // Devuelve todas las lentes en formato JSON
    });
};



////////////////////////////////////////////////////////////////////
//////////////METODO GET para un item o lente//////////////////////

const showLens = (req, res) => {
    const { id } = req.params; // Extraer el ID de los parámetros de la solicitud
    const sql = "SELECT * FROM lentes WHERE idLentes = ?"; // Consulta SQL para buscar un lente por ID
    db.query(sql, [id], (error, rows) => { // Ejecutar la consulta
        console.log(rows); // Mostrar las filas obtenidas en la consola
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (rows.length == 0) {
            return res.status(400).send({ error: "ERROR: No existe el lente requerido" }); // Si no se encuentra el lente
        }
        res.json(rows[0]); // Devuelve el primer lente encontrado en formato JSON
    });
};



/////////////////
//METODO POST///
const storeLens = (req, res) => {
    const { modelo, tipo, apertura_min, apertura_max,distancia_focal_mm, marca_id, precio, descripcion } = req.body;
    const imagen = req.file?.filename ? req.file.filename : null;

    const sql = `
        INSERT INTO lentes 
        (modeloLentes, tipoLentes, aperturaMinLentes, aperturaMaxLentes, distanciaFocalLentes, marca_id, precioLentes, descripcionLentes, imagenLentes) 
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [modelo, tipo, apertura_min, apertura_max,distancia_focal_mm, marca_id, precio, descripcion, imagen];
    console.log('distancia_focal_mm:', distancia_focal_mm);

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error(error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        const lente = { ...req.body, imagen, id: result.insertId };
        res.status(201).json(lente);
    });
};



///////////////////////////////////////
//// METODO PUT - modificar lente ////
const updateLens = (req, res) => {
    const { id } = req.params;
    const {
        modelo,
        tipo,
        apertura_min,
        apertura_max,
        distancia_focal_mm,
        marca_id,
        precio,
        descripcion
    } = req.body;
    const nuevaImagen = req.file?.filename;

    // Traer primero el lente actual
    const sqlGet = "SELECT * FROM lentes WHERE idLentes = ?";
    db.query(sqlGet, [id], (err, rows) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: "Error al buscar el lente existente" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ error: "Lente no encontrado" });
        }

        const lenteActual = rows[0];

        // Usar los valores existentes si no se mandó algo nuevo
        const sqlUpdate = `
            UPDATE lentes SET 
            modeloLentes = ?, 
            tipoLentes = ?, 
            aperturaMinLentes = ?, 
            aperturaMaxLentes = ?, 
            distanciaFocalLentes = ?, 
            marca_id = ?, 
            precioLentes = ?, 
            descripcionLentes = ?, 
            imagenLentes = ?
            WHERE idLentes = ?
        `;

        const values = [
            modelo || lenteActual.modeloLentes,
            tipo || lenteActual.tipoLentes,
            apertura_min || lenteActual.aperturaMinLentes,
            apertura_max || lenteActual.aperturaMaxLentes,
            distancia_focal_mm || lenteActual.distanciaFocalLentes,
            marca_id || lenteActual.marca_id,
            precio || lenteActual.precioLentes,
            descripcion || lenteActual.descripcionLentes,
            nuevaImagen || lenteActual.imagenLentes,
            id
        ];

        db.query(sqlUpdate, values, (error, result) => {
            if (error) {
                console.error(error);
                return res.status(500).json({ error: "Error al actualizar el lente" });
            }

            res.json({ message: "Lente actualizado correctamente" });
        });
    });
};



////////////////////////
//// METODO DELETE - eliminar lente ////
const destroyLens = (req, res) => {
    const { id } = req.params; // Extraer el ID de los parámetros de la solicitud
    const sql = "DELETE FROM lentes WHERE idLentes = ?"; // Consulta SQL para eliminar un lente por ID
    db.query(sql, [id], (error, result) => { // Ejecutar la consulta
        console.log(result); // Mostrar el resultado de la consulta en la consola
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: La lente a borrar no existe" }); // Si no se eliminó ninguna fila
        }
        res.json({ mensaje: "Lente eliminada" }); // Mensaje de éxito
    }); 
};



//exportar todas las funciones del modulo
module.exports={
    allLens,
    showLens,
    storeLens,
    updateLens,
    destroyLens
};