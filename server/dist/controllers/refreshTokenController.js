"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshTokenModel_1 = require("../models/refreshTokenModel");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
class RefreshToken {
    static async handleRefreshToken(req, res) {
        const cookies = req.cookies;
        if (!cookies?.jwt) {
            res.status(401);
            return;
        }
        const refreshToken = cookies.jwt;
        const users = await (0, refreshTokenModel_1.getUserByToken)(refreshToken);
        if (users.length === 0) {
            res.sendStatus(403); // Forbidden
            return;
        }
        const foundUser = users[0];
        jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, dec) => {
            const decoded = dec;
            if (err || foundUser.user_name !== decoded.userName) {
                res.sendStatus(403); // Forbidden
                return;
            }
            const accessToken = jsonwebtoken_1.default.sign({ "userName": decoded.userName }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "50s" });
            res.json({
                accessToken,
                "message": "Токен успешно обновлен"
            });
        });
    }
}
exports.RefreshToken = RefreshToken;
