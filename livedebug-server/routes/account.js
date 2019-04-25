const express = require('express');
const router = express.Router();
const accountController = require('../controllers/account');
const { authentication, authorization } = require('../middlewares/auth');


router.use(authentication);
router.post('/new', accountController.newAccount);
router.get('/accountNumber', accountController.findAccounts);
router.delete('/:accountNumber', authorization, accountController.remove);


module.exports = router
