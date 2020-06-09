const jwt = require('jsonwebtoken');
const config = require('../config/cors');
const Account = require('../models/Account');
// roles: admin, applicant, gradschool,  department
module.exports = function (roles) {
    return (req, res, next) => {
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
                if (!config.roles.includes(jwt_payload.role)) return res.status(401).json({
                    success: false,
                    message: "invalid role definition"
                });
                //console.log(jwt_payload.role);
                //console.log(roles);
                //console.log(roles.includes(jwt_payload.role));
                if (jwt_payload.password === account.password) {
                    if (roles.includes(jwt_payload.role) || jwt_payload.role === 'su') {
                        req.account = account;
                        next();
                    }
                    else return res.status(401).json({
                        success: false,
                        message: "Unauthorized: Access is denied due to invalid credentials"
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
}

