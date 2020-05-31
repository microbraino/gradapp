const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accounts');
const authenticate = require('../middlewares/authenticate');

router.post('/register', accountController.registApplicant);

router.post('/coordinator_register', authenticate, accountController.registCoordinator);// admin usage only

router.post('/comitee_register', authenticate, accountController.registComitee);// admin usage only

router.post('/login', accountController.login);

router.get('/profile', authenticate, accountController.profile);

router.delete('/:profileId', authenticate, accountController.delete);//admin usage only

router.patch('/:profileId', authenticate, accountController.update);// admin, account usage

module.exports = router;