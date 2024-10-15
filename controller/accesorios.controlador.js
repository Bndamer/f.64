//controlador del modulo//
const db =require("../db/db");

//METODO GET//

//para todas las accesorios
const allAccesories =(req,res) =>{
    const sql="SELECT * FROM accesorios";
    db.query(sql,(error,rows )=> {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    });
};



//para un item o accesorio
const showAccesories = (req,res) => {
    const{id} = req.params;
    const sql="SELECT * FROM accesorios WHERE idAccesorios = ?";
    db.query(sql,[id],(error,rows )=> {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length ==0){
            return res.status(400).send({error :"ERROR: No existe el lente requerido"});
        };
        res.json(rows[0]); //me muestra el elemento en la posicion cero si existe
    });

};

//________________________//

//METODO POST///
const storeAccesories = (req, res) => {
    const {nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios, fk_marcas, fkReseñas} = req.body;
    const sql = "INSERT INTO accesorios (nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios) VALUES (?, ?, ?, ?)";
    db.query(sql, [nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios, fk_marcas, fkReseñas], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const accesorio = {...req.body, idAccesorios: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(accesorio); // muestra creado con exito el elemento
    }); 

};


//// METODO PUT  ////
const updateAccesories = (req, res) => {
    const { id } = req.params; // El 'id' viene del parámetro en la URL
    const { nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios } = req.body; // Asegúrate de usar los nombres correctos de los campos

    const sql = "UPDATE accesorios SET nombreAccesorios = ?, descripcionAccesorios = ?, tipoAccesorios = ?, precioAccesorios = ?  WHERE idAccesorios = ?";

    db.query(sql, [nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El accesorio a modificar no existe" });
        }

        const accesorio = { ...req.body, idAccesorios: id }; // Incluyes el ID en el objeto actualizado
        res.json(accesorio); // Devuelves el objeto actualizado
    });
};


//// METODO DELETE ////
const destroyAccesories = (req, res) => {
    const { id } = req.params; // Extraemos el ID del parámetro de la URL
    const sql = "DELETE FROM accesorios WHERE idAccesorios = ?"; // Usamos el nombre correcto de la columna de la clave primaria

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El accesorio a borrar no existe" });
        }
        res.json({ mensaje: "Accesorio eliminado" }); // Mensaje de éxito
    }); 
};



//exportar todas las funciones del modulo
module.exports={
    allAccesories,
    showAccesories,
    storeAccesories,
    updateAccesories,
    destroyAccesories
};