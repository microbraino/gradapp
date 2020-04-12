const express = require('express');
const router = express.Router();
const passport = require('passport');
const adminController = require('../controllers/admin');


router.post('/register', adminController.adminRegister);

router.post('/login', adminController.adminLogin);

/**
 * Get Authenticated user profile
 */

router.get('/profile', passport.authenticate('jwt', {
    session: false
}), adminController.adminProfile);

module.exports = router;