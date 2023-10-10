import mysql from 'mysql2';

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'mirror_image_830',
    database: 'whoiswhat'
})

export default db;