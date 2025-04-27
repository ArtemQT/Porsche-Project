"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logOutRouter = void 0;
const express_1 = __importDefault(require("express"));
const tokenController_1 = require("../controllers/tokenController");
exports.logOutRouter = express_1.default.Router();
exports.logOutRouter.get('/', tokenController_1.TokenController.handleLogOut);
