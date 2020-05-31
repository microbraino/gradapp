const jwt = require('jsonwebtoken');
const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const multer = require('multer');
const config = require('../config/general')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // mkdirp.sync(config.applicationFilesPath);// check directory if there is not, create it
        cb(null, config.documentPath);
    },
    filename: function (req, file, cb) {// doctype_userid.fileformat    ex: transcript_as4e8e48598sd984e.pdf
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.secret);
        const jwt_payload = decoded.data;
        const doc_type = req.body.title.replace(/\s/g, '').toLowerCase();
        const name = doc_type + '_' + jwt_payload._id + '.' + file.mimetype.split('/')[1];
        cb(null, name);
    }
});

const fileFilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png" ||
        file.mimetype === "	application/pdf"
    ) cb(null, true);
    else cb(null, false);
};

const upload = multer({
    storage: storage, limits: {
        fileSize: config.maxFileSize,
        fileFilter: fileFilter
    }
});

const documentController = require('../controllers/documents');

router.get("/", authenticate, documentController.getAll);

router.get("/:documentId", authenticate, documentController.getById);

router.post("/upload/", authenticate, upload.single('document'), documentController.upload);

router.delete("/:documentId", authenticate, documentController.delete);

module.exports = router;