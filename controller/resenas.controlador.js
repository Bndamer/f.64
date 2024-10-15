//controlador del modulo//
const db =require("../db/db");

//METODO GET// consultar datos existentes

//para todas las marcas
const allRes =(req,res) =>{
    const sql="SELECT * FROM reseñas";
    db.query(sql,(error,rows )=> {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    });
};



//para un item o marca
const showRes = (req,res) => {
    const{id} = req.params;
    const sql="SELECT * FROM reseñas WHERE idReseñas = ?";
    db.query(sql,[id],(error,rows )=> {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length ==0){
            return res.status(400).send({error :"ERROR: No existe la reseña solicitada"});
        };
        res.json(rows[0]); //me muestra el elemento en la posicion cero si existe
    });

};

//________________________//

//METODO POST///agregar dato nuevo
const storeRes = (req, res) => {
    const {comentarioReseñas, fechaComentarioReseñas, imagenReseñas} = req.body;
    const sql = "INSERT INTO reseñas (comentarioReseñas, fechaComentarioReseñas, imagenReseñas) VALUES (?, ?, ?)";
    db.query(sql, [comentarioReseñas, fechaComentarioReseñas, imagenReseñas], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const resena = {...req.body, idReseñas: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(resena); // muestra creado con exito el elemento
    }); 

};


//// METODO PUT  //// modificacion de datos
const updateRes = (req, res) => {
    const { id } = req.params; // El 'id' viene del parámetro en la URL
    const { comentarioReseñas, fechaComentarioReseñas, imagenReseñas } = req.body; // Asegúrate de usar los nombres correctos de los campos

    const sql = "UPDATE marcas SET comentarioReseñas = ?, fechaComentarioReseñas = ?, imagenReseñas = ? WHERE idReseñas = ?";

    db.query(sql, [comentarioReseñas, fechaComentarioReseñas, imagenReseñas], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La reseña a modificar no existe" });
        }

        const resena = { ...req.body, idReseñas: id }; // Incluyes el ID en el objeto actualizado
        res.json(resena); // Devuelves el objeto actualizado
    });
};


//// METODO DELETE //// eliminacion de datos
const destroyRes = (req, res) => {
    const { id } = req.params; // Extraemos el ID del parámetro de la URL
    const sql = "DELETE FROM reseñas WHERE idReseñas = ?"; // Usamos el nombre correcto de la columna de la clave primaria

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La reseña a borrar no existe" });
        }
        res.json({ mensaje: "Reseña eliminada" }); // Mensaje de éxito
    }); 
};



//exportar todas las funciones del modulo
module.exports={
    allRes,
    showRes,
    storeRes,
    updateRes,
    destroyRes
};