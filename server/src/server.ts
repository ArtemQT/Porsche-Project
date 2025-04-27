import express from "express";

import { usersRouter } from "./routers/usersRoutes"
import { testRouter } from "./routers/testGelAllUsersRoute";
import { refreshTokenRouter } from "./routers/refreshRoute"
import cookieParser from "cookie-parser";
import { corsOptions } from "./config/corsOptions";
import cors from "cors"

const server = express();
const PORT: number = +(process.env.PORT || 3000);

server.use(cors(corsOptions));
server.use(express.json())
server.use(express.urlencoded({ extended: true }))
server.use(cookieParser())

server.use('/API/auth', usersRouter)
server.use('/API/users', testRouter)
server.use('/API/refresh', refreshTokenRouter)

server.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`);
});







