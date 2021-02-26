import { Request, Response } from 'express';
import { resolve } from 'path';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import { UserRepository } from '../repositories/UserRepository';
import sendMailService from '../services/SendMailService';

class SendMailController {
  async execute(request: Request, response: Response) {
    const { email, survey_id } = request.body;

    try {
      const userRepository = getCustomRepository(UserRepository);
      const surveyRepository = getCustomRepository(SurveyRepository);
      const surveyUserRepository = getCustomRepository(SurveyUserRepository);

      const userExists = await userRepository.findOne({ email });
      if (!userExists) {
        throw new Error('User does not exists');
      }

      const surveyExists = await surveyRepository.findOne({ id: survey_id });
      if (!surveyExists) {
        throw new Error('Survey does not exists');
      }

      const surveyUserExists = await surveyUserRepository.findOne({
        where: { user_id: userExists.id, value: null },
        relations: ['user', 'survey'],
      });

      const variables = {
        name: userExists.name,
        title: surveyExists.title,
        describe: surveyExists.description,
        id: '',
        link: process.env.URL_MAIL,
      };

      const npsPath = resolve(
        __dirname,
        '..',
        'views',
        'emails',
        'npsMail.hbs'
      );

      if (surveyUserExists) {
        variables.id = surveyUserExists.id;
        await sendMailService.execute(
          email,
          surveyExists.title,
          variables,
          npsPath
        );

        return response.json(surveyUserExists);
      }

      const surveyUser = surveyUserRepository.create({
        user_id: userExists.id,
        survey_id,
      });
      await surveyUserRepository.save(surveyUser);
      variables.id = surveyUser.id;

      await sendMailService.execute(
        email,
        surveyExists.title,
        variables,
        npsPath
      );

      return response.status(201).json(surveyUser);
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

export { SendMailController };
