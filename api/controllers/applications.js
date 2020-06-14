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

exports.getResults = (req, res) => {
    Application.find({ assessmentConfirmed: true }, 'applicant program assessmentResult')
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: 'Announced Results',
                payload: docs
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

exports.getByApplicant = (req, res) => {
    Application.findOne({ applicant: req.account._id })
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
    const condition = { applicant: req.account._id };
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

exports.updateById = (req, res) => {
    const id = req.params.applicationId;
    const condition = { _id: id };

    const updateOps = {};
    const updatable = ["confirmApplication", "interviewDate", "assessmentResult", "confirmAssessment"];
    for (const ops of req.body) {
        if (ops.propName in updatable)
            updateOps[ops.propName] = ops.value;
    }

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

exports.confirmApplication = (req, res) => {
    const id = req.params.applicationId;
    Application.updateOne({ _id: id }, { applicationConfirmed: true })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: "confirm application successfull",
                    payload: {
                        application: doc
                    }
                });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "No valid application found for id"
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

exports.assessApplication = (req, res) => {
    const id = req.params.applicationId;
    Application.updateOne({ _id: id }, { assessmentResult: req.bod.assessmentResult })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: "assess application successfull",
                    payload: {
                        application: doc
                    }
                });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "No valid application found for id"
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

exports.confirmAssessment = (req, res) => {
    const id = req.params.applicationId;
    Application.updateOne({ _id: id }, { assessmentConfirmed: true })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: "accept application successfull",
                    payload: {
                        application: doc
                    }
                });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "No valid application found for id"
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