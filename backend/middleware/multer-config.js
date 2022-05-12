//---------------------------------------------//
//---------- Middleware multer ---------------//
const multer = require('multer');
const path = require("path");

const MIME_TYPES = {
    'image/jpg': 'jpg',
    'image/jpeg': 'jpg',
    'image/png': 'png'
};

const storage = multer.diskStorage({
    destination: (req, file, callback) => {  //indique à multer de placer les fichiers dans le dossier images
        callback(null, 'images');
    },
    filename: (req, file, callback) => {     // utiliser le nom d'origine, remplacer les espace par des underscor
        const name = file.originalname.split(' ').join('_');
        const extension = MIME_TYPES[file.mimetype]; // utilise le dictionnaire MIME pour trouver la bonne extension
        callback(null, name + Date.now() + '.' + extension);// on def les parametre du call back
    }
});

module.exports = multer({ storage: storage }).single('image');// on exporte multer en lui passant notre constante storage
// .single indique que l'on va gérer uniquement le téléchargement d'image



/*const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage,
    limits: { fileSize: '1000000' },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|gif/
        const mimeType = fileTypes.test(file.mimetype)
        const extname = fileTypes.test(path.extname(file.originalname))

        if (mimeType && extname) {
            return cb(null, true)
        }
        cb('Give proper files formate to upload')
    }
}).single('image')

module.exports = upload*/