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
class TokenController {
    static async handleRefreshToken(req, res) {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            res.sendStatus(401);
            return;
        }
        const refreshToken = cookies.jwt;
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
            const accessToken = jsonwebtoken_1.default.sign({ "userName": decoded.userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30s" });
            res.json({
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
