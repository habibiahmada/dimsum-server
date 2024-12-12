require('dotenv').config();
const { Pool } = require('pg');

const pool = new Pool({
    connectionString: process.env.DATABASE_URL || null,
    ssl: process.env.DATABASE_URL ? { rejectUnauthorized: false } : false, // SSL untuk production
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

const query = (text, params) => pool.query(text, params);

module.exports = { query };