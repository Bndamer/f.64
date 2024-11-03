const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db"); // Conexión a la base de datos

const userModel = require("../models/user.modelo");
const users = require("../models/user.modelo");



//////////////////////////////////////////////////////////////////////////
//////////////////METODO POST - registro de usuarios ///////////////////////

const register = (req, res) => {
  let imagenAsubir ="";
if (req.file){
imagenAsubir = req.file.filename;
}
  const {  //informacion traida del cuerpo del body
    emailUsuario,
    aliasUsuario,
    DniUsuario,
    nombreCompletoUsuario,
    password
  } = req.body;
  /////DOBLE VERIFICACION///////
  // Verifica si el email ya existe
  db.query(
    "SELECT * FROM usuarios WHERE emailUsuario = ?",
    [emailUsuario],
    (error, existingUser) => {
      if (error) {
        console.error(error);
        return res
          .status(500)
          .send("Hubo un problema verificando si el usuario ya existe.");
      }

      if (existingUser.length > 0) {
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

          if (existingAlias.length > 0) {
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
              null,
              hash,
              imagenAsubir
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
                process.env.SECRET_KEY,
                {
                  expiresIn: "1h",
                }
              );

              res.status(201).send({ auth: true, token });
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
  const { email, password } = req.body;

  db.query(
    "SELECT * FROM usuarios WHERE emailUsuario = ?",
    [email],
    (error, user) => {
      if (error) {
        console.error(error);
        return res.status(500).send("There was a problem logging in.");
      }

      if (user.length === 0) {
        return res.status(404).send("User not found.");
      }

      // Aquí se asume que 'user' es un arreglo, tomamos el primer elemento
      const userData = user[0];

      // Imprime para depurar
      //console.log("Hash almacenado:", userData.passwordUsuario);
      //console.log("Contraseña ingresada:", password);

      const passwordIsValid = bcrypt.compareSync(
        password,
        userData.passwordUsuario
      );

      if (!passwordIsValid) {
        return res.status(401).send({ auth: false, token: null });
      }

      const token = jwt.sign(
        { id: userData.idUsuario },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        }
      );

      res.send({ auth: true, token });
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
    return res.status(400).send("No se obtuvo el ID de usuario.");
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

      // Si se encuentra el usuario, devolver la información
      const userData = results[0];
      res.status(200).send({
        id: userData.idUsuario,
        email: userData.emailUsuario,
        alias: userData.aliasUsuario,
        nombre: userData.nombreCompletoUsuario,
        Dni: userData.DniUsuario,
        ultimoLogeo: userData.ultimologeoUsuario,
        fotoPerfil : userData.img_usuarios
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
        }));

        res.status(200).send({
          count: userResponses.length, // Puedes incluir el conteo de usuarios si deseas
          users: userResponses,
          message: "Datos de los usuarios obtenidos con éxito.",
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
            if (error) {
                console.error("Error al actualizar el usuario:", error);
                return res.status(500).send("Error al actualizar el usuario.");
            }

            if (results.affectedRows === 0) {
                return res.status(404).send("Usuario no encontrado.");
            }

            res.status(200).send("Usuario actualizado con éxito.");
        }
    );
};




///////////////////////////////////////////////////////
///////METODO DELETE -ELIMINACION DE USUARIO//////////

const deleteUser = (req, res) => {
    const userId = req.params.id; // Obtener el ID del usuario de la ruta

    db.query("DELETE FROM usuarios WHERE idUsuario = ?", [userId], (error, results) => {
        if (error) {
            console.error("Error al eliminar el usuario:", error);
            return res.status(500).send("Error al eliminar el usuario.");
        }

        if (results.affectedRows === 0) {
            return res.status(404).send("Usuario no encontrado.");
        }

        res.status(200).send("Usuario eliminado con éxito.");
    });
};


//////////////////////////////////////////////////////////////////////
/////////METODO PATCH - Actualizar un solo parametro del usuario ////

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
