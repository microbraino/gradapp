
const jwt = require('jsonwebtoken');
const config = require('../config/database');

const Account = require('../models/Account');

exports.register = (req, res) => {
    const newAccount = new Account({
        firstname: req.body.firstname,
        middlename: req.body.middlename,
        lastname: req.body.lastname,
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
            return res.status(201).json({
                success: true,
                message: "account registration is successful.",
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
                message: "account not found"
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

exports.profile = (req, res) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, config.secret);
        const jwt_payload = decoded.data;
        //req.userData = decoded;
        Account.getById(jwt_payload._id, (err, account) => {
            if (err) return res.status(401).json({
                success: false,
                message: "Unknown error occured while reaching the account data",
                error: err
            });
            if (!account) return res.status(401).json({
                success: false,
                message: "Unknown error occured while reaching the account data"
            });
            if (jwt_payload.password === account.password) {
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
            message: 'Auth failed'
        });
    }
};