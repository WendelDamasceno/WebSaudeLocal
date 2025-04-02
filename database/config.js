module.exports = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'health_app',
    dialect: 'mysql', // or 'postgres', 'sqlite', etc. depending on your database
    logging: false, // Set to true for SQL query logging
};