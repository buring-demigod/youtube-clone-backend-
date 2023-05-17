const express = require('express');
const router = express.Router();

const userExist = require('../middleware/userExist');
const auth = require('../middleware/auth');
const validity = require('../middleware/validity');
const { createUser, getUser } = require('../controllers/userController');

router.post('/createuser', userExist, createUser);

router.get('/getUser', auth, validity, getUser);

module.exports = router;