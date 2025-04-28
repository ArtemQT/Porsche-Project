"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoutes_1 = require("./routers/usersRoutes");
const testGelAllUsersRoute_1 = require("./routers/testGelAllUsersRoute");
const refreshRoute_1 = require("./routers/refreshRoute");
const carModelRoute_1 = require("./routers/carModelRoute");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const corsOptions_1 = require("./config/corsOptions");
const cors_1 = __importDefault(require("cors"));
//------------------------------------------------------------//
const server = (0, express_1.default)();
const PORT = +(process.env.PORT || 3000);
server.use((0, cors_1.default)(corsOptions_1.corsOptions));
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use((0, cookie_parser_1.default)());
server.use('/API/auth', usersRoutes_1.usersRouter);
server.use('/API/users', testGelAllUsersRoute_1.testRouter);
server.use('/API/refresh', refreshRoute_1.refreshTokenRouter);
server.use('/API/carModels', carModelRoute_1.carModelsRouter);
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
