import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
dotenv.config();

export async function createConnToDataBase(): Promise<mysql.Connection> {
    try{
        const connection = await mysql.createConnection({
            host: process.env.DB_HOST!,
            user: process.env.DB_USER!,
            password: process.env.DB_PASSWORD!,
            port: 3306,
            database: process.env.DB_NAME!,
        });
        console.log('server successfully connected to database');
        return connection;
    }
    catch(err){
        throw err;
    }
}

