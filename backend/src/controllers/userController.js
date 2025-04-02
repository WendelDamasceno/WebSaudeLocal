const UserService = require('../services/userService');

class UserController {
    constructor() {
        this.userService = new UserService();
    }

    async register(req, res) {
        try {
            const userData = req.body;
            const newUser = await this.userService.createUser(userData);
            res.status(201).json(newUser);
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await this.userService.authenticateUser(email, password);
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(401).json({ message: 'Invalid credentials' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }

    async getUserData(req, res) {
        try {
            const userId = req.params.id;
            const userData = await this.userService.getUserById(userId);
            if (userData) {
                res.status(200).json(userData);
            } else {
                res.status(404).json({ message: 'User not found' });
            }
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    }
}

module.exports = UserController;