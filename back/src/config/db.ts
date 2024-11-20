import dotenv from 'dotenv';
import mysql from 'mysql2/promise';


dotenv.config();

const config = {
    host: process.env.DBHOST,
    user: process.env.DBUSER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE
}


const pool = mysql.createPool(config);

export async function query(sql: string, params: any[]) {
    try{
        const conn = await pool.getConnection();
        console.log("Connection success");
        const result = await conn.query(sql, params);
        conn.release();
        return result;
    } catch(err) {
        return null
    }
}