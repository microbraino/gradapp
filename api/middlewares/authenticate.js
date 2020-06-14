const jwt = require('jsonwebtoken');
const config = require('../config/cors');
const Account = require('../models/Account');
// roles: admin, applicant, gradschool,  department
module.exports = function (roles) {
    return (req, res, next) => {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split(" ")[1];
            jwt.verify(token, config.secret, (err, decoded) => {
                if (err) return res.status(401).json({
                    success: false,
                    message: "Access token is missing or invalid",
                    error: err
                });
                if (roles.includes(decoded.data.role) || decoded.data.role === 'su') {
                    req.account = decoded.data;
                    next();
                }
                else return res.status(403).json({
                    success: false,
                    message: "Access denied"
                });
            });
        } else {
            return res.status(403).json({
                success: false,
                message: "Authorization protected area. Please supply a valid Authorization header"
            });
        }

    };
}
