"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenModel = void 0;
const CreateConnToDataBase_1 = require("../config/CreateConnToDataBase");
class TokenModel {
    static async updateRefreshToken(token, id) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            await connection.execute(`
            UPDATE users
            SET refresh_token = ? 
            WHERE id = ?;
        `, [token, id]);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async getUserByToken(token) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            const [user] = await connection.execute(`SELECT * FROM users WHERE refresh_token = ?`, [token]);
            return user;
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
    static async logOutByToken(id) {
        const connection = await (0, CreateConnToDataBase_1.createConnToDataBase)();
        try {
            await connection.execute(`
            UPDATE users
            SET refresh_token = ?
            WHERE id = ?
            `, [null, id]);
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
}
exports.TokenModel = TokenModel;
