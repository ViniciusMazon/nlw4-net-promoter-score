import { Router } from 'express';
import { SurveyController } from './app/controllers/SurveyController';
import { UserController } from './app/controllers/UserController';
import { SendMailController } from './app/controllers/SendMailController';
import { AnswerController } from './app/controllers/AnswerController';
import { NpsController } from './app/controllers/NpsController';

const routes = Router();

const userController = new UserController();
const surveyController = new SurveyController();
const sendMailController = new SendMailController();
const answerController = new AnswerController();
const npsController = new NpsController();

//Public routes
routes.post('/users', userController.create);

routes.post('/surveys', surveyController.create);

routes.get('/surveys', surveyController.index);

routes.post('/send-mail', sendMailController.execute);

routes.get('/answers/:value', answerController.execute);

routes.get('/nps/:survey_id', npsController.execute);

export default routes;
