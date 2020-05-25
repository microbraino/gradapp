const express = require('express');
const router = express.Router();
const accountController = require('../controllers/accounts');
const authenticate = require('../middlewares/authenticate');

router.post('/register', accountController.register);

router.post('/login', accountController.login);

router.get('/profile', authenticate, accountController.profile);

router.delete('/:profileId', authenticate, accountController.delete);

router.patch('/:profileId', authenticate, accountController.update);

module.exports = router;