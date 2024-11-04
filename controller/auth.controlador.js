const jwt = require("jsonwebtoken"); //importar la libreria de web token
const bcrypt = require("bcryptjs"); //importar la bcrypt para encriptar las contraseñas
const db = require("../db/db"); // Conexión a la base de datos

//const userModel = require("../models/user.modelo");
//const users = require("../models/user.modelo");

///CAMPOS TABLA USUARIOS///
//idUsuario
//nombreCompletoUsuario
//aliasUsuario
//DniUsuario
//ultimoLogeoUsuario
//emailUsuario
//passwordUsuario
//img_usuarios



//////////////////////////////////////////////////////////////////////////
//////////////////METODO POST - registro de usuarios ///////////////////////

const register = (req, res) => {
  let imagenAsubir =""; // Variable para almacenar el nombre de la imagen si se sube
if (req.file){
imagenAsubir = req.file.filename; // Si se sube una imagen, guarda el nombre del archivo
}
  const {  //informacion traida del cuerpo del body
    emailUsuario,
    aliasUsuario,
    DniUsuario,
    nombreCompletoUsuario,
    password
  } = req.body;
  /////DOBLE VERIFICACION///// Verifica si el email ya existe
  db.query(
    "SELECT * FROM usuarios WHERE emailUsuario = ?",
    [emailUsuario],
    (error, existingUser) => { //verificaciones,errores
      if (error) {     // Si ya existe un usuario con ese email
        console.error(error);
        return res
          .status(500)
          .send("Hubo un problema verificando si el usuario ya existe.");
      }

      if (existingUser.length > 0) { // Si el mail ya esta registrado
        return res
          .status(400)
          .send("Ya existe un usuario registrado con el mail ingresado.");
      }

      // Verificar si el alias ya existe
      db.query(
        "SELECT * FROM usuarios WHERE aliasUsuario = ?",
        [aliasUsuario],
        (error, existingAlias) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .send("Hubo un problema verificando si el alias ya existe.");
          }

          if (existingAlias.length > 0) {  //verifica que el alias no este en eso
            return res
              .status(400)
              .send("El alias ya está en uso, por favor elija otro.");
          }

          // Encriptar la contraseña
          const hash = bcrypt.hashSync(password, 8);

          // Insertar el nuevo usuario en la base de datos con su alias y email
          db.query(
            "INSERT INTO usuarios (emailUsuario, aliasUsuario, DniUsuario, nombreCompletoUsuario, ultimologeoUsuario, passwordUsuario, img_usuarios ) VALUES (?, ?, ?, ?, ?, ?,?)",
            [
              emailUsuario,
              aliasUsuario,
              DniUsuario,
              nombreCompletoUsuario,
              null, //ultimo logeo no se establece al registrarse
              hash, //contraseña encriptada
              imagenAsubir //nombre de la imagen
            ],
            (error, result) => {
              if (error) {
                console.error(error);
                return res
                  .status(500)
                  .send("Hubo un problema registrando, reintente.");
              }

              // Generar el token JWT
              const token = jwt.sign(
                { id: result.insertId },
                process.env.SECRET_KEY, // Clave secreta del entorno
                {
                  expiresIn: "1h", //expiracion del token,1 hora.
                }
              );

              res.status(201).send({ auth: true, token }); //en postman,aparecera respuesta exitosa si todo sale bien.
            }
          );
        }
      );
    }
  );
};




/////////////////////////////////////////////////////////////////////////
//////////////////METODO POST - loggeo de usuarios ///////////////////////

const login = (req, res) => {
  const { email, password } = req.body; // Extrae el email y la contraseña del cuerpo o postman

  db.query( // Consulta a la base de datos para encontrar al usuario por email
    "SELECT * FROM usuarios WHERE emailUsuario = ?",
    [email],
    (error, user) => {
      if (error) {  //chequeo de errores
        console.error(error);
        return res.status(500).send("There was a problem logging in."); //error de loggin
      }

      if (user.length === 0) {
        return res.status(404).send("User not found."); //usuario no encontrado
      }

      // Aquí se asume que 'user' es un arreglo, tomamos el primer elemento
      const userData = user[0];

      //consultas para verificar en consola si la contraseña esta encriptadose bien,lo implemente temporalmente para verificar errores al encriptar
      //console.log("Hash almacenado:", userData.passwordUsuario);
      //console.log("Contraseña ingresada:", password);

      const passwordIsValid = bcrypt.compareSync( // Compara la contraseña ingresada con la almacenada
        password,
        userData.passwordUsuario
      );

      if (!passwordIsValid) { // Si la contraseña es inválida
        return res.status(401).send({ auth: false, token: null });
      }

      const token = jwt.sign( // Generar el token JWT para el usuario
        { id: userData.idUsuario },
        process.env.SECRET_KEY, // Clave secreta del entorno
        {
          expiresIn: "1h", // Expiración del token en 1 hora
        }
      );

      res.send({ auth: true, token }); // Respuesta exitosa con el token
    }
  );
};



////////////////////////////////////////////////////////////////////////
///////////////METODO GET,MOSTRAR INFORMACION DE UN USUARIO//////////////

const showUser = (req, res) => {
  // Verificar si el token fue decodificado correctamente y obtener el userId
  const userId = req.params.id; // El userId "req.userId;" hace que solo se pueda acceder
  // a la info de la cuenta que esta loggeada solamente,si quiero acceder a todos los ids desde cualquier cuenta, uso "req.params.id"
  //para obtener el ID desde el parametro de rutas y no de middleware
  if (!userId) {
    return res.status(400).send("No se obtuvo el ID de usuario."); // Verifica si se recibió el ID
  }

  // Consulta a la base de datos para buscar el usuario por el ID
  db.query(
    "SELECT * FROM usuarios WHERE idUsuario = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el usuario:", error);
        return res.status(500).send("Error al obtener el usuario."); 
      }

      if (results.length === 0) { 
        return res.status(404).send("Usuario no encontrado."); // Si no se encuentra el usuario
      }

      // Si se encuentra el usuario, devolver la información
      const userData = results[0];
      res.status(200).send({
        id: userData.idUsuario,
        email: userData.emailUsuario,
        alias: userData.aliasUsuario,
        nombre: userData.nombreCompletoUsuario,
        Dni: userData.DniUsuario,
        ultimoLogeo: userData.ultimologeoUsuario,
        fotoPerfil : userData.img_usuarios // Devuelve la foto de perfil
      });
    }
  );
};



//////////////////////////////////////////////////////////////////
///////////////METODO GET- TODOS LOS USUARIOS///////////////////

const showAllUser = (req, res) => {
  // Verificar si el token fue decodificado correctamente y obtener el userId
  const userId = req.userId; // El userId debería haber sido puesto por el middleware
  if (!userId) {
    return res.status(400).send("No se obtuvo el userId.");
  }

  // Consulta a la base de datos para buscar el usuario por el ID
  db.query(
    "SELECT * FROM usuarios WHERE idUsuario = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error al obtener el usuario:", error);
        return res.status(500).send("Error al obtener el usuario.");
      }

      if (results.length === 0) {
        return res.status(404).send("Usuario no encontrado.");
      }

      // Si se encuentra el usuario, proceder a obtener todos los usuarios
      db.query("SELECT * FROM usuarios", (error, users) => {
        if (error) {
          console.error("Error al obtener todos los usuarios:", error);
          return res.status(500).send("Error al obtener todos los usuarios.");
        }

        // Si se encuentran usuarios, devolver la información
        const userResponses = users.map((user) => ({
          id: user.idUsuario,
          email: user.emailUsuario,
          alias: user.aliasUsuario,
          nombre: user.nombreCompletoUsuario,
          Dni: user.DniUsuario,
          ultimoLogeo: user.ultimologeoUsuario,
          fotoPerfil : user.img_usuarios
        }));

        res.status(200).send({ // Responde con la lista de usuarios
          count: userResponses.length, // Inclui un conteo de usuarios
          users: userResponses, //Muestra la lista de usuarios
          message: "Datos de los usuarios obtenidos con éxito.", //mensaje de exito
        });
      });
    }
  );
};



/////////////////////////////////////////////////////////////////
////////////////METODO PUT,ACTUALIZAR USUARIO //////////////////

const updateUser = (req, res) => {
    const userId = req.params.id; // Obtener el ID del usuario de la ruta
    const { email, alias, nombre, dni } = req.body; // Obtener los datos del cuerpo de la solicitud

    // Validar que se haya proporcionado el ID
    if (!userId) {
        return res.status(400).send("No se proporcionó un ID de usuario.");
    }

    // Consulta para actualizar los datos del usuario
    db.query(
        "UPDATE usuarios SET emailUsuario = ?, aliasUsuario = ?, nombreCompletoUsuario = ?, DniUsuario = ? WHERE idUsuario = ?",
        [email, alias, nombre, dni, userId],
        (error, results) => {
            if (error) {  //chequeo de errores
                console.error("Error al actualizar el usuario:", error); //muestra el error en consola
                return res.status(500).send("Error al actualizar el usuario."); //muestra en error en caso de falla
            }

            if (results.affectedRows === 0) {
                return res.status(404).send("Usuario no encontrado."); //error en caso de usuario no encontrado
            }

            res.status(200).send("Usuario actualizado con éxito."); //mensaje exitoso
        }
    );
};




///////////////////////////////////////////////////////
///////METODO DELETE -ELIMINACION DE USUARIO//////////

const deleteUser = (req, res) => {
    const userId = req.params.id; // Obtener el ID del usuario de la ruta

    db.query("DELETE FROM usuarios WHERE idUsuario = ?", [userId], (error, results) => { //chequeo de errores
        if (error) {
            console.error("Error al eliminar el usuario:", error);  //muestra de error en consola
            return res.status(500).send("Error al eliminar el usuario."); //devuelve error
        }

        if (results.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado."); //devuelve error de usuario no encontrado
        }

        res.status(200).send("Usuario eliminado con éxito."); //mensaje exitoso
    });
};


//////////////////////////////////////////////////////////////////////
/////////METODO PATCH - Actualizar un solo parametro del usuario ////
// Esta función permite actualizar uno o varios campos de un usuario
// en la base de datos sin necesidad de actualizar todos los datos.
// Se utiliza un mapeo para permitir el uso de nombres de campo más amigables
// en lugar de los nombres exactos en la base de datos.

const UpdateOneParameterUser = (req, res) => {
    const userId = req.params.id; // Obtener el ID del usuario desde la ruta
    const updates = req.body; // Obtener los datos que se desean actualizar desde el cuerpo de la solicitud

    if (!userId) {
        return res.status(400).send("No se obtuvo el ID de usuario.");
    }

    // Verificar si hay campos para actualizar
    if (Object.keys(updates).length === 0) {
        return res.status(400).send("No se proporcionaron campos para actualizar.");
    }

     // Mapeo de campos-mediante este mapeo puedo ingresar "nombre","email","alias" y "dni" en la consulta en postman 
     //y no necesito usar los nombres exactos que tiene estos campos en la base de datos
     const fieldMap = {
        nombre: "nombreCompletoUsuario",
        email: "emailUsuario",
        alias: "aliasUsuario",
        dni: "DniUsuario"
    };

    // Crear una lista de campos a actualizar y valores
    const fields = Object.keys(updates)
        .filter(key => fieldMap[key]) // Filtra solo los campos válidos
        .map(key => `${fieldMap[key]} = ?`) // Usa el mapeo para obtener el nombre correcto
        .join(", ");
    const values = Object.values(updates)
        .filter((_, index) => Object.keys(updates)[index] in fieldMap); // Filtra los valores de acuerdo con el mapeo

    // Si no hay campos válidos para actualizar
    if (fields.length === 0) {
        return res.status(400).send("No se proporcionaron campos válidos para actualizar.");
    }
    
    // Agregar el ID al final de los valores para la consulta
    values.push(userId);

    // Consulta a la base de datos
    db.query(`UPDATE usuarios SET ${fields} WHERE idUsuario = ?`, values, (error, results) => {
        if (error) {
            console.error("Error al actualizar el usuario:", error);
            return res.status(500).send("Error al actualizar el usuario.");
        }

        if (results.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado.");
        }

        res.status(200).send("Usuario actualizado con éxito.");
    });
};




module.exports = {
  register,
  login,
  showUser,
  showAllUser,
  updateUser,
  deleteUser,
  UpdateOneParameterUser
};
