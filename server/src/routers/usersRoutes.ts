import express, {Router} from 'express';
import { AuthenticateUser } from "../controllers/UsersController"
export const usersRouter: Router = express.Router();
import { check } from "express-validator";
import { TokenController } from "../controllers/tokenController";

usersRouter.post("/register", [
    check("userName", "Имя пользователя не может быть пустым").notEmpty(),
    check("userSurname", "Фамилия пользова быть пустой").notEmpty(),
    check("userEmail", "Почта не может быть пустой").notEmpty(),
    check("userPassword", "Пароль не может быть пустым").isLength({ min: 8})
    ],
    AuthenticateUser.createUser);
usersRouter.post("/login", [
    check("userEmail", "Почта не может быть пустой").notEmpty(),
    check("userPassword", "Пароль не может быть пустым").isLength({ min: 8})],
    AuthenticateUser.loginUser);

usersRouter.get('/logout', TokenController.handleLogOut)
