"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.corsOptions = void 0;
exports.corsOptions = {
    origin: ["http://localhost:63342"],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
};
