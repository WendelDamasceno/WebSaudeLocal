const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();
const userController = new UserController();

// User login route
router.post('/login', userController.login.bind(userController));

// User registration route
router.post('/register', userController.register.bind(userController));

// Get user data route
router.get('/me', userController.getUserData.bind(userController));

module.exports = router;