import mariadb from 'mariadb';

const pool = mariadb.createPool({ host: '18.162.203.225', port: 3306, user: 'gwuser', password: 'gdubsuperadmin', connectionLimit: 2 });

export default pool;
