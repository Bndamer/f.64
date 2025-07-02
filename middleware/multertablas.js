const multer = require("multer");
const path = require("path");

function multerTablas(subcarpeta) {
    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `./images/${subcarpeta}`);
        },
        filename: (req, file, cb) => {
            cb(null, Date.now() + path.extname(file.originalname));
        },
    });

    return multer({
        storage,
        fileFilter: (req, file, cb) => {
            const filetypes = /jpg|jpeg|png|webp/;
            const mimetype = filetypes.test(file.mimetype);
            const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
            if (mimetype && extname) {
                return cb(null, true);
            }
            cb("Tipo de archivo no soportado");
        },
        limits: { fileSize: 1024 * 1024 * 3 }, // 3 MB
    });
}

module.exports = multerTablas;