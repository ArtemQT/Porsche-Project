import express, {Router} from 'express';
import {CarOverviewController} from '../controllers/carOverviewController';
import { verifyJwt } from '../services/verifyJWT'

export const carReviewRouter: Router = express.Router();

carReviewRouter.get('/' ,CarOverviewController.getCar);
