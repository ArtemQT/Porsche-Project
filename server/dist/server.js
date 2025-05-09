"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const usersRoutes_1 = require("./routers/usersRoutes");
const refreshJwtRoute_1 = require("./routers/refreshJwtRoute");
const carModelRoute_1 = require("./routers/carModelRoute");
const carOverviewRoute_1 = require("./routers/carOverviewRoute");
const verifyJwtRoute_1 = require("./routers/verifyJwtRoute");
const usersBasketRoute_1 = require("./routers/usersBasketRoute");
//------------------------------------------------------------//
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
// Маршруты для получения моделей и конкретной модели
server.use('/API/carModels', carModelRoute_1.carModelsRouter);
server.use('/API/carReview', carOverviewRoute_1.carReviewRouter);
// Маршруты для токенов
server.use('/API/refreshJwt', refreshJwtRoute_1.refreshTokenRouter);
server.use('/API/verifyJwt', verifyJwtRoute_1.verifyTokenRouter);
// Маршруты для корзины
server.use('/API/userBasket', usersBasketRoute_1.usersBasketRouter);
server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});
// server.use('/API/users', testRouter)
