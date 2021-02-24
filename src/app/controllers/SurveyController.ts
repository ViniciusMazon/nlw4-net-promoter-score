import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyRepository } from '../repositories/SurveyRepository';

class SurveyController {
  async create(request: Request, response: Response) {
    const { title, description } = request.body;

    try {
      const surveyRepository = getCustomRepository(SurveyRepository);

      const survey = await surveyRepository.create({ title, description });
      await surveyRepository.save(survey);

      return response.status(201).json(survey);
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }

  async index(request: Request, response: Response) {
    try {
      const surveyRepository = getCustomRepository(SurveyRepository);

      const all = await surveyRepository.find();

      return response.status(201).json(all);
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

export { SurveyController };
