"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyJwt = (req, res, next) => {
    const authHeader = req.headers.authorization;
    // Если не отправлен заголовок authorization
    if (!authHeader) {
        res.status(401).json({ message: "No token provided" });
        return;
    }
    // Получение и верификация JWT токена
    const token = authHeader.split(" ")[1];
    jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            res.status(403).json({ message: "Invalid token" });
            return;
        }
        res.sendStatus(200);
        return;
    });
};
exports.verifyJwt = verifyJwt;
