//controlador del modulo//
const db =require("../db");

//metodo get//

//para todas las peliculas
const allMovie =(req,res) =>{
    const sql="SELECT * FROM peliculas";
    db.query(sql,(error,rows => {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    }))
}