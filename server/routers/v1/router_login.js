//modulo terceros
const express = require('express');


//modulo local
const { login, logout, signup } = require('../../controllers/v1/controller_login');
const { validateSignup } = require('../../validators/vlogin');

const router = express.Router();

router.post('/login', login);
router.post('/logout', logout);
router.post('/signup', validateSignup, signup);

module.exports = router;