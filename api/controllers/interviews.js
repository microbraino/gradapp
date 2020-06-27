const Interview = require("../models/Interview");
const Account = require("../models/Account");
const mailer = require("../middlewares/mailler");


exports.getAll = (req, res) => {
    Interview.find()
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: null,
                payload: {
                    count: docs.length,
                    interviews: docs
                }
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'An error occured while retrieving data',
                error: err
            });
        });
};

exports.getForApplicant = (req, res) => {
    Interview.findOne({ applicant: req.account._id })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: null,
                    payload: {
                        interview: doc
                    }
                });
            } else {
                res
                    .status(404)
                    .json({
                        success: false,
                        message: "There is not any interview setted for authorized applicant"
                    });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: err });
        });
};

exports.getList = (req, res) => {
    Interview.find({}, 'applicant date location')
        .populate('applicant', 'name surname -_id')
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: null,
                payload: {
                    count: docs.length,
                    interviews: docs
                }
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'An error occured while retrieving data',
                error: err
            });
        });
};

exports.getById = (req, res) => {
    const id = req.params.interviewId;
    Interview.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: null,
                    payload: {
                        interview: doc
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

exports.set = (req, res) => {
    const newInterview = new Interview({
        applicant: req.body.applicant,
        date: req.body.date,
        location: req.body.location
    });

    Account.findOne({ _id: req.body.applicant })
        .exec()
        .then(doc => {
            if (doc) {
                newInterview
                    .save()
                    .then(result => {
                        console.log(result);

                        //send verification code
                        const mailBody = require('../middlewares/interviewMailBody.js');
                        const message = mailBody(result, doc);
                        const mail = {
                            from: '"IZTECH GRADAPP" ' + req.account.email, // sender address
                            to: doc.email, // list of receivers
                            subject: "You have an interview appointment", // Subject line
                            text: "", // plain text body
                            html: message, // html body
                        };
                        mailer.send(mail);

                        res.status(201).json({
                            success: true,
                            message: "Set interview successfully",
                            payload: {
                                interview: result
                            }
                        });
                    })
                    .catch(err => {
                        console.log(err);
                        res.status(500).json({
                            success: false,
                            message: 'An error occured while set interview',
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
            res.status(500).json({
                success: false,
                message: 'An error occured while retrieving data',
                error: err
            });
        });

};

exports.apply = (req, res) => {
    const id = req.params.programId;
    res.status(200).json({
        success: true,
        message: "Applied program successfully"
    });
};



exports.update = (req, res) => {
    const id = req.params.interviewId;
    const updatable = ["date", "location"];
    const keys = Object.keys(req.body);
    const updateOps = {};
    keys.forEach(key => {
        if (updatable.includes(key))
            updateOps[key] = req.body[key];
    });
    Interview.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Interview updated',
                payload: {
                    result: result
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                success: false,
                message: 'An error occured while update interview',
                error: err
            });
        });
};

exports.delete = (req, res) => {
    const id = req.params.interviewId;
    Interview.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Interview deleted',
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
                error: 'An error occured while delete interview'
            });
        });
};