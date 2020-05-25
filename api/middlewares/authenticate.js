const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Account = require('../models/Account');

module.exports = (req, res, next) => {
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
                next();
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
