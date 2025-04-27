"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUsersTable = createUsersTable;
const CreateConnToDataBase_1 = require("./CreateConnToDataBase");
async function createUsersTable() {
    // Создание соединения с БД
    const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
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
        `);
    }
    catch (error) {
        console.log(error);
    }
    finally {
        await connection.end();
    }
}
