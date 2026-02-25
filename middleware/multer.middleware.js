const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
     destination:(req, file, cb)=> {
        cb(null, './images/uploads'); // esta carpeta debe existir en el proyecto
     },
     filename: (req, file, cb) =>{
        cb(null, Date.now() + path.extname(file.originalname));

     },
});


const uploads =multer({
    storage,
    fileFilter: (req, file, cb)=>{
        console.log(file);
        const filetypes = /jpg|jpeg|png|webp/;
        const mimetype = filetypes.test(file.mimetype);
        const extname = filetypes.test(
              path.extname(file.originalname).toLowerCase()
        );
        if (mimetype && extname){
             return cb(null, true);
        };
        cb("Tipo de archivo no soportado");
    },
    limits: {fileSize: 5 * 1024 * 1024}, //aprox es 5mb
});

module.exports = uploads;