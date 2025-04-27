"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateRefreshToken = updateRefreshToken;
exports.getUserByToken = getUserByToken;
const CreateConnToDataBase_1 = require("../config/CreateConnToDataBase");
async function updateRefreshToken(token, id) {
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
async function getUserByToken(token) {
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
