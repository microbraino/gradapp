const Application = require("../models/Application");
const { application } = require("express");

exports.getAll = (req, res) => {
    Application.find()
        .populate('applicant')
        .populate('program')
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
    Application.find({ status: "announced" }, 'applicant program assessmentResult')
        .populate('applicant', 'name surname')
        .populate('program', 'name department degree')
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: 'Announced Admissions',
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
    const updatable = ["photo",
        "undergradTranscript",
        "alesResult",
        "englishExamResult",
        "referenceLetters",
        "statementOfPurpose",
        "nationality",
        "passportCopy",
        "doesWork",
        "permissionLetter",
        "masterTranscript",];
    const keys = Object.keys(req.body);
    const updateOps = {};
    keys.forEach(key => {
        if (updatable.includes(key))
            updateOps[key] = req.body[key];
    });
    const condition = { applicant: req.account._id };
    const options = { new: true, runValidators: true };
    Application.findOneAndUpdate(condition, updateOps, options)
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

exports.setStatus = (req, res) => {
    const id = req.account._id;
    const enteredStatus = req.body.status;
    const statusList = [
        'created',
        'edited',
        'submited',
        'updated'];
    if (!(statusList.includes(enteredStatus)))// check if it is an acceptable progress
        return res.status(422).json({
            success: false,
            message: "invalid status",
            error: "valid status list:" + statusList
        });
    Application.findOneAndUpdate({ applicant: id }, { status: enteredStatus }, { useFindAndModify: false })
        .exec()
        .then(application => {
            if (application) {
                res.status(200).json({
                    success: true,
                    message: "application status updated to: " + enteredStatus,
                    payload: {
                        application: application
                    }
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No valid application found for given id:" + id
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

exports.setStatusById = (req, res) => {
    const id = req.params.applicationId;
    const enteredStatus = req.body.status;
    const statusList = [
        'checked',
        'updateRequested',
        'interviewSetted',
        'confirmed',
        'rejected',
        'assessed',
        'accepted',
        'announced'];
    if (!(statusList.includes(enteredStatus)))// check if it is an acceptable progress
        return res.status(422).json({
            success: false,
            message: "invalid status",
            error: "valid status list:" + statusList
        });
    Application.findOneAndUpdate({ _id: id }, { status: enteredStatus }, { useFindAndModify: false })
        .exec()
        .then(application => {
            if (application) {
                res.status(200).json({
                    success: true,
                    message: "application status updated to: " + enteredStatus,
                    payload: {
                        application: application
                    }
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: "No valid application found for given id:" + id
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
    Application.updateOne({ _id: id }, { assessmentResult: req.body.assessmentResult })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: "assess application successfull",
                    payload: {
                        result: doc
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
    const id = req.params.applicationId;
    Application.deleteOne({ _id: id })
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
                message: 'An error occurred while delete the document',
                error: err
            });
        });
};