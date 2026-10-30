require('dotenv').config();

const databaseUrl = process.env.DATABASE_URL;

// Initialize the database client here when choosing a database driver.
module.exports = { databaseUrl };
