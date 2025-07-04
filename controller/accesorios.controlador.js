//CAMPOS TABLA ACCESORIOS//
//idAccesorios
//nombreAccesorios
//descripcionAccesorios
//tipoAccesorios
//precioAccesorios
//fk_marcas
//imagenAccesorios


//controlador del modulo//
const db =require("../db/db");


//////////////////////////////////////////////////////////////////
/////////////METODO GET////para todas las accesorios/////////////
const allAccesories =(req,res) =>{
    const sql="SELECT * FROM accesorios";
    db.query(sql,(error,rows )=> {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    });
};



//////////////////////////////////////////////////////////////////
/////////////METODO GET//para un item o accesorio////////////////

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

////////////////////////////////////////////////////////////
///////////METODO POST/////////////////////////////////////

const storeAccesories = (req, res) => {
    const {
        nombreAccesorios,
        descripcionAccesorios,
        tipoAccesorios,
        precioAccesorios,
        fk_marcas
    } = req.body;

    const imagenAccesorios = req.file?.filename || "NULL";

    const sql = `
        INSERT INTO accesorios 
        (nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios, fk_marcas, imagenAccesorios) 
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios, fk_marcas, imagenAccesorios];

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error("Error al guardar accesorio:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        const accesorio = { ...req.body, imagenAccesorios, idAccesorios: result.insertId };
        res.status(201).json(accesorio);
    });
};



////////////////////////////////////////////
//// METODO PUT - actualizar accesorio ////

const updateAccesories = (req, res) => {
    const { id } = req.params;
    const {
        nombreAccesorios,
        descripcionAccesorios,
        tipoAccesorios,
        precioAccesorios,
        fk_marcas
    } = req.body;

    const nuevaImagen = req.file?.filename;

    let sql = `
        UPDATE accesorios SET 
        nombreAccesorios = ?, 
        descripcionAccesorios = ?, 
        tipoAccesorios = ?, 
        precioAccesorios = ?, 
        fk_marcas = ?
    `;

    const values = [nombreAccesorios, descripcionAccesorios, tipoAccesorios, precioAccesorios, fk_marcas];

    if (nuevaImagen) {
        sql += `, imagenAccesorios = ?`;
        values.push(nuevaImagen);
    }

    sql += ` WHERE idAccesorios = ?`;
    values.push(id);

    db.query(sql, values, (error, result) => {
        if (error) {
            console.error("Error al actualizar accesorio:", error);
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }

        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El accesorio a modificar no existe" });
        }

        const accesorio = { ...req.body, idAccesorios: id, imagenAccesorios: nuevaImagen };
        res.json(accesorio);
    });
};



//////////////////////////////////////////////////
//////// METODO DELETE - eliminar accesorio///////

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