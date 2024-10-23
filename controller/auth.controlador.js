const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db"); // Conexión a la base de datos

const userModel = require("../models/user.modelo");
const users = require("../models/user.modelo");

const register = (req, res) => {
  //////////////////METODO POST - registro de usuarios ///////////////////////
  const {
    emailUsuario,
    aliasUsuario,
    DniUsuario,
    nombreCompletoUsuario,
    password,
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
            "INSERT INTO usuarios (emailUsuario, aliasUsuario, DniUsuario, nombreCompletoUsuario, ultimologeoUsuario, passwordUsuario) VALUES (?, ?, ?, ?, ?, ?)",
            [
              emailUsuario,
              aliasUsuario,
              DniUsuario,
              nombreCompletoUsuario,
              null,
              hash,
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

///____________________________////
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

////____________________________________________________________________________////
///////METODO GET,MOSTRAR INFORMACION DE UN USUARIO//////
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
      });
    }
  );
};


// //////////METODO GET- TODOS LOS USUARIOS///////////////
//////////////////////////////////////////////////////////////////
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

//__________________________________________________________________________//
//METODO PUT,ACTUALIZAR USUARIO ////////

const updateUser = (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Token no proporcionado.");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido.");
    }

    const userId = decoded.id; // Extraemos el id del usuario del token
    const { email, aliasUsuario, DniUsuario, nombreCompletoUsuario, password } =
      req.body;

    // Si se proporciona una nueva contraseña, encriptarla
    let newPasswordHash;
    if (password) {
      newPasswordHash = bcrypt.hashSync(password, 8);
    }

    // Actualizar el usuario en la base de datos
    const updateQuery = `
            UPDATE usuarios
            SET emailUsuario = ?, aliasUsuario = ?, DniUsuario = ?, nombreCompletoUsuario = ?, passwordUsuario = ?
            WHERE idUsuario = ?
        `;

    db.query(
      updateQuery,
      [
        email,
        aliasUsuario,
        DniUsuario,
        nombreCompletoUsuario,
        newPasswordHash || null,
        userId,
      ],
      (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .send("Hubo un problema actualizando la información del usuario.");
        }

        // Verificar si se actualizó algún registro
        if (result.affectedRows === 0) {
          return res.status(404).send("Usuario no encontrado.");
        }

        res.send("Información del usuario actualizada con éxito.");
      }
    );
  });
};

//_____________________________________________________________//
///////METODO DELETE -ELIMINACION DE USUARIO//////////
const deleteUser = (req, res) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Token no proporcionado.");
  }

  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(401).send("Token inválido.");
    }

    const userId = decoded.id; // Extraemos el id del usuario del token

    // Eliminar el usuario de la base de datos
    db.query(
      "DELETE FROM usuarios WHERE idUsuario = ?",
      [userId],
      (error, result) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .send("Hubo un problema eliminando el usuario.");
        }

        // Verificar si se eliminó algún registro
        if (result.affectedRows === 0) {
          return res.status(404).send("Usuario no encontrado.");
        }

        res.send("Usuario eliminado con éxito.");
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
};
