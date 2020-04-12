const express = require('express');
const router = express.Router();
const passport = require('passport');
const userController = require('../controllers/users');


router.post('/register', userController.userRegister);

router.post('/login', userController.userLogin);

/**
 * Get Authenticated user profile
 */

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), userController.userProfile);

module.exports = router;