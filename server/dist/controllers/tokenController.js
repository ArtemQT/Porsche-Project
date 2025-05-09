"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const tokenModel_1 = require("../models/tokenModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// HTTP 401: клиент не прошёл аутентификацию, и подразумевает, что успешный ответ может быть возвращён после действительной аутентификации,
// HTTP 403: клиенту не разрешён доступ к ресурсу, несмотря на предоставление данных
class TokenController {
    static async handleRefreshToken(req, res) {
        // Проверка наличия refresh токена в куках
        // Если пользователь не зарегистрирован, то этот код проверяет это
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            res.sendStatus(401);
            return;
        }
        const refreshToken = cookies.jwt;
        // Проверка соотв. полученного токена с токеном пользователя
        // Если кто-то пытается подменить токен, то этот код проверяет его действительность
        const users = await tokenModel_1.TokenModel.getUserByToken(refreshToken);
        if (users.length === 0) {
            res.sendStatus(403);
            return;
        }
        const foundUser = users[0];
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, dec) => {
            const decoded = dec;
            if (err || foundUser.user_name !== decoded.userName) {
                res.sendStatus(403); // Forbidden
                return;
            }
            const accessToken = jsonwebtoken_1.default.sign({ userName: decoded.userName, user_id: decoded.user_id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
            res.status(200).json({
                accessToken,
                "message": "Токен успешно обновлен"
            });
        });
    }
    static async handleLogOut(req, res) {
        // on client, also delete the accessToken
        const cookies = req.cookies;
        console.log(cookies);
        if (!cookies?.jwt) {
            res.status(401).json({ message: 'Unauthorized: No token provided.' });
            return;
        }
        const refreshToken = cookies.jwt;
        const users = await tokenModel_1.TokenModel.getUserByToken(refreshToken);
        if (users.length === 0) {
            res.clearCookie('jwt', { httpOnly: true, secure: false });
            res.status(404).json({ message: 'Token not found.' });
            return;
        }
        const foundUser = users[0];
        // Delete refreshToken from DataBase
        await tokenModel_1.TokenModel.logOutByToken(foundUser.id);
        res.clearCookie('jwt', { httpOnly: true, secure: false });
        res.status(200).json({ message: 'Successfully logged out.' });
    }
}
exports.TokenController = TokenController;
