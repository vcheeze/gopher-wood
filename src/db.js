import mariadb from 'mariadb';

const pool = mariadb.createPool({ host: 'localhost', port: 3306, user: 'gwuser', password: 'gdubsuperadmin', connectionLimit: 3 });

export default pool;
