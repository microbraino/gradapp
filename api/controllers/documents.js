const Document = require("../models/Document");
const Application = require("../models/Application");
const fs = require('fs');


exports.getForApplicant = (req, res) => {
    const id = req.account._id;
    const role = req.account.role;
    if (role === 'applicant')
        Application.findOne({ applicant: id })
            .populate('photo')
            .populate('undergradTranscript')
            .populate('alesResult')
            .populate('englishExamResult')
            .populate('referenceLetters')
            .populate('statementOfPurpose')
            .populate('passportCopy')
            .populate('permissionLetter')
            .populate('masterTranscript')
            .exec()
            .then(doc => {
                if (doc) {
                    res.status(200).json({
                        success: true,
                        message: null,
                        payload: {
                            documents: {
                                photo: doc.photo,
                                undergradTranscript: doc.undergradTranscript,
                                alesResult: doc.alesResult,
                                englishExamResult: doc.englishExamResult,
                                referenceLetters: doc.referenceLetters,
                                statementOfPurpose: doc.statementOfPurpose,
                                passportCopy: doc.passportCopy,
                                permissionLetter: doc.permissionLetter,
                                masterTranscript: doc.masterTranscript
                            }
                        }
                    });
                } else {
                    res
                        .status(404)
                        .json({
                            success: false,
                            message: "No valid entry found for provided ID"
                        });
                }
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: err });
            });
    else
        res.status(401).json({
            success: false,
            message: "only applicants have document file"
        });
};

exports.getAll = (req, res) => {
    Document.find()
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: null,
                payload: {
                    count: docs.length,
                    documents: docs
                }
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: null,
                error: err
            });
        });
};


exports.upload = (req, res) => {
    const newDocument = new Document({
        title: req.body.title,
        originalname: req.file.originalname,
        mimetype: req.file.mimetype,
        size: req.file.size,
        destination: req.file.destination,
        storename: req.file.filename,
        source: req.file.path,
        editDate: Date.now(),
        isComplete: true
    });
    newDocument
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                success: true,
                message: "uploaded file successfully",
                payload: {
                    document: result
                }
            });
        })
        .catch(err => {
            fs.unlink(req.file.destination + '/' + req.file.filename, (err) => {
                if (err) throw err;
                console.log('successfully deleted /tmp/hello');
            });//remove uploaded file
            console.log(err);
            res.status(500).json({
                success: false,
                message: null,
                error: err
            });
        });
};

exports.getById = (req, res) => {
    const id = req.params.documentId;
    Document.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: null,
                    payload: {
                        document: doc
                    }
                });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "No valid entry found for provided ID"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};


exports.delete = (req, res) => {
    const id = req.params.documentId;
    //first find document
    Document.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                //remove file from server
                fs.unlink(doc.destination + '/' + doc.storename, (err) => {
                    if (err && err.code != 'ENOENT') {
                        console.log(err);
                        res.status(500).json({
                            success: false,
                            message: 'couldnt remove the file',
                            error: err
                        });
                    };
                    //console.log('successfully deleted');
                });
                //remove metadata from database
                Document.remove({ _id: id })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            success: true,
                            message: 'File deleted',
                            payload: {
                                info: result
                            }
                        })
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            success: false,
                            message: null,
                            error: err
                        });
                    });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "No valid entry found for provided ID"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};