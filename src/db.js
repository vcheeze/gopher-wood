import mariadb from 'mariadb';
import dotenv from 'dotenv';

dotenv.config();
const {
  DB_HOST,
  DB_PORT,
  DB_USER,
  DB_PASSWORD,
  DB_CONNECTION_LIMIT,
} = process.env;

const pool = mariadb.createPool({
  host: DB_HOST,
  port: DB_PORT,
  user: DB_USER,
  password: DB_PASSWORD,
  connectionLimit: DB_CONNECTION_LIMIT,
});

export default pool;
