//controlador del modulo//
const db =require("../db/db");

//METODO GET// consultar datos existentes

//para todas las marcas
const allMarc =(req,res) =>{
    const sql="SELECT * FROM marcas";
    db.query(sql,(error,rows )=> {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    });
};



//para un item o marca
const showMarc = (req,res) => {
    const{id} = req.params;
    const sql="SELECT * FROM marcas WHERE idMarcas = ?";
    db.query(sql,[id],(error,rows )=> {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length ==0){
            return res.status(400).send({error :"ERROR: No existe la marca solicitada"});
        };
        res.json(rows[0]); //me muestra el elemento en la posicion cero si existe
    });

};

//________________________//

//METODO POST///agregar dato nuevo
const storeMarc = (req, res) => {
    const {nombreMarcas, paisOrigenMarcas, añoFundacionMarcas} = req.body;
    const sql = "INSERT INTO marcas (nombreMarcas, paisOrigenMarcas, añoFundacionMarcas) VALUES (?, ?, ?)";
    db.query(sql, [nombreMarcas, paisOrigenMarcas, añoFundacionMarcas], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const marca = {...req.body, idMarcas: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(marca); // muestra creado con exito el elemento
    }); 

};


//// METODO PUT  //// modificacion de datos
const updateMarc = (req, res) => {
    const { id } = req.params; // El 'id' viene del parámetro en la URL
    const { nombreMarcas, paisOrigenMarcas, añoFundacionMarcas } = req.body; // Asegúrate de usar los nombres correctos de los campos

    const sql = "UPDATE marcas SET nombreMarcas = ?, paisOrigenMarcas = ?, añoFundacionMarcas = ? WHERE idMarcas = ?";

    db.query(sql, [nombreMarcas, paisOrigenMarcas, añoFundacionMarcas], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La marca a modificar no existe" });
        }

        const marca = { ...req.body, idMarcas: id }; // Incluyes el ID en el objeto actualizado
        res.json(marca); // Devuelves el objeto actualizado
    });
};


//// METODO DELETE //// eliminacion de datos
const destroyMarc = (req, res) => {
    const { id } = req.params; // Extraemos el ID del parámetro de la URL
    const sql = "DELETE FROM marcas WHERE idMarcas = ?"; // Usamos el nombre correcto de la columna de la clave primaria

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La marca a borrar no existe" });
        }
        res.json({ mensaje: "Marca eliminada" }); // Mensaje de éxito
    }); 
};



//exportar todas las funciones del modulo
module.exports={
    allMarc,
    showMarc,
    storeMarc,
    updateMarc,
    destroyMarc
};