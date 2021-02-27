import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { AppError } from '../../errors/AppError';
import { SurveyUserRepository } from '../repositories/SurveyUserRepository';
import * as yup from 'yup';

class AnswerController {
  async execute(request: Request, response: Response) {
    const { value } = request.params;
    const { u } = request.query;

    const schema = yup.object().shape({
      value: yup.string().required(),
      u: yup.string().required(),
    });

    await schema.validate(
      { value: request.params.value, u: request.query.u },
      { abortEarly: false }
    );

    const surveyUserRepository = getCustomRepository(SurveyUserRepository);

    const surveyUser = await surveyUserRepository.findOne({
      id: String(u),
    });
    if (!surveyUser) {
      throw new AppError('Survey User does not exists');
    }

    surveyUser.value = Number(value);
    await surveyUserRepository.save(surveyUser);

    return response.status(200).json(surveyUser);
  }
}

export { AnswerController };
