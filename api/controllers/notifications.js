const Notification = require("../models/Notification");
const config = require('../config/general');
const jwt = require('jsonwebtoken');

exports.getAll = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    const jwt_payload = decoded.data;
    Notification.find({ to: jwt_payload.email }) ///// should be revised again
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: null,
                payload: {
                    count: docs.length,
                    notifications: docs
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


exports.send = (req, res) => {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, config.secret);
    const jwt_payload = decoded.data;

    const newNotification = new Notification({
        from: jwt_payload.email,
        to: req.body.to,
        title: req.body.title,
        note: req.body.note
    });
    newNotification
        .save()
        .then(result => {
            console.log(result);
            res.status(201).json({
                success: true,
                message: "create notification successfull",
                payload: {
                    notification: result
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
    const id = req.params.notificationId;
    Notification.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: null,
                    payload: {
                        Notification: doc
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
    const id = req.params.notificationId;
    Notification.updateOne({ _id: id }, { visibleTo: false })///// should be revised again
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'notification deleted',
                payload: {
                    notification: result
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