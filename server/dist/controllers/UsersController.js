"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthenticateUser = void 0;
const usersModel_1 = require("../models/usersModel");
const hashPassword_1 = require("../services/hashPassword");
const bcrypt_1 = __importDefault(require("bcrypt"));
const express_validator_1 = require("express-validator");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const tokenModel_1 = require("../models/tokenModel");
dotenv_1.default.config();
class AuthenticateUser {
    static async createUser(req, res) {
        try {
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array()
                });
            }
            const { userName, userSurname, userEmail, userPassword } = req.body;
            const candidate = await usersModel_1.UsersModel.getUserByEmail(userEmail);
            if (candidate.length != 0) {
                res.status(409).json({
                    "statusCode": 409,
                    "message": "User with this email already exists",
                });
            }
            const userData = {
                userName,
                userSurname,
                userEmail,
                userPassword: await (0, hashPassword_1.hashPassword)(userPassword)
            };
            const rows = await usersModel_1.UsersModel.createUserModel(userData);
            res.status(201).json({
                "userID": rows.insertId,
                "message": "User successfully created",
            });
        }
        catch (err) {
            res.status(500).json({
                "statusCode": 500,
                "message": `Server Error ${err.message}`,
            });
        }
    }
    static async loginUser(req, res) {
        try {
            // checking fields are filled in
            const errors = (0, express_validator_1.validationResult)(req);
            if (!errors.isEmpty()) {
                res.status(400).json({
                    errors: errors.array()
                });
                return;
            }
            // Getting data from the request body
            const { userEmail, userPassword } = req.body;
            // Getting user by email
            const candidate = await usersModel_1.UsersModel.getUserByEmail(userEmail);
            // checking for user existence
            if (candidate.length === 0) {
                res.status(401).json({ "message": "Incorrect email or password" });
                return;
            }
            if (!await bcrypt_1.default.compare(userPassword, candidate[0].user_password)) {
                res.status(401).json({ "message": "Incorrect email or password" });
                return;
            }
            const user = candidate[0];
            console.log(user.id);
            // return a JWT token and refresh JWT token
            const accessToken = jsonwebtoken_1.default.sign({ userName: user.user_name, user_id: user.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "60s" });
            const refreshToken = jsonwebtoken_1.default.sign({ userName: user.user_name, user_id: user.id }, process.env.REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
            console.log('saving jwt');
            // saving in cookies JWT refresh
            res.cookie('jwt', refreshToken, {
                httpOnly: true,
                secure: false,
                maxAge: 7 * 24 * 60 * 60 * 1000
            });
            console.log('jwt saved in cookies');
            await tokenModel_1.TokenModel.updateRefreshToken(refreshToken, user.id);
            res.status(200).json({
                userID: user.id,
                accessToken,
                message: `Authorization successful\n Welcome ${user.user_name}`,
            });
            return;
        }
        catch (err) {
            res
                .status(500)
                .json({
                "statusCode": 500,
                "message": `Server Error ${err.message}`,
            });
            return;
        }
    }
    static async getAllUsers(req, res) {
        const users = await usersModel_1.UsersModel.getAllUsersModel();
        res.json(users);
    }
}
exports.AuthenticateUser = AuthenticateUser;
