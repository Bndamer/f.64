//controlador del modulo//
const db =require("../db/db");

//METODO GET// consultar datos existentes

//para todas las camaras
const allCameras =(req,res) =>{
    const sql="SELECT * FROM camaras";
    db.query(sql,(error,rows )=> {
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        res.json(rows);
    });
};



//para un item o camara
const showCamera = (req,res) => {
    const{id} = req.params;
    const sql="SELECT * FROM camaras WHERE idCamaras = ?";
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

//METODO POST///agregar dato nuevo
const storeCamera = (req, res) => {
    const {modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras,precioCamaras} = req.body;
    const sql = "INSERT INTO camaras (modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras,precioCamaras) VALUES (?, ?, ?, ?, ?, ?, ?)";
    db.query(sql, [modeloCamaras, tipoCmaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras,precioCamaras], (error, result) => {
        console.log(result);
        if(error){
            return res.status(500).json({error : "ERROR: Intente mas tarde por favor"});
        }
        const camera = {...req.body, idCamaras: result.insertId}; // ... reconstruir el objeto del body
        res.status(201).json(camera); // muestra creado con exito el elemento
    }); 

};


//// METODO PUT  //// modificacion de datos
const updateCamera = (req, res) => {
    const { id } = req.params; // El 'id' viene del parámetro en la URL
    const { modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras,precioCamaras } = req.body; // Asegúrate de usar los nombres correctos de los campos

    const sql = "UPDATE accesorios SET modeloCamaras = ?, tipoCamaras = ?, sensorCamaras = ?, resolucionCamaras = ?, isoMinCamaras = ?, isoMaxCamaras = ?, precioCamaras = ? WHERE idCamaras = ?";

    db.query(sql, [modeloCamaras, tipoCamaras, sensorCamaras, resolucionCamaras, isoMinCamaras, isoMaxCamaras,precioCamaras], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: El accesorio a modificar no existe" });
        }

        const camera = { ...req.body, idCamaras: id }; // Incluyes el ID en el objeto actualizado
        res.json(camera); // Devuelves el objeto actualizado
    });
};


//// METODO DELETE //// eliminacion de datos
const destroyCamera = (req, res) => {
    const { id } = req.params; // Extraemos el ID del parámetro de la URL
    const sql = "DELETE FROM camaras WHERE idCamaras = ?"; // Usamos el nombre correcto de la columna de la clave primaria

    db.query(sql, [id], (error, result) => {
        if (error) {
            return res.status(500).json({ error: "ERROR: Intente más tarde por favor" });
        }
        if (result.affectedRows === 0) {
            return res.status(404).send({ error: "ERROR: La camara a borrar no existe" });
        }
        res.json({ mensaje: "Cámara eliminada" }); // Mensaje de éxito
    }); 
};



//exportar todas las funciones del modulo
module.exports={
    allCameras,
    showCamera,
    storeCamera,
    updateCamera,
    destroyCamera
};