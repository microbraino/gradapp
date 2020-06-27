const Account = require('../models/Account');
const Application = require('../models/Application');
const jwt = require('jsonwebtoken');
const config = require('../config/cors');
const mailer = require("../middlewares/mailler");//change this

exports.registApplicant = (req, res) => {
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})");
    const message = "The password must contain at least 1 lowercase alphabetical character\n" +
        "The password must contain at least 1 uppercase alphabetical character\n" +
        "The password must contain at least 1 numeric character\n" +
        "The password must contain at least one special character\n" +
        "The password must be eight characters or longer\n"
    //req.body.password.isMatch
    if (!strongRegex.test(req.body.password)) {//if password is not enaugh strong
        return res.status(409).json({
            success: false,
            message: "Invalid password!",
            error: message
        });
    }
    const newAccount = new Account({
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
    });

    // validate password


    Account.createNew(newAccount, (err, doc) => {
        if (err) {
            let message = "";
            if (err.errors.email) message += "Email already exists.";
            return res.status(409).json({
                success: false,
                message: message,
                error: err
            });
        } else {
            //create an application entity also
            const newApplication = new Application({
                applicant: doc._id,
                program: req.body.program
            });
            newApplication
                .save()
                .then(app => {
                    return res.status(201).json({
                        success: true,
                        message: "account registered and new application file is created successfully.",
                        payload: {
                            account: doc,
                            application: app
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

            //send verification code
            const mailBody = require('../middlewares/verificationMailBody');
            const message = mailBody(newAccount, doc._id);
            const mail = {
                from: '"IZTECH GRADAPP" <authorization@gradapp.com>', // sender address
                to: doc.email, // list of receivers
                subject: "Verify Your Email on IZTECH Gradapp", // Subject line
                text: "", // plain text body
                html: message, // html body
            };
            mailer.send(mail);

        }
    });
};

exports.registStaff = (req, res) => {
    if (!config.roles.includes(req.body.role))
        return res.status(409).json({
            success: false,
            message: "Invalid role entry. Valid roles: " + config.roles,
            error: "invalid role entry"
        });
    const newAccount = new Account({
        role: req.body.role,
        name: req.body.name,
        surname: req.body.surname,
        email: req.body.email,
        password: req.body.password,
        phone: req.body.phone,
        address: req.body.address
    });
    Account.createNew(newAccount, (err, account) => {
        if (err) {
            let message = "";
            if (err.errors.email) message += "Email already exists.";
            return res.status(409).json({
                success: false,
                message: message,
                error: err
            });
        } else {
            //send verification code
            const mailBody = require('../middlewares/verificationMailBody');
            const message = mailBody(newAccount, account._id);
            const mail = {
                from: '"IZTECH GRADAPP" <authorization@gradapp.com>', // sender address
                to: account.email, // list of receivers
                subject: "Verify Your Email on IZTECH Gradapp", // Subject line
                text: "", // plain text body
                html: message, // html body
            };
            mailer.send(mail);
            return res.status(201).json({
                success: true,
                message: "new staff registered successfully",
                payload: {
                    account: account
                }
            });
        }
    });
};

exports.login = (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Account.getByEmail(email, (err, account) => {
        if (err) throw err;
        if (!account) {
            return res.status(401).json({
                success: false,
                message: "login failed! invalid email or password"
            });
        }
        if (!account.isVerified) {
            return res.status(401).json({
                success: false,
                message: "unactivated account. please activate your account by clicking verification code on your email"
            });
        }
        Account.comparePassword(password, account.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign({
                    type: "account",
                    data: account
                }, config.secret, {
                    expiresIn: config.tokenTTL
                });
                return res.status(201).json({
                    success: true,
                    message: "login successfull",
                    payload: {
                        token: "Bearer " + token
                    }
                });
            } else {
                return res.status(401).json({
                    success: false,
                    message: "login failed! invalid email or password"
                });
            }
        });
    });
};

exports.updatePass = (req, res) => {
    const email = req.account.email;
    const oldPassword = req.body.old;
    const newPassword = req.body.new;

    Account.comparePassword(oldPassword, req.account.password, (err, isMatch) => {
        if (err) throw err;
        if (!isMatch)
            return res.status(401).json({
                success: false,
                message: "invalid email or password"
            });
        Account.updatePassword(newPassword, req.account, (err, result) => {
            if (err) throw err;
            if (result.nModified == 0)
                res.status(500).json({
                    success: false,
                    message: 'An error occured during update password',
                    error: err
                });
            return res.status(200).json({
                success: true,
                message: "password updated",
                payload: {
                    result: result
                }
            });
        })
    });
};

exports.profile = (req, res) => {
    try {
        Account.getById(req.account._id, (err, account) => {
            if (err) return res.status(401).json({
                success: false,
                message: "Unknown error occured while reaching the account data",
                error: err
            });
            if (!account) return res.status(401).json({
                success: false,
                message: "Unknown error occured while reaching the account data"
            });
            if (req.account.password === account.password) {
                return res.status(200).json({
                    success: true,
                    message: "account deatils",
                    payload: {
                        account: account
                    }
                });
            }
            else return res.status(401).json({
                success: false,
                message: "invalid token"
            });
        });

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: 'Auth failed',
            error: error
        });
    }
};

exports.getAll = (req, res) => {
    Account.find()
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: null,
                payload: {
                    count: docs.length,
                    accounts: docs
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
    const id = req.params.accountId;
    Account.findOne({ _id: id })
        .exec()
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    success: true,
                    message: null,
                    payload: {
                        account: doc
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

exports.getAllCoordinators = (req, res) => {
    Account.find({ role: "department" })
        .exec()
        .then(docs => {
            const response = {
                success: true,
                message: null,
                payload: {
                    count: docs.length,
                    accounts: docs
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

exports.update = (req, res) => {
    const updatable = ["phone", "address"];
    const keys = Object.keys(req.body);
    const updateOps = {};
    keys.forEach(key => {
        if (updatable.includes(key))
            updateOps[key] = req.body[key];
    });
    Account.updateOne({ _id: req.account._id }, { $set: updateOps })
        .exec()
        .then(result => {
            res.status(200).json({
                success: true,
                message: 'Account updated',
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
};

exports.updateById = (req, res) => {
    if (!config.roles.includes(req.body.role))
        return res.status(409).json({
            success: false,
            message: "Invalid role entry. Valid roles: " + config.roles,
            error: "invalid role entry"
        });
    const id = req.params.accountId;
    const updatable = ["role", "phone", "address"];
    const keys = Object.keys(req.body);
    const updateOps = {};
    keys.forEach(key => {
        if (updatable.includes(key))
            updateOps[key] = req.body[key];
    });
    Account.updateOne({ _id: id }, { $set: updateOps })
        .exec()
        .then(result => {
            if (result.nModified > 0)
                res.status(200).json({
                    success: true,
                    message: 'Account updated',
                    payload: {
                        result: result
                    }
                });
            else
                res.status(404).json({
                    success: false,
                    message: "No valid entry found for provided ID:" + id
                });
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: 'An error occured while retrieving data',
                error: err
            });
        });
};

exports.verify = (req, res) => {
    const id = req.params.verificationCode;
    Account.updateOne({ _id: id }, { isVerified: true })//verify account
        .exec()
        .then(result => {
            res.status(200).redirect('/public/verified.html');
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
    const id = req.params.accountId;
    Account.deleteOne({ _id: id })
        .exec()
        .then(result => {
            if (result.deletedCount >= 1)
                res.status(200).json({
                    success: true,
                    message: 'Account deleted',
                    payload: {
                        account: id
                    }
                })
            else
                res.status(500).json({
                    success: false,
                    message: 'No valid entry found for provided ID'
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