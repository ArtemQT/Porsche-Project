import express, {Router} from 'express';
import { CarOverviewController } from '../controllers/carOverviewController'

export const carReviewRouter: Router = express.Router();

carReviewRouter.get('/', CarOverviewController.getCar);
