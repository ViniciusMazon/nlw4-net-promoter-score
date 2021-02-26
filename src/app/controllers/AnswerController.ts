import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    try {
      const surveyUserRepository = getCustomRepository(SurveyUserRepository);

      const surveyUser = await surveyUserRepository.findOne({
        id: String(u),
      });
      if (!surveyUser) {
        throw new Error('Survey User does not exists');
      }

      surveyUser.value = Number(value);
      await surveyUserRepository.save(surveyUser);

      return response.status(200).json(surveyUser);
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

export { AnswerController };
