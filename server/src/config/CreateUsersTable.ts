import mysql from "mysql2/promise";
import { createConnToDataBase } from "./CreateConnToDataBase";

export async function createUsersTable(): Promise<void> {

    // Создание соединения с БД
    const connection = await createConnToDataBase()
    try {
        // Создание таблицы users
        await connection.execute(`
        CREATE TABLE IF NOT EXISTS users(
            id BIGINT AUTO_INCREMENT PRIMARY KEY,
            user_name VARCHAR(20) NOT NULL,
            user_surname VARCHAR(20) NOT NULL,
            user_email VARCHAR(256) NOT NULL UNIQUE,
            user_password VARCHAR(256) NOT NULL
        )
        `
        )
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await connection.end();
    }
}
