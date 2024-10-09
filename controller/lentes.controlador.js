//controlador del modulo//
const db =require("../db/db");

//metodo get//

//para todas las lentes
const allLens =(req,res) =>{
    const sql="SELECT * FROM lentes";
    db.query(sql,(error,rows )=> {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    });
};

//exportar todas las funciones del modulo
module.exports={
    allLens,
};