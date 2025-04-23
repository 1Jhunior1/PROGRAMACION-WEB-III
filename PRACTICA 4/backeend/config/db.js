import mysql from 'mysql2';

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '', 
    database: 'td_tienda_product'
});

export default pool;
