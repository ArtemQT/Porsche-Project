import express, {Router} from 'express';
import { AuthenticateUser } from "../controllers/UsersController"
export const usersRouter: Router = express.Router();
import { check } from "express-validator";
import { verifyJwt } from "../middlewares/varifyJWT";

export const testRouter: Router = express.Router();

testRouter.get("/", verifyJwt, AuthenticateUser.getAllUsers);