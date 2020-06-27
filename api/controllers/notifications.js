const Notification = require("../models/Notification");
exports.getAll = (req, res) => {
    Notification.find() ///// should be revised again
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
                message: 'An error occured while retrieving data',
                error: err
            });
        });
};

exports.getMyAll = (req, res) => {
    const query = {
        $or: [{ to: req.account.email, visibleTo: true },
        { from: req.account.email, visibleFrom: true }]
    };
    Notification.find(query) ///// revised by proper query
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
                message: 'An error occured while retrieving data',
                error: err
            });
        });
};

exports.send = (req, res) => {
    const newNotification = new Notification({
        from: req.account.email,
        to: req.body.to,
        title: req.body.title,
        note: req.body.note
    });
    newNotification
        .save()
        .then(result => {
            console.log(result);
            //send to email
            const mailBody = require('../middlewares/notificationMailBody.js');
            const message = mailBody(result);
            const mail = {
                from: '"IZTECH GRADAPP" ' + req.account.email, // sender address
                to: result.email, // list of receivers
                subject: result.title, // Subject line
                text: "", // plain text body
                html: message, // html body
            };
            mailer.send(mail);
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
                message: 'An error occured while retrieving data',
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
            res.status(500).json({
                success: false,
                message: 'An error occured while retrieving data',
                error: err
            });
        });
};


exports.delete = (req, res) => {
    const id = req.params.notificationId;
    Notification.findById(id)
        .exec()
        .then(doc => {
            if (doc) {
                if (req.account.email === doc.from && doc.visibleTo == true) {// set  unvisible by sender
                    Notification.updateOne({ _id: id }, { visibleFrom: false })///// revised
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                success: true,
                                message: 'notification deleted from your side',
                                payload: {
                                    result: result
                                }
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                success: false,
                                message: 'An error occured while retrieving data',
                                error: err
                            });
                        });
                } else if (req.account.email === doc.to && doc.visibleFrom == true) {// set unvisible by receiver
                    Notification.updateOne({ _id: id }, { visibleTo: false })///// revised
                        .exec()
                        .then(result => {
                            res.status(200).json({
                                success: true,
                                message: 'notification deleted from your side',
                                payload: {
                                    result: result
                                }
                            });
                        })
                        .catch(err => {
                            console.log(err);
                            res.status(500).json({
                                success: false,
                                message: 'An error occured while retrieving data',
                                error: err
                            });
                        });
                } else
                    res.status(500).json({
                        success: false,
                        message: 'An error occured while deleting notification'
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

exports.seen = (req, res) => {
    const id = req.params.notificationId;
    Notification.findById(id)// first find the notification
        .exec()
        .then(notification => {
            if (req.account.email === notification.to)// compare emails if destination email belongs to auth account email
                Notification.updateOne({ _id: id }, { seen: true })
                    .exec()
                    .then(result => {
                        res.status(200).json({
                            success: true,
                            message: "notification marked as seen",
                            payload: {
                                result: result
                            }
                        });
                    })
                    .catch(err => {
                        res.status(500).json({
                            success: false,
                            message: "An error ocured while retrieving notification data from database",
                            error: err
                        });
                    });
            else res.status(401).json({// if not belongs
                success: false,
                message: "account doesnt have permision to mark the notification as seen"
            });

        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: "An error ocured while retrieving notification data from database",
                error: err
            });
        });
};