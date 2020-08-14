import mariadb from 'mariadb';

const pool = mariadb.createPool({ host: 'localhost', port: 3306, user: 'root', password: 'godzrock2', connectionLimit: 2 });

export default pool;
