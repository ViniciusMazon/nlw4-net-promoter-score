import { Router } from 'express';
import { SurveyController } from './app/controllers/SurveyController';
import { UserController } from './app/controllers/UserController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();

//Public routes
routes.post('/users', userController.create);

routes.post('/surveys', surveyController.create);

routes.get('/surveys', surveyController.index);

export default routes;
