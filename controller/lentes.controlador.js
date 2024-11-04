//controlador del modulo//
const db =require("../db/db");

//////CAMPOS TABLA LENTES //////
//idLentes
//modeloLentes
//tipolentes
//aperturaMinLentes
//aperturaMaxLentes
//distanciaFocalLAentes
//marca_id
//precioLentes
//fkReseñas 


/////////////////////////////////////////////////////////////////
//////METODO GET//para todas las lentes/////////////////////////

const allLens = (req, res) => {
    const sql = "SELECT * FROM lentes"; // Consulta SQL para seleccionar todas las lentes
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
    const sql = "SELECT * FROM lentes WHERE id = ?"; // Consulta SQL para buscar un lente por ID
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

//________________________//

//METODO POST///
const storeLens = (req, res) => {
    const { modelo, tipo, apertura_min, apertura_max, distancia_focal_mm, marca_id, precio } = req.body; // Extraer datos del cuerpo de la solicitud
    const sql = "INSERT INTO lentes (modelo, tipo, apertura_min, apertura_max, distancia_focal_mm, marca_id, precio) VALUES (?, ?, ?, ?, ?, ?, ?)"; // Consulta SQL para insertar un nuevo lente
    db.query(sql, [modelo, tipo, apertura_min, apertura_max, distancia_focal_mm, marca_id, precio], (error, result) => { // Ejecutar la consulta
        console.log(result); // Mostrar el resultado de la consulta en la consola
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        const lente = { ...req.body, id: result.insertId }; // Reconstruir el objeto del body y añadir el ID generado
        res.status(201).json(lente); // Devuelve el lente creado con éxito
    });
};


//// METODO PUT  ////
const updateLens = (req, res) => {
    const { id } = req.params; // Extraer el ID de los parámetros de la solicitud
    const { modelo, tipo, apertura_min, apertura_max, distancia_focal_mm, marca_id, precio } = req.body; // Extraer datos del cuerpo de la solicitud
    const sql = "UPDATE lentes SET modelo = ?, tipo = ?, apertura_min = ?, apertura_max = ?, distancia_focal_mm = ?, marca_id = ?, precio = ? WHERE id = ?"; // Consulta SQL para actualizar un lente
    db.query(sql, [modelo, tipo, apertura_min, apertura_max, distancia_focal_mm, marca_id, precio, id], (error, result) => { // Ejecutar la consulta
        console.log(result); // Mostrar el resultado de la consulta en la consola
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" }); // Manejo de errores
        }
        if (result.affectedRows == 0) {
            return res.status(404).send({ error: "ERROR: La lente a modificar no existe" }); // Si no se modifica ninguna fila
        }
        
        const lente = { ...req.body, ...req.params }; // Reconstruir el objeto del body con los parámetros
        res.json(lente); // Devuelve el lente actualizado
    });
};


//// METODO DELETE ////
const destroyLens = (req, res) => {
    const { id } = req.params; // Extraer el ID de los parámetros de la solicitud
    const sql = "DELETE FROM lentes WHERE id = ?"; // Consulta SQL para eliminar un lente por ID
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