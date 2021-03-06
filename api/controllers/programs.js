const Program = require("../models/Program");

exports.getAll = (req, res) => {
    Program.find()
        .populate('coordinator', 'name surname email phone address -_id')
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

exports.apply = (req, res) => {
    const id = req.params.programId;
    res.status(200).json({
        success: true,
        message: "Applied program successfully"
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

    console.log("programaaaaa update body: ");

    const keys = Object.keys(req.body);
    const updateOps = {};
    keys.forEach(key => {
        updateOps[key] = req.body[key];
    });
    Program.update({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Program updated',
                payload: {
                    result: result
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
    Program.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount >= 1)
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