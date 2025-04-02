const bcrypt = require('bcrypt');
const User = require('../../backend/src/models/userModel');

const seedUsers = async () => {
    const users = [
        {
            name: 'John Doe',
            email: 'john.doe@example.com',
            age: 30,
            healthConditions: ['Diabetes'],
            password: 'password123'
        },
        {
            name: 'Jane Smith',
            email: 'jane.smith@example.com',
            age: 25,
            healthConditions: ['Asthma'],
            password: 'password123'
        },
        {
            name: 'Alice Johnson',
            email: 'alice.johnson@example.com',
            age: 40,
            healthConditions: ['Hypertension'],
            password: 'password123'
        }
    ];

    for (const user of users) {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        await User.create({
            name: user.name,
            email: user.email,
            age: user.age,
            healthConditions: user.healthConditions,
            password: hashedPassword
        });
    }

    console.log('Users seeded successfully');
};

seedUsers().catch(err => {
    console.error('Error seeding users:', err);
});