const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
    const authHeader = req.headers["authorization"];

    if(!authHeader)
        return res
            .status(403)
            .send({auth: false, message: "No se proveyo un token"});
    
    const token = authHeader.split(" ")[1];
    console.log("Token recibido:", token); // Verifica si el token llega bien

    if(!token)
        return res.status(403).send({auth: false, message: "Malformed Token"});

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if(error)
            return res
                .status(500)
                .send({auth: false, message: "Failed to authenticate token."});
        
        req.userId = decoded.id;

        next();
    });
};