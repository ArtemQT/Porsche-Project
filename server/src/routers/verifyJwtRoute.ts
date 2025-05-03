import express, {Router} from 'express';
import { verifyJwt } from "../services/verifyJWT"

export const verifyTokenRouter: Router = express.Router();

verifyTokenRouter.get('/', verifyJwt)