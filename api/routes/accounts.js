const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accounts');
const authenticate = require('../middlewares/authenticate');

// regist an applicant
router.post('/register', accountController.registApplicant);

// resend verification code to account email
router.post('/resend', accountController.resendVerification);

// regist an staff in desired role
router.post('/staffregister', authenticate(['admin']), accountController.registStaff);

// login for all other account roles
router.post('/login', accountController.login);

// update password
router.patch('/password', authenticate(['admin', 'applicant', 'gradschool', 'department']), accountController.updatePass);

// get the entered tokens payload for authorization check
router.get('/profile', authenticate(['admin', 'applicant', 'gradschool', 'department']), accountController.profile);

// update the authorized account
router.patch('/profile', authenticate(['admin', 'applicant', 'gradschool', 'department']), accountController.update);

// get all registered accounts
router.get('/all', authenticate(['admin']), accountController.getAll);

// get all registered cordinators
router.get('/coordinators', authenticate(['admin', 'gradschool']), accountController.getAllCoordinators);

// get the entered tokens payload for authorization check
router.get('/verify/:verificationCode', accountController.verify);

// get an account by its id
router.get('/:accountId', authenticate(['admin', 'gradschool', 'department']), accountController.getById);

// delete an account by its id
router.delete('/:accountId', authenticate(['admin']), accountController.delete);

// update an account by its id
router.patch('/:accountId', authenticate(['admin']), accountController.updateById);



module.exports = router;