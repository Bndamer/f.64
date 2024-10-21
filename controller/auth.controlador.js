const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("../db/db"); // Conexión a la base de datos

const userModel = require("../models/user.modelo");
const users = require("../models/user.modelo");

const register = (req, res) => {
    const { aliasUsuario, DniUsuario, nombreCompletoUsuario, password } = req.body;

    // Verificar si el usuario ya existe
    db.query("SELECT * FROM usuarios WHERE aliasUsuario = ?", [aliasUsuario])
        .then(([existingUser]) => {
            if (existingUser.length > 0) {
                return res.status(400).send("User already exists.");
            }

            // Encriptar la contraseña
            const hash = bcrypt.hashSync(password, 8);

            // Insertar el nuevo usuario en la base de datos
            return db.query(
                "INSERT INTO usuarios (aliasUsuario, DniUsuario, nombreCompletoUsuario, ultimologeoUsuario, passwordUsuario) VALUES (?, ?, ?, ?, ?)",
                [aliasUsuario, DniUsuario, nombreCompletoUsuario, null, hash]
            );
        })
        .then((result) => {
            // Generar el token JWT
            const token = jwt.sign({ id: result.insertId }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            res.status(201).send({ auth: true, token });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("There was a problem registering the user.");
        });
};

const login = (req, res) => {
    const { email, password } = req.body;

    db.query("SELECT * FROM usuarios WHERE aliasUsuario = ?", [email])
        .then(([user]) => {
            if (!user) return res.status(404).send("User not found.");

            const passwordIsValid = bcrypt.compareSync(password, user.password);

            if (!passwordIsValid) {
                return res.status(401).send({ auth: false, token: null });
            }

            const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY, {
                expiresIn: "1h",
            });

            res.send({ auth: true, token });
        })
        .catch((error) => {
            console.error(error);
            res.status(500).send("There was a problem logging in.");
        });
};


module.exports = {
    register,
    login,
};