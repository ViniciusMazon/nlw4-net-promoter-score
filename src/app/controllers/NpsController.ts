import { Request, Response } from 'express';
import { getCustomRepository, Not, IsNull } from 'typeorm';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';

class NpsController {
  async execute(request: Request, response: Response) {
    const { survey_id } = request.params;
    try {
      const surveyUserRepository = getCustomRepository(SurveyUserRepository);
      const surveysUsers = await surveyUserRepository.find({
        survey_id,
        value: Not(IsNull()),
      });

      const detractors = surveysUsers.filter(
        (survey) => survey.value >= 0 && survey.value <= 6
      ).length;

      const promoters = surveysUsers.filter(
        (survey) => survey.value >= 9 && survey.value <= 10
      ).length;

      const passives = surveysUsers.filter(
        (survey) => survey.value >= 7 && survey.value <= 8
      ).length;

      const totalAnswers = surveysUsers.length;

      const calculate = Number(
        (((promoters - detractors) / totalAnswers) * 100).toFixed(2)
      );

      return response.status(200).json({
        nps: calculate,
        promoters,
        detractors,
        passives,
        totalAnswers,
      });
    } catch (err) {
      console.log(err);
      return response.status(400).json({
        message: err.message || 'Unexpected error',
      });
    }
  }
}

export { NpsController };
