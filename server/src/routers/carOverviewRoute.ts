import express, {Router} from 'express';
import {CarReviewController} from '../controllers/carReviewController';
import { verifyJwt } from '../services/verifyJWT'

export const carReviewRouter: Router = express.Router();

carReviewRouter.get('/' ,CarReviewController.getCar);
