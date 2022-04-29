const express = require('express');
const router = express.Router();
const checkAuth = require('../auth/check-auth');


const UserController = require('../controllers/user');

router.post('/signup', UserController.userSignIn);

router.post('/login', UserController.userLoginIn);

router.delete('/:userId', checkAuth, UserController.userDelete);


module.exports = router;