const mysql = require("mysql2");

//coneccion a bbdd//
const connection =mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "",
    database : "camaras"

});

connection.connect((error) => {
if(error){
    return console.error(error);
}
console.log("Estamos conectados a la Base de Datos Cámaras");
});

//exportar del modulo la funcion connection

module.exports = connection;