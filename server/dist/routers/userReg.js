"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRegRouter = void 0;
const express_1 = __importDefault(require("express"));
exports.userRegRouter = express_1.default.Router();
exports.userRegRouter.use(express_1.default.json());
exports.userRegRouter.use();
