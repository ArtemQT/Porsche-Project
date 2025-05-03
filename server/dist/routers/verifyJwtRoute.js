"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenRouter = void 0;
const express_1 = __importDefault(require("express"));
const verifyJWT_1 = require("../services/verifyJWT");
exports.verifyTokenRouter = express_1.default.Router();
exports.verifyTokenRouter.get('/', verifyJWT_1.verifyJwt);
