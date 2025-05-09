"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConfigHash = void 0;
const crypto_1 = __importDefault(require("crypto"));
const getConfigHash = (config) => {
    const normalizedConfig = Object.keys(config)
        .sort()
        .reduce((acc, key) => {
        acc[key] = config[key];
        return acc;
    }, {});
    const str = JSON.stringify(normalizedConfig);
    return crypto_1.default.createHash('sha256').update(str).digest('hex');
};
exports.getConfigHash = getConfigHash;
