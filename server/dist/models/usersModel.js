"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersModel = void 0;
const CreateConnToDataBase_1 = require("../config/CreateConnToDataBase");
class UsersModel {
    static async getUserByEmail(email) {
        let connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`
        SELECT id, user_name, user_surname, user_email, user_password FROM users WHERE user_email = ?
        `, [email]);
            return rows;
        }
        catch (err) {
            console.error(err);
            throw err;
        }
        finally {
            await connection.end();
        }
    }
    static async createUserModel(user) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`
        INSERT INTO users (user_name, user_surname, user_email, user_password)
        VALUES (?, ?, ?, ?)
        `, [user.userName, user.userSurname, user.userEmail, user.userPassword]);
            return rows;
        }
        catch (err) {
            console.error(err);
            return err;
        }
        finally {
            await connection.end();
        }
    }
    static async getAllUsersModel() {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [rows] = await connection.execute(`SELECT * FROM users`);
            return rows;
        }
        catch (err) {
            throw err;
        }
        finally {
            await connection.end();
        }
    }
}
exports.UsersModel = UsersModel;
//API/users/auth/register, Функция для middleware проверки существования пользователя
