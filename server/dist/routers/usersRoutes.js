"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controllers/UsersController");
exports.usersRouter = express_1.default.Router();
const express_validator_1 = require("express-validator");
const tokenController_1 = require("../controllers/tokenController");
exports.usersRouter.post("/register", [
    (0, express_validator_1.check)("userName", "Имя пользователя не может быть пустым").notEmpty(),
    (0, express_validator_1.check)("userSurname", "Фамилия пользова быть пустой").notEmpty(),
    (0, express_validator_1.check)("userEmail", "Почта не может быть пустой").notEmpty(),
    (0, express_validator_1.check)("userPassword", "Пароль не может быть пустым").isLength({ min: 8 })
], UsersController_1.AuthenticateUser.createUser);
exports.usersRouter.post("/login", [
    (0, express_validator_1.check)("userEmail", "Почта не может быть пустой").notEmpty(),
    (0, express_validator_1.check)("userPassword", "Пароль не может быть пустым").isLength({ min: 8 })
], UsersController_1.AuthenticateUser.loginUser);
exports.usersRouter.get('/logout', tokenController_1.TokenController.handleLogOut);
