import { Router } from 'express';
import { SurveyController } from './app/controllers/SurveyController';
import { UserController } from './app/controllers/UserController';
import { SendMailController } from './app/controllers/SendMailController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();

//Public routes
routes.post('/users', userController.create);

routes.post('/surveys', surveyController.create);

routes.get('/surveys', surveyController.index);

routes.post('/send-mail', sendMailController.execute);

export default routes;
