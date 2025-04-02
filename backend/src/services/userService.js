const User = require('../models/userModel');
const bcrypt = require('bcrypt');

class UserService {
    async createUser(userData) {
        const hashedPassword = await bcrypt.hash(userData.password, 10);
        const newUser = new User({
            ...userData,
            password: hashedPassword
        });
        return newUser.save();
    }

    async authenticateUser(email, password) {
        const user = await User.findOne({ email });
        if (user && await bcrypt.compare(password, user.password)) {
            return user;
        }
        return null;
    }

    async getUserById(userId) {
        return User.findById(userId);
    }
}

module.exports = UserService;
