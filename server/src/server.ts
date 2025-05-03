import express from "express";

import { usersRouter } from "./routers/usersRoutes"
import { testRouter } from "./routers/testGelAllUsersRoute";
import { refreshTokenRouter } from "./routers/refreshJwtRoute"
import { carModelsRouter } from "./routers/carModelRoute"
import { carReviewRouter } from "./routers/carOverviewRoute"
import { verifyTokenRouter } from "./routers/verifyJwtRoute";
//------------------------------------------------------------//

import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions";
import cors from "cors"

//------------------------------------------------------------//

const server = express();
const PORT: number = +(process.env.PORT || 3000);

server.use(cors(corsOptions));
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())

server.use('/API/auth', usersRouter)

// Маршруты для получения моделей и конкретной модели
server.use('/API/carModels', carModelsRouter)
server.use('/API/carReview', carReviewRouter)

// Маршруты для токенов
server.use('/API/refreshJwt', refreshTokenRouter)
server.use('/API/verifyJwt', verifyTokenRouter)

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});


// server.use('/API/users', testRouter)







