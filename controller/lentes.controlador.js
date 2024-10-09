//controlador del modulo//
const db =require("../db/db");

//METODO GET//

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



//para un item o lente
const showLens = (req,res) => {
    const{id} = req.params;
    const sql="SELECT * FROM lentes WHERE id = ?";
    db.query(sql,[id],(error,rows )=> {
        console.log(rows);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(rows.length ==0){
            return res.status(400).send({error :"ERROR: No existe el lente requerido"});
        };
        res.json(rows[0]); //me muestra el elemento en la posucion cero si existe
    });

};

//________________________//

//METODO POST///
const storeLens = (req, res) => {
    const {modelo,tipo, apertura_min,apertura_max,distancia_focal_mm,marca_id,precio} = req.body;
    const sql = "INSERT INTO lentes (modelo,tipo, apertura_min,apertura_max,distancia_focal_mm,marca_id,precio) VALUES (?,?,?,?,?,?,?)";
    db.query(sql,[modelo,tipo, apertura_min,apertura_max,distancia_focal_mm,marca_id,precio], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const lente = {...req.body, id: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(lente); // muestra creado con exito el elemento
    });     

};


//// METODO PUT  ////
const updateLens = (req, res) => {
    const {id} = req.params;
    const {modelo,tipo, apertura_min,apertura_max,distancia_focal_mm,marca_id,precio} = req.body;
    const sql ="UPDATE lentes SET modelo = ?, tipo = ?, apertura_min = ?, apertura_max = ?, distancia_focal_mm = ? , marca_id = ? , precio = ?  WHERE id = ?";
    db.query(sql,[modelo,tipo, apertura_min,apertura_max,distancia_focal_mm,marca_id,precio,id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La lente a modificar no existe"});
        };
        
        const lente = {...req.body, ...req.params}; // ... reconstruir el objeto del body

        res.json(lente); // mostrar el elemento que existe
    });     
};


//// METODO DELETE ////
const destroyLens = (req, res) => {
    const {id} = req.params;
    const sql = "DELETE FROM lentes WHERE id = ?";
    db.query(sql,[id], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        if(result.affectedRows == 0){
            return res.status(404).send({error : "ERROR: La lente a borrar no existe"});
        };
        res.json({mensaje : "Lente Eliminada"});
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