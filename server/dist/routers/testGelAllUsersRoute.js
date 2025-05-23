"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.testRouter = exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controllers/UsersController");
exports.usersRouter = express_1.default.Router();
const verifyJWT_1 = require("../services/verifyJWT");
exports.testRouter = express_1.default.Router();
exports.testRouter.get("/", verifyJWT_1.verifyJwt, UsersController_1.AuthenticateUser.getAllUsers);
