import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';
import * as yup from 'yup';

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    const schema = yup.object().shape({
      title: yup.string().required(),
      description: yup.string().required(),
    });

    await schema.validate(request.body, { abortEarly: false });

    const surveyRepository = getCustomRepository(SurveyRepository);
    const survey = await surveyRepository.create({ title, description });
    await surveyRepository.save(survey);

    return response.status(201).json(survey);
  }

  async index(request: Request, response: Response) {
    const surveyRepository = getCustomRepository(SurveyRepository);

    const all = await surveyRepository.find();

    return response.status(200).json(all);
  }
}

export { SurveyController };
