const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Account = require('../models/Account');
const config = require('../config/database');


// To authtenticate the User by JWT Startegy
module.exports = (passport) => {
    let opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme('jwt');
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        Account.getById(jwt_payload.data._id, (err, account) => {
            if (err) return done(err, false);
            if (account) return done(null, account);
            return done(null, false);
        });
    }));
}