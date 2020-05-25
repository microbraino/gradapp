const Program = require("../models/Program");

exports.getAll = (req, res) => {
    Program.find()
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: null,
                payload: {
                    count: docs.length,
                    programs: docs
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


exports.addNew = (req, res) => {
    const newProgram = new Program({
        name: req.body.name,
        department: req.body.department,
        degree: req.body.degree,
        coordinator: req.body.coordinator,
        description: req.body.description,
        announceDate: req.body.announceDate,
        applicationDeadline: req.body.applicationDeadline,
        alesRequirement: req.body.alesRequirement,
        sgkRequirement: req.body.sgkRequirement,
        masterRequirement: req.body.masterRequirement,
        quota: req.body.quota
    });
    newProgram
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                success: true,
                message: "Created program successfully",
                payload: {
                    program: result
                }
            });
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
    const id = req.params.programId;
    Program.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: null,
                    payload: {
                        program: doc
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
    const id = req.params.programId;
    const updateOps = {};
    for (const ops of req.body) {
        updateOps[ops.propName] = ops.value;
    }
    Program.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Program updated',
                payload: {
                    program: result
                }
            });
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

exports.delete = (req, res) => {
    const id = req.params.programId;
    Program.remove({ _id: id })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Program deleted',
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