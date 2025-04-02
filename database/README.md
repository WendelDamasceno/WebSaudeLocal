# Database Documentation

This directory contains the necessary files for managing the database of the health application. Below is a brief overview of the contents:

## Migrations
- **migrations/createUsersTable.js**: This file contains the migration script for creating the users table in the database. It defines the schema for user data, including fields for health conditions, age, name, and email.

## Seeders
- **seeders/seedUsers.js**: This file contains the seeder script for populating the users table with initial data. It helps in setting up the database with sample user records for testing purposes.

## Configuration
- **config.js**: This file exports the database configuration settings, including connection details and any other relevant configurations required for database operations.

## Usage
To run migrations and seed the database, ensure you have the necessary database setup and run the respective scripts as per your database management system's guidelines.

This documentation will help you understand the structure and purpose of the database-related files in this project.