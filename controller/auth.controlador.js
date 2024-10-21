const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db"); // Conexión a la base de datos

const userModel = require("../models/user.modelo");
const users = require("../models/user.modelo");

const register = (req, res) => {
    const { aliasUsuario, DniUsuario, nombreCompletoUsuario, password } = req.body;

    // Verificar si el usuario ya existe
    db.query("SELECT * FROM usuarios WHERE aliasUsuario = ?", [aliasUsuario], (error, existingUser) => {
        if (error) {
            console.error(error);
            return res.status(500).send("There was a problem checking for existing user.");
        }
        
        if (existingUser.length > 0) {
            return res.status(400).send("User already exists.");
        }

        // Encriptar la contraseña
        const hash = bcrypt.hashSync(password, 8);

        // Insertar el nuevo usuario en la base de datos
        db.query(
            "INSERT INTO usuarios (aliasUsuario, DniUsuario, nombreCompletoUsuario, ultimologeoUsuario, passwordUsuario) VALUES (?, ?, ?, ?, ?)",
            [aliasUsuario, DniUsuario, nombreCompletoUsuario, null, hash],
            (error, result) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send("There was a problem registering the user.");
                }

                // Generar el token JWT
                const token = jwt.sign({ id: result.insertId }, process.env.SECRET_KEY, {
                    expiresIn: "1h",
                });

                res.status(201).send({ auth: true, token });
            }
        );
    });
};

const login = (req, res) => {
    const { email, password } = req.body;


    db.query("SELECT * FROM usuarios WHERE emailUsuario = ?", [email], (error, user) => {
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

        const passwordIsValid = bcrypt.compareSync(password, userData.passwordUsuario);

        if (!passwordIsValid) {
            return res.status(401).send({ auth: false, token: null });
        }

        const token = jwt.sign({ id: userData.idUsuario }, process.env.SECRET_KEY, {
            expiresIn: "1h",
        });

        res.send({ auth: true, token });
    });
};


module.exports = {
    register,
    login,
};