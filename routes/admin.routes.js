const express = require('express');
const adminCtrl = require('../controllers/admin.controller');

const router = express.Router();

router.post('/signup', adminCtrl.signup);
router.post('/signIn', adminCtrl.signIn);
router.get('/logout', adminCtrl.logout);
router.get('/loggedInAdmin', adminCtrl.loggedInAdmin);

module.exports = router;
