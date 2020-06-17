const jwt = require('jsonwebtoken');
const router = require('express').Router();
const authenticate = require('../middlewares/authenticate');
const multer = require('multer');
const config = require('../config/cors');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // mkdirp.sync(config.applicationFilesPath);// check directory if there is not, create it
        cb(null, config.documentPath);
    },
    filename: function (req, file, cb) {// doctype_userid.fileformat    ex: transcript_as4e8e48598sd984e.pdf
        const doc_type = req.body.title.replace(/\s/g, '').toLowerCase();
        const name = doc_type + '_' + req.account._id + '.' + file.mimetype.split('/')[1];
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

//get all documents of logged in applicant session
router.get("/", authenticate(['applicant']), documentController.getForApplicant);

// upload a document
router.post("/", authenticate(['applicant']), upload.single('document'), documentController.upload);

//get all documents in database
router.get("/all", authenticate(['admin', 'gradschool', 'gradschool', 'department']), documentController.getAll);

//get documents of authenticated applicant
//router.get("/", authenticate(['applicant']), documentController.getForApplicant);

//get documents by its id
router.get("/:documentId", authenticate(['admin', 'applicant', 'gradschool', 'department']), documentController.getById);

// delete a document
router.delete("/:documentId", authenticate(['applicant', 'gradschool']), documentController.delete);

module.exports = router;