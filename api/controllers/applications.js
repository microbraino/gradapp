const jwt = require('jsonwebtoken');
const config = require('../config/general');

const Application = require("../models/Application");

exports.getAll = (req, res) => {
    Application.find()
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: 'All stored applications',
                payload: {
                    count: docs.length,
                    applications: docs
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


exports.getById = (req, res) => {
    const id = req.params.applicationId;
    Application.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: 'Application belongs to authenticated account',
                    payload: {
                        application: doc
                    }
                });
            } else {
                res.status(404)
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

exports.getByAccount = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    const jwt_payload = decoded.data;
    Application.findOne({ account: jwt_payload._id })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: null,
                    payload: {
                        application: doc
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

exports.update = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    const jwt_payload = decoded.data;
    const condition = { account: jwt_payload._id };

    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    };

    const update = { $set: updateOps };

    const option = { new: true, runValidators: true };
    Application.findOneAndUpdate(condition, update, option)
        // .populate('undergradTranscript', 'originalname')
        // .populate('alesResult', 'originalname')
        // .populate('englishExamResult', 'originalname')
        // .populate('referenceLetters', 'originalname')
        // .populate('statementOfPurpose', 'originalname')
        // .populate('passportCopy', 'originalname')
        // .populate('permissionLetter', 'originalname')
        // .populate('masterTranscript', 'originalname')
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: "update application successfull",
                    payload: {
                        application: doc
                    }
                });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "No valid application found for account"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: "update application fail",
                error: err
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.programId;
    Application.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Aplication deleted',
                payload: {
                    program: result
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
};