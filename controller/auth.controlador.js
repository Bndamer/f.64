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
//edAdmin



//////////////////////////////////////////////////////////////////////////
//////////////////METODO POST - registro de usuarios ///////////////////////

const register = (req, res) => {
    const imagenAsubir = req.file ? req.file.filename : null;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

  const {  //informacion traida del cuerpo del body
    emailUsuario,
    aliasUsuario,
    DniUsuario,
    nombreCompletoUsuario,
    password
  } = req.body;

  if (!passwordRegex.test(password)) {
  return res.status(400).send("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
}
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

          


          console.log("mail que llego:", emailUsuario); // Verifica el email recibido
          console.log("Contraseña que llegó:", password); //verifica contraseña recibida

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
                  expiresIn: "2h", //expiracion del token,2 horas.
                }
              );

              res.status(201).send({ auth: true, token, id: result.insertId }); //en postman,aparecera respuesta exitosa si todo sale bien.
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
        return res.status(500).send("Hubo un problema al iniciar sesión."); //error de loggin
      }

      if (user.length === 0) {
        return res.status(404).send("Usuario no encontrado."); //usuario no encontrado
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

      console.log("*****Loggeo exitoso*****");
      console.log("Mail que llego:", email); // Verifica el email recibido
      console.log("Contraseña que llegó:", password); //verifica contraseña recibida

      // Actualizar último logeo
      const now = new Date();
      db.query(
        "UPDATE usuarios SET ultimoLogeoUsuario = ? WHERE idUsuario = ?",
        [now, userData.idUsuario],
        (err) => {
          if (err) {
            console.error("Error actualizando ultimo logeo:", err);
          }
        }
      );

      const token = jwt.sign( // Generar el token JWT para el usuario
        { id: userData.idUsuario },
        process.env.SECRET_KEY, // Clave secreta del entorno
        {
          expiresIn: "2h", // Expiración del token en 2 horas
        }
      );
      

      res.send({
  auth: true,
  token,
  id: userData.idUsuario,
  esAdmin: userData.esAdmin
}); // Respuesta exitosa con el token
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
        ultimoLogeo: userData.ultimoLogeoUsuario,
        fotoPerfil : userData.img_usuarios, // Devuelve la foto de perfil
        esAdmin: userData.esAdmin //
      });
    }
  );
};



//////////////////////////////////////////////////////////////////
///////////////METODO GET- TODOS LOS USUARIOS///////////////////

const showAllUser = (req, res) => {
  const userId = req.userId; // viene del middleware que decodifica el token

  if (!userId) {
    return res.status(400).send("No se obtuvo el userId.");
  }

  // Primero buscamos al usuario que está haciendo la solicitud
  db.query("SELECT * FROM usuarios WHERE idUsuario = ?", [userId], (error, results) => {
    if (error) {
      console.error("Error al obtener el usuario:", error);
      return res.status(500).send("Error al obtener el usuario.");
    }

    if (results.length === 0) {
      return res.status(404).send("Usuario no encontrado.");
    }

    // ✅ Acá SÍ podemos verificar si es admin
    if (results[0].esAdmin !== 1) {
      return res.status(403).send("Acceso denegado. Solo administradores.");
    }

    // Si es admin, obtener todos los usuarios
    db.query("SELECT * FROM usuarios", (error, users) => {
      if (error) {
        console.error("Error al obtener todos los usuarios:", error);
        return res.status(500).send("Error al obtener todos los usuarios.");
      }

      const userResponses = users.map((user) => ({
        id: user.idUsuario,
        email: user.emailUsuario,
        alias: user.aliasUsuario,
        nombre: user.nombreCompletoUsuario,
        Dni: user.DniUsuario,
        ultimoLogeo: user.ultimoLogeoUsuario,
        fotoPerfil: user.img_usuarios,
        esAdmin: user.esAdmin === 1 ? true : false //
      }));

      res.status(200).send({
        count: userResponses.length,
        users: userResponses,
        message: "Datos de los usuarios obtenidos con éxito."
      });
    });
  });
};



/////////////////////////////////////////////////////////////////
////////////////METODO PUT,ACTUALIZAR USUARIO //////////////////

const updateUser = (req, res) => {
    const userId = req.params.id;
    const { email, alias, nombre, dni, esAdmin, passwordUsuario } = req.body;
    const nuevaImagen = req.file ? req.file.filename : null; // Capturamos la foto nueva
    // Aceptamos '1' (string), 1 (número) o true (booleano)
    const esAdminValue = (esAdmin == 1 || esAdmin === 'true' || esAdmin === true) ? 1 : 0;
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/;

    let sql = "UPDATE usuarios SET emailUsuario = ?, aliasUsuario = ?, nombreCompletoUsuario = ?, DniUsuario = ?, esAdmin = ?";
    let values = [email, alias, nombre, dni, esAdminValue];

    // Si el admin subió una foto, la sumamos a la query
    if (nuevaImagen) {
        sql += ", img_usuarios = ?";
        values.push(nuevaImagen);
    } 

    if (passwordUsuario && passwordUsuario.trim() !== "") {
      if (!passwordRegex.test(passwordUsuario)) {
        return res.status(400).send("La contraseña debe tener al menos 8 caracteres, una mayúscula y un número.");
    }
        const hash = bcrypt.hashSync(passwordUsuario, 8);
        sql += ", passwordUsuario = ?";
        values.push(hash);
    }

    sql += " WHERE idUsuario = ?";
    values.push(userId);

    db.query(sql, values, (error, results) => {
        if (error) return res.status(500).send("Error al actualizar.");
        res.status(200).send("Usuario actualizado con éxito.");
    });
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
////////METODO QUE NO INCLUYE LA PROPIEDAD ADMIN,  ADMIN SE INCLUYE EN EL PUT////////

const UpdateOneParameterUser = (req, res) => {

    const userId = req.userId; // desde token
    const updates = { ...req.body };
    const nuevaImagen = req.file ? req.file.filename : null;

    const fieldMap = {
        nombre: "nombreCompletoUsuario",
        email: "emailUsuario",
        alias: "aliasUsuario",
        dni: "DniUsuario",
        passwordUsuario: "passwordUsuario"
    };

    const ejecutarUpdate = () => {

        let fields = Object.keys(updates)
            .filter(key => fieldMap[key])
            .map(key => `${fieldMap[key]} = ?`);

        let values = Object.keys(updates)
            .filter(key => fieldMap[key])
            .map(key => updates[key]);

        if (nuevaImagen) {
            fields.push("img_usuarios = ?");
            values.push(nuevaImagen);
        }

        if (fields.length === 0) {
            return res.status(400).send("Nada que actualizar.");
        }

        values.push(userId);

        db.query(
            `UPDATE usuarios SET ${fields.join(", ")} WHERE idUsuario = ?`,
            values,
            (error) => {
                if (error) return res.status(500).send("Error en el servidor.");
                res.status(200).send("Perfil actualizado.");
            }
        );
    };

    // 🔐 Si viene password → hasheamos primero
    if (updates.passwordUsuario) {

        bcrypt.hash(updates.passwordUsuario, 10, (err, hash) => {
            if (err) return res.status(500).send("Error al encriptar contraseña.");

            updates.passwordUsuario = hash;
            ejecutarUpdate(); // recién acá ejecutamos el UPDATE
        });

    } else {
        ejecutarUpdate(); // si no hay password, ejecutamos directo
    }
};

//////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////// cambio de contraseña de usuario regular,ingresando la contraseña anterior y la nueva////////

const changePassword = (req, res) => {
  const userId = req.userId; // Viene del middleware auth
  const { actualPassword, nuevaPassword } = req.body;

  if (!actualPassword || !nuevaPassword) {
    return res.status(400).send("Se requieren la contraseña actual y la nueva.");
  }

  db.query("SELECT passwordUsuario FROM usuarios WHERE idUsuario = ?", [userId], (error, results) => {
    if (error) {
      console.error("Error al buscar el usuario:", error);
      return res.status(500).send("Error del servidor.");
    }

    if (results.length === 0) {
      return res.status(404).send("Usuario no encontrado.");
    }

    const passwordValida = bcrypt.compareSync(actualPassword, results[0].passwordUsuario);

    if (!passwordValida) {
      return res.status(401).send("La contraseña actual es incorrecta.");
    }

    const nuevoHash = bcrypt.hashSync(nuevaPassword, 8);

    db.query("UPDATE usuarios SET passwordUsuario = ? WHERE idUsuario = ?", [nuevoHash, userId], (error) => {
      if (error) {
        console.error("Error al actualizar contraseña:", error);
        return res.status(500).send("No se pudo actualizar la contraseña.");
      }

      res.status(200).send("Contraseña actualizada con éxito.");
    });
  });
};

/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////// cambio de contraseña de usuario desde el admin,el admin no accede a la contraseña anterior ni la requiere ////////

const resetPasswordByAdmin = (req, res) => {
  const userId = req.params.id; // El usuario que el admin quiere actualizar
  const { nuevaPassword } = req.body;

  if (!nuevaPassword) {
    return res.status(400).send("Debes ingresar la nueva contraseña.");
  }

  const nuevoHash = bcrypt.hashSync(nuevaPassword, 8);

  db.query("UPDATE usuarios SET passwordUsuario = ? WHERE idUsuario = ?", [nuevoHash, userId], (error, result) => {
    if (error) {
      console.error("Error al resetear contraseña:", error);
      return res.status(500).send("No se pudo resetear la contraseña.");
    }

    if (result.affectedRows === 0) {
      return res.status(404).send("Usuario no encontrado.");
    }

    res.status(200).send("Contraseña reseteada correctamente.");
  });
};


////////////////////////////////METODO GET ESPECIAL,SOLO TRAE LO ESENCIAL DE TODOS LOS USUARIOS REGISTRADOS SIN DATOS SENSIBLES PARA EL APARTADO COMUNIDAD./////////////
const showUsersComunidad = (req, res) => {
  const userId = req.userId; // viene del token

  if (!userId) {
    return res.status(400).send("No se obtuvo el userId.");
  }

  // Opcional: verificar que el usuario existe
  db.query("SELECT * FROM usuarios WHERE idUsuario = ?", [userId], (error, results) => {
    if (error) return res.status(500).send("Error al verificar usuario.");
    if (results.length === 0) return res.status(404).send("Usuario no encontrado.");

    // Solo traer usuarios comunes (esAdmin = 0)
    db.query(
      "SELECT idUsuario, aliasUsuario, nombreCompletoUsuario, img_usuarios FROM usuarios WHERE esAdmin = 0",
      (err, users) => {
        if (err) return res.status(500).send("Error al obtener usuarios de comunidad.");

        const userResponses = users.map(u => ({
          id: u.idUsuario,
          alias: u.aliasUsuario,
          nombre: u.nombreCompletoUsuario,
          fotoPerfil: u.img_usuarios
        }));

        res.status(200).send({
          count: userResponses.length,
          users: userResponses,
          message: "Usuarios de comunidad obtenidos con éxito."
        });
      }
    );
  });
};




module.exports = {
  register,
  login,
  showUser,
  showAllUser,
  updateUser,
  deleteUser,
  UpdateOneParameterUser,
  changePassword,
  resetPasswordByAdmin,
  showUsersComunidad
};
